import type { ReviewQuestion } from "./types";

export const vjpCompositionApiQuestions: ReviewQuestion[] = [
  {
    id: "vjp-composition-api-1",
    chapter: "vjp-composition-api",
    level: 2,
    question: "Composition API 相比 Options API 解决了什么问题？",
    answer:
      "Options API 把同一功能的代码打散到 data/computed/methods/mounted 等不同选项里，导致「理解一个功能要在四个地方跳读」「复用一个功能要拷贝散落在四处的代码」，组件变大后逻辑碎片化严重。Composition API 用 setup 把同一功能的 ref/computed/watch/method 聚到一起写成功能块，逻辑内聚可读；更重要的是复用单位从 mixin（命名冲突、来源不清、数据流隐式）变成独立函数 useXxx()，import 进来即可用，来源明确、无命名冲突、TypeScript 类型友好。本质上是从「按选项类型切分」转向「按功能切分」，让大型组件可维护、让逻辑可跨组件复用。",
    tags: ["Composition API", "Options API", "setup", "复用"],
  },
  {
    id: "vjp-composition-api-2",
    chapter: "vjp-composition-api",
    level: 2,
    question: "ref 为什么需要 .value？模板中为什么不用写？",
    answer:
      "JavaScript 原始类型（number/string/boolean）是值类型，赋值是拷贝，无法被 Proxy 代理（Proxy 只能代理对象）。要让原始类型具备响应式，Vue 用一个对象 { value: T } 包裹它，对这个对象的 .value 属性做 get/set 拦截，所以访问和修改必须走 .value 才能触发 track/trigger。模板中不用写 .value 是因为 Vue 的模板编译器做了自动解包（unwrap）：编译时识别 ref 并在 render 里自动加 .value 读取，让模板书写更自然。在 setup 的 JS 代码里没有这层编译魔法，必须显式写 .value。这是一个「编译期便利 vs 运行时显式」的权衡：模板靠编译器擦除心智负担，JS 逻辑靠 .value 提醒你这是响应式引用。",
    tags: ["ref", ".value", "原始类型", "编译"],
  },
  {
    id: "vjp-composition-api-3",
    chapter: "vjp-composition-api",
    level: 3,
    question: "如何把一段逻辑抽成可复用的 Hook？给出结构。",
    answer:
      "把逻辑抽成 Hook 的步骤：①新建 composables/useCounter.ts；②export function useCounter(initial = 0) {...}；③函数内用 ref/reactive 创建响应式状态（如 const count = ref(initial)）；④用 computed 派生（const double = computed(() => count.value * 2)）；⑤定义方法（function increment() { count.value++ }）；⑥按需用 watch/watchEffect 处理副作用；⑦return { count, double, increment } 暴露给使用方。组件里 const { count, increment } = useCounter(10) 即可复用，返回的 ref 在组件里保持响应式。约定：命名以 use 开头；入参可为普通值或 ref（用 unref 统一处理）；返回对象而非数组（具名更清晰、可按需解构）；副作用在组件卸载时用 onScopeDispose/onUnmounted 清理，避免内存泄漏。",
    tags: ["Hooks", "composables", "复用", "setup"],
  },
  {
    id: "vjp-composition-api-4",
    chapter: "vjp-composition-api",
    level: 4,
    question: "setup 的执行时机和它带来的约束。",
    answer:
      "setup 在组件实例创建之初执行，时机在 props 解析之后、beforeCreate 之前——此时组件实例尚未完全创建，data/computed/methods 都还没挂到 this 上，所以 setup 里拿不到 this（Vue 3 故意让 setup 不绑定 this 以避免误用旧选项）。约束：①不能用 this 访问其他选项的数据，必须用 Composition API 自己创建的状态；②生命周期钩子要改用 onMounted/onUnmounted 等组合式函数（在 setup 同步执行期间注册才有效，异步回调里注册会失效）；③props 通过 setup 第一参数接收，且是只读的；④context（emit/attrs/slots）通过第二参数接收；⑤返回的对象属性会被暴露给模板和实例。这个时机设计让 setup 成为「组件的纯逻辑初始化阶段」，强制用组合式而非选项式，是 Composition API 心智的基础。",
    tags: ["setup", "生命周期", "执行时机", "工程思维"],
  },
];
