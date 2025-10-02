import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/React-Counter/" : "/", // ✅ dev uses "/", prod uses repo name
}));