import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

// Copy index.html to 404.html after build so React Router works on GitHub Pages
const spa404Plugin = () => ({
  name: 'spa-404',
  closeBundle() {
    const outDir = resolve(__dirname, 'dist')
    try {
      const index = readFileSync(resolve(outDir, 'index.html'), 'utf-8')
      writeFileSync(resolve(outDir, '404.html'), index)
    } catch {}
  }
})

export default defineConfig({
  plugins: [react(), spa404Plugin()],
  server: {
    port: 5000,
    host: '0.0.0.0',
  },
})
