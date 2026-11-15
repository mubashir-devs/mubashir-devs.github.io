import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// This repo is a user site (mubashir-devs.github.io) so it is served from the
// domain root and base must be "/". If you ever rename the repo to a project
// repo, set base to "/<repo-name>/".
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
