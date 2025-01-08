import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "html-transform",
      transformIndexHtml: (html) => {
        return html
          .replace(
            /<script type="module" crossorigin src="(.*?)"><\/script>/,
            `<script type="module" crossorigin defer src="$1"></script>`
          )
          .replace(
            /<link rel="stylesheet" crossorigin href="(.*?)">/,
            `<link rel="preload" as="style" crossorigin href="$1" onload="this.onload=null;this.rel='stylesheet';">`
          );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
