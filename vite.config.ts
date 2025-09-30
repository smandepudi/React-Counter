import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-Counter/',   // <-- Add this linenpm run build
  server: {
    open: true,  // 👈 this makes it auto-open in browser
  },
})