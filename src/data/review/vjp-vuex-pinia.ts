import type { ReviewQuestion } from "./types";

export const vjpVuexPiniaQuestions: ReviewQuestion[] = [
  {
    id: "vjp-vuex-pinia-1",
    chapter: "vjp-vuex-pinia",
    level: 2,
    question: `为什么需要状态管理？什么场景下 props/emit 不够用？`,
    answer:
      `props/emit 只适合父子直接通信。当多个不相邻的组件需要共享同一份数据时（如用户登录态、购物车、全局主题），用 props 逐层透传（prop drilling）会让中间组件被迫接收并转发不属于自己的数据，代码臃肿且难维护；用 emit 逐层上报同样繁琐。状态管理把共享数据抽到一个独立的 store，任何组件都能直接读写，数据源单一、变更可追踪（DevTools 时间旅行）。典型场景：跨多层级共享状态、多个视图需同步同一数据、需要集中管理异步操作与数据持久化。若只是父子或兄弟偶尔通信，props/emit + provide/inject 仍是更轻量的选择，不必上全局 store。`,
    tags: ["状态管理", "props", "store"],
  },
  {
    id: "vjp-vuex-pinia-2",
    chapter: "vjp-vuex-pinia",
    level: 2,
    question: `Vuex 的 mutation 为什么必须是同步的？`,
    answer:
      `Vuex 规定 mutation 必须同步，是为了让状态变更「可追踪、可重放」。Vuex 的 DevTools 依赖 mutation 记录每次状态变化的快照（时间旅行调试），同步 mutation 执行完状态就确定，快照准确。若 mutation 内有异步操作（如 setTimeout 里改 state），回调何时执行不可控，DevTools 无法准确捕获「这次 mutation 对应的状态变化」，快照会错乱。异步逻辑放在 action 里：action 可以 async，但它不直接改 state，而是 commit mutation 让同步 mutation 改 state——把「副作用/异步」和「状态变更」分离。Pinia 取消了 mutation 层，action 直接改 state，代价是放弃了严格的同步约束，但 Pinia 靠其他方式保证可调试性。`,
    tags: ["Vuex", "mutation", "同步", "DevTools"],
  },
  {
    id: "vjp-vuex-pinia-3",
    chapter: "vjp-vuex-pinia",
    level: 3,
    question: `Pinia 相比 Vuex 简化了什么？代价是什么？`,
    answer:
      `简化：①去掉 mutation 层，action（同步/异步均可）直接改 state，少一层概念和样板代码；②无嵌套模块，每个 store 平级独立、按需 import，避免命名空间冲突和 namespaced 配置；③天然 TypeScript 友好（store 用函数定义，类型自动推导，Vuex 的类型需大量手动声明）；④支持 setup 风格 store，与 Composition API 心智一致；⑤体积更小。代价：①放弃了 mutation 强制的「同步变更」纪律，开发者需自行约束不在异步回调里乱改；②没有 Vuex 那种严格的单向流图示，新手可能把 action 写得混乱；③从 Vuex 迁移需改造现有代码。对新项目 Pinia 是 Vue 官方推荐，老项目可按需评估迁移成本。`,
    tags: ["Pinia", "Vuex", "对比", "简化"],
  },
  {
    id: "vjp-vuex-pinia-4",
    chapter: "vjp-vuex-pinia",
    level: 4,
    question: `什么时候不该用全局状态管理？`,
    answer:
      `全局状态不是万能药，滥用会让组件失去内聚性、数据流难以追踪。不该用的场景：①组件局部状态（如表单输入值、弹窗开关、当前 tab）应留在组件内 ref，放全局反而让组件依赖外部、降低复用性；②父子直接通信的数据用 props/emit 更显式，塞进 store 会隐藏数据来源；③临时的一次性数据（如某个接口返回的列表）放组件内即可，无需全局化；④只有单一消费者且无跨组件共享需求的数据。判断标准：「这个状态是否被多个不相邻组件共享且需要同步」——是则上 store，否则局部管理。滥用 store 的症状：store 膨胀成大杂烩、组件全是 inject/store 依赖、单元测试要 mock 整个 store。原则：能用局部的就不用全局，store 只放真正共享且需要单一来源的状态。`,
    tags: ["状态管理", "工程判断", "局部状态", "工程思维"],
  },
];
