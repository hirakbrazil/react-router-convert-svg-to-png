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
        const jsRegex = /<script type="module" crossorigin src="(.*?)"><\/script>/;
        const cssRegex = /<link rel="stylesheet" crossorigin href="(.*?)">/;

        const jsMatch = html.match(jsRegex);
        const cssMatch = html.match(cssRegex);

        const jsSrc = jsMatch ? jsMatch[1] : null;
        const cssHref = cssMatch ? cssMatch[1] : null;

        if (jsSrc || cssHref) {
          const domContentLoadedScript = `
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                ${jsSrc ? `var script = document.createElement('script');
                script.type = 'module';
                script.crossOrigin = 'anonymous';
                script.src = '${jsSrc}';
                document.head.appendChild(script);` : ""}
                
                ${cssHref ? `var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.crossOrigin = 'anonymous';
                link.href = '${cssHref}';
                document.head.appendChild(link);` : ""}
              });
            </script>
          `;

          // Remove the original tags and inject the new <script> tag
          return html
            .replace(jsRegex, "")
            .replace(cssRegex, "")
            .replace("</head>", `${domContentLoadedScript}</head>`);
        }

        return html;
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
