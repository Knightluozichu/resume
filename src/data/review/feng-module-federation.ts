import type { ReviewQuestion } from "./types";

export const fengModuleFederationQuestions: ReviewQuestion[] = [
  {
    id: "feng-module-federation-1",
    chapter: "feng-module-federation",
    level: 2,
    question: "什么是 Module Federation？它解决了什么问题？",
    answer:
      "Module Federation（模块联邦）是 Webpack 5 引入的特性，允许多个独立构建的应用在运行时共享模块。Host 应用通过 remotes 配置声明依赖哪些远端应用，Remote 应用通过 exposes 声明暴露哪些模块。运行时 Host 异步拉取 Remote 的 remoteEntry.js，像普通 import 一样使用远端模块。它解决的核心问题是「大型应用的拆分与独立交付」：多个团队可以各自独立开发、构建、部署自己的模块，运行时按需组装，而不需要把所有代码打到一个 bundle 里。这让微前端架构在构建产物层面成为可能。",
    tags: ["模块联邦", "微前端", "Webpack"],
  },
  {
    id: "feng-module-federation-2",
    chapter: "feng-module-federation",
    level: 3,
    question: "Module Federation 的 shared 依赖共享机制是如何工作的？",
    answer:
      "当多个应用通过 Module Federation 共享同一个依赖（如 react）时，shared 配置会让构建器在打包时把该依赖标记为可共享的 chunk，而不是静态内联。运行时，第一个加载的应用会注册自己持有的 react 版本；后续应用加载时，Module Federation 运行时会检查已注册的版本——如果版本满足要求（通过 requiredVersion 协商），就直接复用已加载的实例，不再重复下载；如果不满足，才加载自己的版本。这保证了 react 等单例依赖只初始化一次（避免多实例导致的 hooks 报错等问题），同时通过版本协商最大程度减少重复加载。singleton: true 可强制单例。",
    tags: ["模块联邦", "shared", "依赖共享"],
  },
  {
    id: "feng-module-federation-3",
    chapter: "feng-module-federation",
    level: 3,
    question: "qiankun 和 Module Federation 在微前端思路上有什么核心区别？",
    answer:
      "qiankun 是「应用级隔离」：基于 single-spa，以 HTML entry 方式加载整个子应用，通过 Proxy 沙箱隔离全局变量（window），每个子应用有完整的独立生命周期（mount/unmount）。它适合异构技术栈（一个用 React 一个用 Vue）的拆分，隔离性强。Module Federation 是「模块级共享」：以构建产物中的模块为粒度，Host 直接 import Remote 暴露的组件/函数，无沙箱隔离，运行在同一个全局上下文中。它适合同技术栈的细粒度共享，shared 依赖自动去重。核心区别：qiankun 隔离子应用（沙箱+生命周期），MF 共享模块（无沙箱+依赖协商）。选型看是否需要隔离、是否同技术栈、共享粒度需求。",
    tags: ["微前端", "qiankun", "模块联邦", "选型"],
  },
  {
    id: "feng-module-federation-4",
    chapter: "feng-module-federation",
    level: 4,
    question: "Module Federation 缺少沙箱隔离会带来什么问题？生产中如何应对？",
    answer:
      "无沙箱意味着所有应用共享同一个 window 全局对象，会带来：①全局变量冲突——多个 Remote 可能定义同名全局变量互相覆盖；②样式冲突——CSS 选择器全局生效，互相污染；③第三方库单例假设被破坏——某些库假设自己是唯一实例，多个版本共存可能行为异常；④运行时依赖 Remote 可用性——Remote 服务挂了 Host 也会受影响。应对策略：①约定全局命名空间前缀，避免裸全局变量；②用 CSS Modules / CSS-in-JS / Shadow DOM 隔离样式；③shared 配置严格控制 singleton 依赖的版本范围；④Remote 加载失败时做 fallback 容错（错误边界 + 降级 UI）；⑤同技术栈场景优先用 MF，异构技术栈用 qiankun 隔离。本质：MF 的共享是优势也是风险，需要团队约定和工程规范约束。",
    tags: ["模块联邦", "沙箱", "微前端", "风险"],
  },
];
