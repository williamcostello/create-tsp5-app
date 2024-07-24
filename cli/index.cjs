#!/usr/bin/env node

const { execSync } = require('child_process')
const { input, confirm } = require('@inquirer/prompts')
const fs = require('fs')
const path = require('path')

const templateDir = path.resolve(__dirname, 'template')

const main = async () => {
    const answers = {
        projectName: await input({
            message: 'Enter the project name:',
            default: 'p5-ts-starter',
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
    }

    console.info(`Project ${answers.projectName} is ready!`)
    console.info(
        `run 'cd ${answers.projectName}' to enter the project directory
run 'npm install' to install dependencies
run 'npm run dev' to start the development server`
    )
}

main()
