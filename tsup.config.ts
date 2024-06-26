import { defineConfig, Options } from "tsup";

export default defineConfig((options) => {
  const commonOptions: Partial<Options> = {
    clean: true,
    entry: {
      index: "src/index.ts",
    },
    sourcemap: true,
    ...options,
  };

  return [
    // Modern ESM
    {
      ...commonOptions,
      format: ["esm"],
      outExtension: () => ({ js: ".mjs" }),
      dts: true,
      outDir: "./lib/esm/",
    },
    // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
    {
      ...commonOptions,
      entry: {
        "index.legacy-esm": "src/index.ts",
      },
      format: ["esm"],
      outExtension: () => ({ js: ".js" }),
      target: "es2017",
      outDir: "./lib/esm/",
    },
    // CJS
    {
      ...commonOptions,
      format: ["cjs"],
      outExtension: () => ({ js: ".cjs" }),
      dts: true,
      outDir: "./lib/cjs/",
    },
    // CJS old extension
    {
      ...commonOptions,
      format: ["cjs"],
      outExtension: () => ({ js: ".js" }),
      outDir: "./lib/cjs/",
    },
  ] as Options[];
});
