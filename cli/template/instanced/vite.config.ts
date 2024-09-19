import { defineConfig } from 'vite'

export default defineConfig({
    // Configuration options
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})
