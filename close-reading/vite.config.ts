import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set the build output directory to 'frontend'
  build: {
    outDir: 'frontend',
  },
  server: {
    port: 3015,
  },
  esbuild: {
	  drop: ['console', 'debugger'],
  },
  plugins: [react()],
})
