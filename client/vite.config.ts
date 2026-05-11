import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiUrl = env.VITE_API_URL || "http://localhost:8080";

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      {
        name: "generate-redirects",
        closeBundle() {
          const outDir = path.resolve(process.cwd(), "build/client");
          const fileContent = `/api/*  ${apiUrl}/:splat  200!\n`;

          if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

          fs.writeFileSync(path.join(outDir, "_redirects"), fileContent);
        },
      },
    ],
    server: {
      port: 5173,
      open: true,

      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
