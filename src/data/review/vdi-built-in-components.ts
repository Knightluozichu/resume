import type { ReviewQuestion } from "./types";

export const vdiBuiltInComponentsQuestions: ReviewQuestion[] = [
  {
    id: "vdi-built-in-components-1",
    chapter: "vdi-built-in-components",
    level: 2,
    question: "KeepAlive 切走和切回组件时分别做了什么？为什么不直接销毁？",
    answer:
      "切走时：不 unmount 销毁，而是把组件的真实 DOM 从原位移到一个隐藏的存储容器（缓存），实例状态（setup 返回的响应式数据、子组件状态、滚动位置等）保留，触发 onDeactivated。切回时：把 DOM 从隐藏容器移回原位，复用缓存的实例（不重新执行 setup），触发 onActivated。不直接销毁是为了：①保留组件状态（如表单输入、滚动位置）；②避免重新 setup 和请求数据的开销；③切回时即时显示无需等待。代价是缓存的实例占内存，所以用 max + LRU 限制缓存数量。",
    tags: ["KeepAlive", "缓存", "onActivated"],
  },
  {
    id: "vdi-built-in-components-2",
    chapter: "vdi-built-in-components",
    level: 3,
    question: "Teleport 解决什么问题？为什么用 Teleport 而不直接把弹窗放 body 下？",
    answer:
      "Teleport 解决「弹窗/通知的 DOM 需要脱离父组件层级」的问题——避免被父级 overflow:hidden 裁剪、避免 z-index 嵌套层级不够被遮挡、避免父级 transform 影响弹窗定位（transform 会创建新包含块导致 fixed 失效）。不直接把弹窗放 body 下是因为：弹窗的显示逻辑（v-if）、数据来源、事件处理都归属在当前组件里，直接放 body 下会导致逻辑与视图分离、props/emit 难以传递。Teleport 让「逻辑归属不变（props/事件/响应式都在当前组件上下文）+ 视觉位置分离（DOM 插到 body）」同时满足。子树 VNode 正常 patch，只是插入操作改到 to 指定容器。",
    tags: ["Teleport", "弹窗", "z-index"],
  },
  {
    id: "vdi-built-in-components-3",
    chapter: "vdi-built-in-components",
    level: 3,
    question: "KeepAlive 的 LRU 淘汰策略是什么？为什么用 LRU？",
    answer:
      "KeepAlive 用 max 限制最大缓存数，超过时用 LRU（Least Recently Used，最近最少使用）淘汰——淘汰最久未访问的组件实例，把它的 DOM 从隐藏容器移除并真正 unmount。每次访问（激活）一个缓存组件时更新它的「最近使用时间」，LRU 据此判断谁最久没用。用 LRU 的理由：用户最近访问过的组件更可能再次访问（如 Tab 切换），保留热数据淘汰冷数据，在有限内存下最大化缓存命中率。相比 FIFO（先进先出）或随机淘汰，LRU 更符合用户行为模式。这是工程上用「局部性原理」指导缓存策略的典型应用。",
    tags: ["KeepAlive", "LRU", "缓存策略"],
  },
  {
    id: "vdi-built-in-components-4",
    chapter: "vdi-built-in-components",
    level: 4,
    question: "内置组件在渲染器中是如何实现的？为什么说它们是「特殊 VNode 类型」？",
    answer:
      "内置组件在渲染器中是一类特殊 VNode——type 为 KeepAlive/Teleport/Suspense 等符号或特殊标识。patch 阶段判断 VNode 的 type，若识别为内置组件则走专属分支处理，而非普通元素（createElement）或普通组件（mountComponent）的默认逻辑。KeepAlive 的专属分支处理缓存移动；Teleport 的专属分支处理跨容器插入；Suspense 的专属分支处理异步挂起与协调。这是渲染器用「类型分发」实现的可扩展设计——核心 patch 逻辑按 VNode 类型分发到不同处理函数，新增内置组件只需新增一个类型分支，不改已有逻辑。内置组件不是「外部封装」而是「渲染器内建能力」，所以能做普通组件做不到的事（如操控 DOM 插入位置、缓存实例、挂起子树）。",
    tags: ["内置组件", "VNode", "渲染器", "类型分发"],
  },
];
