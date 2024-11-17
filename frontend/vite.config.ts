import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist", // Assurez-vous que cela correspond à votre Output Directory dans Vercel
    rollupOptions: {
      input: "index.html",
    },
  },
});
