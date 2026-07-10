import type { ReviewQuestion } from "./types";

export const fengWebpackViteQuestions: ReviewQuestion[] = [
  {
    id: "feng-webpack-vite-1",
    chapter: "feng-webpack-vite",
    level: 2,
    question: `Webpack 和 Vite 在开发启动阶段的核心差异是什么？`,
    answer:
      `Webpack 是「打包优先」：开发服务器启动时先从入口出发，全量编译所有模块，打成 bundle 再启动服务。项目越大，启动时间越长（近似线性增长）。Vite 是「按需编译」：开发服务器启动时几乎不编译业务代码，而是利用浏览器原生 ESM 能力——浏览器请求某个模块时，Vite 才即时编译该模块并返回。因此冷启动时间几乎不随项目规模增长，毫秒级即可启动。本质区别：Webpack 先打包再服务，Vite 先服务按需编译。`,
    tags: ["构建", "Webpack", "Vite"],
  },
  {
    id: "feng-webpack-vite-2",
    chapter: "feng-webpack-vite",
    level: 3,
    question: `Webpack 和 Vite 的 HMR（热模块替换）机制有什么不同？`,
    answer:
      `Webpack HMR：修改一个文件后，Webpack 需要重新编译该模块及其受影响的依赖链，生成 hot-update.json 和 hot-update.js 补丁文件，推送给浏览器，再由 HMR runtime 替换对应模块。如果改动涉及深层依赖，编译范围会扩大。Vite HMR：修改一个文件后，Vite 只重新编译这一个模块，通过 ESM 的 import 失效机制精确通知浏览器重新请求该文件。因为 Vite 开发态每个模块就是独立的 ESM 文件，不存在打包依赖链，所以 HMR 速度与项目规模无关，只与单文件编译时间有关。Vite 的 HMR 更精确、更快。`,
    tags: ["HMR", "构建", "Vite"],
  },
  {
    id: "feng-webpack-vite-3",
    chapter: "feng-webpack-vite",
    level: 3,
    question: `Vite 为什么要做依赖预构建（pre-bundling）？用的是什么工具？`,
    answer:
      `Vite 开发态用浏览器原生 ESM 按需加载，但第三方依赖（如 react、lodash）通常包含大量内部模块（几百甚至上千个小文件），如果每个都让浏览器单独请求，会造成瀑布式网络请求，反而极慢。此外部分依赖是 CommonJS 格式，浏览器原生不支持。因此 Vite 在首次启动时用 esbuild（Go 编写，极速）把第三方依赖预打包成单个 ESM 文件，既减少请求数又统一格式。esbuild 比传统工具（Webpack+Babel）快一到两个数量级。预构建结果缓存在 node_modules/.vite 下，依赖不变时直接复用。`,
    tags: ["Vite", "esbuild", "预构建"],
  },
  {
    id: "feng-webpack-vite-4",
    chapter: "feng-webpack-vite",
    level: 4,
    question: `什么场景下应该选 Webpack 而非 Vite？什么场景选 Vite 更合适？`,
    answer:
      `选 Webpack 的场景：①老项目已有成熟 Webpack 配置且运行良好，迁移成本高于收益；②需要极致的产物控制（如自定义 chunk 拆分策略、复杂的 loader 链、Module Federation 深度定制）；③目标环境不支持原生 ESM（如需兼容老浏览器）；④依赖大量 Webpack 专属插件生态。选 Vite 的场景：①新项目或中小型项目，追求开发体验和启动速度；②React/Vue 等现代框架生态已良好适配；③团队对构建配置复杂度敏感，Vite 开箱即用。生产构建 Vite 用 Rollup 打包，产物质量与 Webpack 相当。核心判断：不是「谁更好」而是「约束匹配谁」——生态成熟度、产物控制力、团队熟悉度、目标环境四维权衡。`,
    tags: ["构建", "选型", "Webpack", "Vite"],
  },
];
