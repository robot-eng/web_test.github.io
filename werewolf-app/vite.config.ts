import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // แก้ไขจาก './' เป็นชื่อ Repo และตามด้วยโฟลเดอร์ย่อย
  // เพื่อให้ GitHub Pages หาไฟล์ js/css ในโฟลเดอร์ werewolf-app เจอ
  base: '/web_test.github.io/werewolf-app/', 
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})