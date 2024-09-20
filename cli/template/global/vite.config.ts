import { defineConfig } from 'vite'

export default defineConfig({
    // Configuration options
    server: {
        port: 3000,
        hmr: false,
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/sketch.ts',
            name: 'sketch',
            fileName: 'sketch',
        },
        minify: false,
        rollupOptions: {
            treeshake: false,
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})
