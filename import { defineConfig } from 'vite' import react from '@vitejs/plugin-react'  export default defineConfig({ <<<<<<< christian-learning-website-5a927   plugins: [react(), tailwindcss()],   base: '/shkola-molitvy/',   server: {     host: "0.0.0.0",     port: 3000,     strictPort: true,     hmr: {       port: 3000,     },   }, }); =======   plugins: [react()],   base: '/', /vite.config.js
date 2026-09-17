import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
<<<<<<< christian-learning-website-5a927
  plugins: [react(), tailwindcss()],
  base: '/shkola-molitvy/',
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
=======
  plugins: [react()],
  base: '/', // Для собственного домена
})
>>>>>>> main
