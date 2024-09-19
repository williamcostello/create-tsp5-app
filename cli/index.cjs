#!/usr/bin/env node

const { execSync } = require('child_process')
const { input, confirm, select } = require('@inquirer/prompts')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const main = async () => {
    const answers = {
        projectName: await input({
            message: 'Enter the project name:',
            default: 'p5-ts-startser',
        }),
        mode: await select({
            message: 'Select the mode:',
            choices: [
                {
                    title: 'Global',
                    value: 'global',
                    description:
                        'Uses the same syntax as the p5 web editor. Great for prototyping. HMR is disabled for this mode',
                },
                {
                    title: 'Instanced',
                    value: 'instanced',
                    description:
                        'Use this if the sketch will not be used in isolation.',
                },
            ],
            default: 'global',
        }),
        gitInit: await confirm({
            message: 'Initialize a git repository?',
            type: 'confirm',
            default: true,
        }),
    }

    const projectPath = path.join(process.cwd(), answers.projectName)

    const cleanup = () => {
        try {
            if (fs.existsSync(projectPath)) {
                fs.rmSync(projectPath, { recursive: true, force: true })
                console.log(`Cleaned up ${projectPath}`)
            }
        } catch (error) {
            console.error(`Failed to clean up ${projectPath}:`, error.message)
        }
    }

    if (fs.existsSync(projectPath)) {
        console.error(`Directory ${projectPath} already exists!`)
        process.exit(1)
    }

    try {
        fs.mkdirSync(projectPath)
    } catch (error) {
        console.error('Failed to create project directory:', error.message)
        process.exit(1)
    }

    const templateDir = path.join(__dirname, 'template', answers.mode)

    try {
        fs.cpSync(templateDir, projectPath, {
            overwrite: false,
            recursive: true,
        })
    } catch (error) {
        console.error('Failed to copy template files:', error.message)
        cleanup()
        process.exit(1)
    }

    const packageJsonPath = path.join(projectPath, 'package.json')
    try {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf-8')
        )
        packageJson.name = answers.projectName
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    } catch (error) {
        console.error('Failed to update package.json:', error.message)
        cleanup()
        process.exit(1)
    }

    if (answers.gitInit) {
        try {
            execSync(`git init`, { cwd: projectPath, stdio: 'inherit' })
        } catch (error) {
            console.error(
                'Failed to initialize a git repository:',
                error.message
            )
            cleanup()
            process.exit(1)
        }
    } else {
        try {
            fs.rmSync(path.join(projectPath, '.gitignore'))
        } catch (error) {
            console.error('Failed to remove .gitignore:', error.message)
            cleanup()
            process.exit(1)
        }
    }

    console.info(
        chalk.greenBright(
            'Project',
            chalk.bold(`"${answers.projectName}"`),
            'is ready!'
        )
    )
    console.info(chalk.bold(chalk.blueBright(`Next steps:`)))
    console.info(chalk.yellowBright(`cd "${answers.projectName}"`))
    console.info(chalk.yellowBright(`yarn install`))
    console.info(chalk.yellowBright(`yarn dev`))
}

main()
