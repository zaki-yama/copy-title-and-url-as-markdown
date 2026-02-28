import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        strict: true,
        esModuleInterop: true,
      },
    },
  },
});
