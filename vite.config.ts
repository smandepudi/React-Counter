import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/'  // Make sure this is just '/' not '/React-Counter/'
})
