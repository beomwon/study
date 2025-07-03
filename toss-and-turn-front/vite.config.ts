import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/study/", // GitHub Pages 서브디렉토리 경로
});
