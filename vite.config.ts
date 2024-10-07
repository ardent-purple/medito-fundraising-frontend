import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  base: './',
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as Plugin,
      ],
    },
    outDir: 'dist',
    assetsDir: '.',
  },
})
