import type { ReviewQuestion } from "./types";

export const vdiFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "vdi-final-review-1",
    chapter: "vdi-final-review",
    level: 2,
    question: "用「一条数据的旅程」串联全书五大主题，说明每个主题在链路中的角色。",
    answer:
      "count.value++ 触发的链路：①响应式系统（第2章）——ref 的 set 拦截触发 trigger，从 targetMap 取出依赖 count 的 effect；②副作用与调度器（第3章）——scheduler 决定每个 effect 做什么：computed 标脏不重算、watch 执行回调、组件 render effect 排队重跑；③组件模型（第6-7章）——组件 render effect 重跑产出新 subTree；④编译器（第8章）——render 内 createVNode 带 patchFlag，patch 只比对动态部分；⑤渲染器（第4章）——patch 新旧 subTree 同类型复用 el；⑥Diff算法（第5章）——子节点快速 Diff 预处理头尾 + LIS 最小化移动；⑦内置组件（第9章）——若涉及 KeepAlive/Teleport/Suspense 走专属分支。五层各有角色缺一不可。",
    tags: ["总复习", "运行时链路", "架构"],
  },
  {
    id: "vdi-final-review-2",
    chapter: "vdi-final-review",
    level: 3,
    question: "响应式系统、渲染器、组件模型三者如何协作完成一次更新？",
    answer:
      "数据变化时：①响应式系统的 set 拦截触发 trigger，从 targetMap 取出依赖该数据的 effect 并调度执行。②其中组件的 render effect 被触发，重新执行 render 函数。render 函数读取最新响应式数据，产出新的 subTree（VNode 树）。③渲染器的 patch 比对旧 subTree 和新 subTree：同类型元素复用真实 DOM 节点更新属性，子节点用 Diff 算法最小化操作。④若 VNode 是组件类型，patch 触发子组件更新（props 变 → 子组件 render effect 重跑 → 递归 patch）。三层协作：响应式负责「感知变化并触发」，组件负责「描述结构并产出 VNode」，渲染器负责「比对 VNode 并操作 DOM」。响应式是发动机，组件是图纸，渲染器是施工队。",
    tags: ["总复习", "协作", "响应式", "渲染器", "组件"],
  },
  {
    id: "vdi-final-review-3",
    chapter: "vdi-final-review",
    level: 4,
    question: "为什么 Vue 3 的整体性能比 Vue 2 好？从全书五个主题分别给出原因。",
    answer:
      "①响应式系统：Proxy 代替 Object.defineProperty，能监听属性增删和数组索引，无需 $set hack，且 Proxy 在引擎层更高效，惰性深层代理减少初始化开销。②渲染器：createRenderer 平台解耦，SSR 可直接渲染字符串无需虚拟 DOM 开销；patch 复用真实节点避免销毁重建。③Diff 算法：快速 Diff（头尾预处理 + LIS）比双端 Diff 在中间大段移动时更高效，移动次数最少。④编译器：编译期注入 patchFlag（只比对动态部分）、静态提升（静态节点只创建一次）、Block Tree（缩小 Diff 范围），把运行时开销转移到编译期。⑤组件：Composition API 的 setup 比 Options API 更利于 Tree-shaking 和类型推导，按需引入减小体积。综合：编译期优化 + Proxy + 快速 Diff + 平台解耦 + Tree-shaking 共同提升性能。",
    tags: ["总复习", "Vue3", "性能", "编译优化"],
  },
  {
    id: "vdi-final-review-4",
    chapter: "vdi-final-review",
    level: 4,
    question: "理解 Vue 的设计动机比记住 API 更重要，为什么？举两个例子说明。",
    answer:
      "理解设计动机是举一反三的基础——API 会变（Vue 2 → Vue 3 很多 API 变了），但设计动机（解决什么问题、为何这样设计）是稳定的。例子一：理解「为什么要用 Proxy 拦截读写而非轮询」这个动机，就能理解 MobX、SolidJS 等其他响应式框架也是拦截读写，只是实现不同（Proxy vs 编译期注入），知识可迁移。例子二：理解「为什么 createRenderer 要把平台操作抽成 options」这个解耦动机，就能理解 React 的 reconciler 分层（hostConfig 注入平台操作）也是同一思路，遇到新的渲染目标（Canvas/WebGL/原生）知道该怎么设计。把动机当核心的人，学一个框架等于学一类框架；把 API 当核心的人，每次升级都要重学。",
    tags: ["总复习", "设计动机", "知识迁移", "工程思维"],
  },
];
