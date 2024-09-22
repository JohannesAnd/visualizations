import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  root: "src",
  plugins: [react()],
  server: mode === "development" ? { port: 3000 } : {},
}));
