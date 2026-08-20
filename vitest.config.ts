import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["tests/e2e/**", "node_modules", ".next", "out"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/sections/**"],
      thresholds: { lines: 70 },
    },
  },
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
});
