import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://zaki-yama.github.io",
  base: "/copy-title-and-url-as-markdown",
  vite: {
    plugins: [tailwindcss()],
  },
});
