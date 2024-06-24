import { defineConfig } from "tsup";

const commonConfig = {
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  sourcemap: true,
};

export default defineConfig([
  // Standard ESM
  {
    ...commonConfig,
    entry: {
      index: "src/index.ts",
    },
    target: "es2020",
    format: ["esm"],
    outDir: "./lib/esm/",
    outExtension: () => ({ js: ".mjs" }),
    dts: true,
    clean: true,
  },
  // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
  {
    ...commonConfig,
    entry: {
      "index.legacy-esm": "src/index.ts",
    },
    target: "es2017",
    format: ["esm"],
    outDir: "./lib/esm/",
    outExtension: () => ({ js: ".js" }),
  },
  // Browser-ready ESM, minified - not supported as Jest has dependency on
  // Babel which cannot be compiled.
  // {
  //   ...commonConfig,
  //   entry: {
  //     "index.browser": "src/index.ts",
  //   },
  //   target: "es2020",
  //   format: ["esm"],
  //   outDir: "./lib/esm/",
  //   outExtension: () => ({ js: ".js" }),
  //   minify: true,
  //   noExternal: Object.keys(dependencies),
  //   skipNodeModulesBundle: false,
  //   splitting: false,
  // },
  // CJS, minified
  {
    ...commonConfig,
    entry: {
      "index.min": "src/index.ts",
    },
    target: "es2020",
    format: ["cjs"],
    outDir: "./lib/cjs/",
    outExtension: () => ({ js: ".js" }),
    minify: true,
  },
]);
