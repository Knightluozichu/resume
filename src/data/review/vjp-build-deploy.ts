import type { ReviewQuestion } from "./types";

export const vjpBuildDeployQuestions: ReviewQuestion[] = [
  {
    id: "vjp-build-deploy-1",
    chapter: "vjp-build-deploy",
    level: 2,
    question: "Vite 为什么开发快？依赖预构建做了什么？",
    answer:
      "Vite 开发快的核心是「用原生 ESM 按需加载 + esbuild 预构建」。传统打包器（Webpack）开发时要把所有模块打包成 bundle 再启动，项目大时启动慢、改一行重新打包慢。Vite 开发模式不打包，直接让浏览器用原生 ES Module 按需 import（请求一个模块才编译一个），冷启动几乎瞬时。依赖预构建（esbuild）做三件事：①把 CommonJS/UMD 依赖转成 ESM（浏览器只认 ESM）；②把零碎小模块（如 lodash-es 几百个文件）合并成单文件减少 HTTP 请求；③用 esbuild（Go 编写，比 JS 写的打包器快 10-100 倍）做这个转换。预构建结果缓存到 node_modules/.vite，依赖不变时复用。生产构建则切换到 Rollup（Tree-shaking 和代码分割更成熟）。这样开发用速度优先的 esbuild+原生 ESM，生产用质量优先的 Rollup。",
    tags: ["Vite", "依赖预构建", "esbuild", "ESM"],
  },
  {
    id: "vjp-build-deploy-2",
    chapter: "vjp-build-deploy",
    level: 2,
    question: "代码分割（code splitting）解决什么问题？",
    answer:
      "代码分割把一个大 bundle 拆成多个小 chunk，按需加载，解决「首屏要下载全部代码导致慢」的问题。传统打包把所有代码合成一个 bundle.js，用户首屏只需一小部分却要下载全部，浪费带宽、拖慢首屏。分割后：首屏只加载当前路由需要的 chunk，其他路由/功能的 chunk 在用到时才动态加载。Vue 中实现方式：①路由懒加载 const Foo = () => import('./Foo.vue')，每个路由一个 chunk；②动态 import() 按需加载大组件/库（如点击才加载图表库）；③手动配置 manualChunks 把第三方 vendor 单独分块。配合浏览器缓存（内容哈希命名），分割后未改动的 chunk 可长效缓存，用户二次访问更快。目标是「用户只下载当前页面真正需要的代码」。",
    tags: ["代码分割", "chunk", "懒加载", "首屏"],
  },
  {
    id: "vjp-build-deploy-3",
    chapter: "vjp-build-deploy",
    level: 3,
    question: "路由懒加载如何实现？它和动态 import 的关系？",
    answer:
      "Vue Router 路由懒加载写法：在 routes 配置里用 component: () => import('@/views/Detail.vue') 替代静态 import Detail from '@/views/Detail.vue'。原理：() => import() 是 ES 动态 import，返回 Promise，打包器（Rollup/Webpack）识别后把 Detail.vue 单独打成 chunk，只在路由被访问时才发起请求加载该 chunk，加载完才渲染路由组件。所以「路由懒加载 = 动态 import 在路由配置上的应用」，二者本质都是动态 import，区别只是使用位置：路由懒加载用于按路由切分，通用动态 import 用于任何按需场景（如点击加载弹窗组件）。配合 webpackPrefetch/vite build.rollupOptions 可预取下一个可能访问的 chunk。注意：懒加载会让首次访问该路由多一个网络请求（可加 loading），首屏路由不宜过度拆分。",
    tags: ["路由懒加载", "动态 import", "chunk", "Rollup"],
  },
  {
    id: "vjp-build-deploy-4",
    chapter: "vjp-build-deploy",
    level: 4,
    question: "内容哈希命名的缓存策略原理是什么？",
    answer:
      "构建产物文件名带内容哈希（如 app.a3f9b2.js），哈希值由文件内容计算得出：内容不变则哈希不变，内容变则哈希变。缓存策略：①HTML 不缓存或短缓存（入口文件名总叫 index.html，必须能取到最新版本指向新的哈希文件）；②带哈希的静态资源（JS/CSS/图片）设置长效缓存（Cache-Control: max-age=31536000 即一年），因为文件名含哈希，内容变了哈希变文件名也变，浏览器会当成新文件请求，不会用旧缓存；③内容没变的 chunk 哈希不变，用户二次访问直接命中浏览器缓存，零下载。这样做到「改了的资源强制刷新，没改的资源长效缓存」——既保证更新及时生效，又最大化缓存命中率。关键前提：HTML 必须不被强缓存（否则用户拿旧 HTML 指向旧哈希文件），且哈希要基于内容稳定计算（不能含构建时间等不稳定因素，否则每次构建全量失效）。分包时还要注意「一个 chunk 变导致依赖它的 chunk 哈希也变」的级联失效问题。",
    tags: ["内容哈希", "缓存策略", "CDN", "工程思维"],
  },
];
