import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: { proxy: { '/api': process.env.BRICK_API_PROXY || 'http://localhost:8081' } },
  preview: { proxy: { '/api': process.env.BRICK_API_PROXY || 'http://localhost:8081' } },
  plugins: [react()],
})
