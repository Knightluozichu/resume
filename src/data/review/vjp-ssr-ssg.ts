import type { ReviewQuestion } from "./types";

export const vjpSsrSsgQuestions: ReviewQuestion[] = [
  {
    id: "vjp-ssr-ssg-1",
    chapter: "vjp-ssr-ssg",
    level: 2,
    question: "CSR / SSR / SSG 各自首屏与 SEO 表现？",
    answer:
      "CSR 客户端渲染：服务器返回空 HTML + JS bundle，浏览器下载执行 JS 后挂载并请求数据渲染。首屏慢（要等 JS 下载执行 + 数据请求），SEO 弱（爬虫拿到的是空 HTML，早期爬虫不执行 JS）。SSR 服务端渲染：服务器执行组件取数据并渲染成完整 HTML 返回，浏览器拿到即可显示，首屏快、SEO 强（爬虫直接读到内容）；之后 JS 加载完做 hydration 注水激活交互。SSG 静态生成：构建期取数据预渲染成静态 HTML，部署到 CDN，访问即取静态文件，首屏极快、SEO 强、服务器零运行时开销，但内容更新需重新构建。取舍：动态高频更新内容用 SSR，静态少更新用 SSG，纯交互后台用 CSR。",
    tags: ["CSR", "SSR", "SSG", "首屏", "SEO"],
  },
  {
    id: "vjp-ssr-ssg-2",
    chapter: "vjp-ssr-ssg",
    level: 2,
    question: "什么是 hydration（注水）？为什么需要它？",
    answer:
      "hydration（注水/水合）指 SSR 返回的静态 HTML 与客户端 Vue 应用「 attaches 事件、建立响应式」的过程。SSR 只生成 HTML 字符串，没有事件绑定、没有响应式——按钮点了没反应、数据变了视图不动。hydration 让客户端 JS 加载后，Vue 把虚拟 DOM 与已有真实 DOM 关联起来：比对服务端渲染的 DOM 和客户端 render 的 VNode 是否一致（一致则复用 DOM 不重新创建，只附加事件监听和响应式），不一致则警告 hydration mismatch 并可能重新渲染该节点。需要它的原因：既要首屏快（SSR 直出 HTML 立即可见），又要可交互（必须 client 激活成真正 Vue 应用）。hydration mismatch 常见于服务端客户端用了不同数据或依赖时间的渲染，需保证两端渲染一致。",
    tags: ["hydration", "注水", "SSR", "hydration mismatch"],
  },
  {
    id: "vjp-ssr-ssg-3",
    chapter: "vjp-ssr-ssg",
    level: 3,
    question: "SSR 应用如何处理组件内的浏览器 API（window 等）？",
    answer:
      "SSR 在 Node 环境执行组件渲染，Node 没有 window/document/localStorage 等浏览器 API，直接访问会报错。处理方式：①用 onMounted 钩子包裹——onMounted 只在客户端执行，服务端不跑，把访问 window 的代码放这里最安全；②用 import.meta.client 或 process.client（Nuxt）做条件判断，只在客户端执行浏览器逻辑；③用 ClientOnly 组件包裹仅在客户端渲染的部分（Nuxt 提供 <ClientOnly>），服务端渲染占位；④把依赖 window 的第三方库动态 import（在 onMounted 里 await import('lib')）；⑤避免在 setup 顶层直接读 window。原则：渲染相关逻辑要服务端客户端一致，副作用和浏览器 API 推迟到挂载后。这样既不破坏 SSR 又能用浏览器能力。",
    tags: ["SSR", "window", "onMounted", "ClientOnly", "Nuxt"],
  },
  {
    id: "vjp-ssr-ssg-4",
    chapter: "vjp-ssr-ssg",
    level: 4,
    question: "为什么不能所有项目都用 SSR？",
    answer:
      "SSR 不是银弹，有显著成本：①服务器开销大——每个请求都要在服务端执行组件取数据渲染 HTML，高并发下 CPU/内存压力大，不像 CSR/SSG 只需静态文件托管；②开发约束多——组件必须服务端客户端渲染一致（hydration mismatch），不能用浏览器 API（window 等）于渲染期，第三方库若依赖 window 需特殊处理；③部署复杂——需要 Node 服务器（或 edge runtime），不像纯静态可丢 CDN，运维成本高；④缓存策略复杂——动态内容难像静态那样长效缓存，需做细粒度缓存；⑤首屏到可交互间可能有延迟——HTML 快速显示但 JS 未加载完时无法交互（hydration 前）。所以：内容型站点（电商、资讯、博客）SEO 与首屏关键值得 SSR 成本；纯后台管理系统无 SEO 需求、首屏非关键，用 CSR 更简单高效；静态内容用 SSG。选型要看「SSR 带来的首屏/SEO 收益是否大于其服务器与复杂度成本」。",
    tags: ["SSR", "选型", "工程权衡", "工程思维"],
  },
];
