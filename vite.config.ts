import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local development uses /. GitHub Actions passes the Pages path with --base.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
