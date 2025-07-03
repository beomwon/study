import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/study/toss-and-turn-front/", // GitHub 경로 기준!
});
