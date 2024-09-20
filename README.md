# p5.js + TypeScript + Vite Template
A simple p5 template to quickly get a project going, using Vite as a bundler + dev server.

## Motivation
The `p5.js` web editor is a fantastic tool, but I often find myself missing the features my IDE offers. This package aims to make it as quick and easy as using the web editor to get a project running locally with TypeScript, a development server, and the joys of using your own editor setup.

## Usage
```
// Initialise the project
// You can choose global or instanced mode - more information on this in the "Global vs Instanced" section below.
npx create-tsp5-app

// Install dependencies
npm install
// OR
yarn install

// Run the dev server
npm run dev
// OR
yarn dev
```

## Global vs Instanced
There are some differences between using p5 in global and instanced mode, you can read about these [here](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).
Use global if:
- You want an experience close to the web editor
- You want to quickly prototype an idea
- Your sketch will be ran in isolation from any other sketches

Use instanced if:
- You want a minimal bundle size for your sketch
- Your sketch will be rendered along side other sketches

### Global
The vite dev server does not work with HMR. HMR fundamentally relies on ES modules to work. Your sketch code cannot be imported as an ES module AND access the p5 global functions - and p5 cannot access your `setup` or `draw` functions. 

The `yarn dev` runs the typescript and vite build processes concurrently, and you must refresh the page to see your changes.

**Note**: Your bundle will not be tree-shaken

### Instanced
You can run `yarn dev` to run the vite dev server with HMR as normal.