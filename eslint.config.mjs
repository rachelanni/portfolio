import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { CompactPreview } from "sanity";

const eslintConfig = defineConfig([
  ...CompactPreview.extends("next/core-web-vitals","next/typescript"),
  ...nextVitals,
  ...nextTs
], {
  // Override default ignores of eslint-config-next.
  globalIgnores: [
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]
});


export default eslintConfig;
