import type { ReviewQuestion } from "./types";

export const vdiAsyncComponentQuestions: ReviewQuestion[] = [
  {
    id: "vdi-async-component-1",
    chapter: "vdi-async-component",
    level: 2,
    question: "异步组件解决什么问题？defineAsyncComponent 的状态机有哪几个状态？",
    answer:
      "异步组件解决「按需加载、代码分割」问题——大应用把所有组件打包会让首屏很慢，异步组件用到时才请求组件代码。defineAsyncComponent 包装一个返回 Promise 的 loader 函数，内部状态机有三个状态：pending（加载中，渲染 loadingComponent）、resolved（加载成功，缓存真实组件并渲染）、rejected（加载失败，渲染 errorComponent）。首次渲染调 loader() 发起加载，Promise resolve 切 resolved 并缓存，reject 切 rejected。",
    tags: ["异步组件", "状态机", "代码分割"],
  },
  {
    id: "vdi-async-component-2",
    chapter: "vdi-async-component",
    level: 3,
    question: "defineAsyncComponent 的 delay 和 timeout 各解决什么问题？",
    answer:
      "delay 解决「加载太快时 loading 闪烁」——设置 delay 后，loadingComponent 在 delay 毫秒后才显示，若在这之前已 resolved 则不显示 loading。网络快时组件瞬间加载完，若立刻显示 loading 再瞬间消失会闪烁，delay 让快速加载不触发 loading 显示。timeout 解决「加载卡死」——超过 timeout 毫秒自动切 rejected 显示 errorComponent，避免用户无限等待。两者互补：delay 防快闪（优化体验），timeout 防卡死（兜底错误处理）。还可配 onError 重试、errorComponent 自定义错误界面。",
    tags: ["异步组件", "delay", "timeout"],
  },
  {
    id: "vdi-async-component-3",
    chapter: "vdi-async-component",
    level: 3,
    question: "Suspense 如何协调多个异步子树？挂起期间显示什么？",
    answer:
      "Suspense 包裹异步子组件。当子树的 setup 是 async（返回 Promise），Suspense 把子树挂起（不提交 DOM），收集所有异步依赖。挂起期间显示 #fallback 插槽内容。全部子树的 Promise resolve 后，统一提交 DOM 显示 #default 内容。任一 reject 触发 onError。这样多个异步组件「一起加载完再一起显示」，而不是一个一个跳出来。Suspense 让「数据获取与渲染」可声明式编排，无需手动管理每个异步组件的加载状态。",
    tags: ["Suspense", "异步协调", "fallback"],
  },
  {
    id: "vdi-async-component-4",
    chapter: "vdi-async-component",
    level: 4,
    question: "为什么说路由懒加载本质就是异步组件？这个设计有什么好处？",
    answer:
      "路由懒加载写法 `component: () => import('./Detail.vue')`，`() => import()` 返回 Promise，resolve 后得到组件定义。这正好符合 defineAsyncComponent 的 loader 签名。路由内部用 defineAsyncComponent 包装这个 loader：匹配路由时触发 loader 加载组件代码（Webpack/Vite 会把 Detail.vue 单独打成一个 chunk），pending 时可显示 loading，resolved 后渲染组件。所以路由懒加载 = 异步组件 + 动态 import 实现代码分割。好处：①首屏不加载所有路由页面代码，减小首屏体积；②按需请求，用户访问到才加载；②打包工具自动分割 chunk。把异步组件机制复用到路由层，是设计复用的典范。",
    tags: ["路由懒加载", "异步组件", "代码分割", "设计动机"],
  },
];
