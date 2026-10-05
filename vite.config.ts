import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Custom domain (zachhoheb.dev) serves from the root.
  base: '/',
  plugins: [react()],
})
