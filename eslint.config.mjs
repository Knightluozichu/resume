import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 关闭与 prettier 冲突的风格规则（保持在规则配置最后）
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 与网站无关的 Python 遗留目录（见 PLAN.md）
    ".venv/**",
    // 第三方 Draco WASM decoder（three.js 自带产物，原样部署，不参与 lint）
    "public/draco/**",
  ]),
]);

export default eslintConfig;
