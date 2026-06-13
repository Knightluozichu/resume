import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 关闭与 prettier 冲突的风格规则（保持在规则配置最后）
  eslintConfigPrettier,
  // 约定：`_` 前缀的参数/变量/捕获错误为「有意保留但当前未用」
  // （如占位组件预留的 API props、解构丢弃位），不计未用告警；
  // 需开发者显式加前缀才生效，不会掩盖真正的未用变量。
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
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
