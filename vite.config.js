import { defineConfig } from "vite";
import gltf from 'vite-plugin-gltf'

export default defineConfig({
    plugins: [
        gltf()
    ],
    optimizeDeps: {
        enabled: false
    }
})