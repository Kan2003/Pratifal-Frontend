import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-reward.onrender.com', // your backend URL
        changeOrigin: true, // helps to change the origin of the host header to the target URL
      },
    },
  },
  plugins: [react()],
});
