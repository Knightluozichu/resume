import type { ReviewQuestion } from "./types";

export const jfsStateManagementQuestions: ReviewQuestion[] = [
  {
    id: "jfs-state-management-1",
    chapter: "jfs-state-management",
    level: 2,
    question: "Redux、Zustand、Context 三者各自适合什么场景？",
    answer:
      "Redux 适合大型应用、状态变更逻辑复杂、需严格可追溯（时间旅行调试、中间件日志）的场景，代价是样板代码多。Zustand 适合中小型应用、想要全局状态但嫌 Redux 繁琐的场景，API 极简、按订阅粒度重渲染、无 Provider 包裹。Context 适合「低频变更的全局配置」（主题、语言、当前用户），它是依赖注入机制而非状态库，高频更新会让所有消费者重渲染。选型：先本地 useState；跨组件共享先试 Context（低频）；高频/复杂上 Zustand；超大型团队协作上 Redux。",
    tags: ["状态管理", "选型", "Redux", "Zustand"],
  },
  {
    id: "jfs-state-management-2",
    chapter: "jfs-state-management",
    level: 3,
    question: "为什么 Context 不适合管理高频变化的购物车状态？",
    answer:
      "Context 的机制是「Provider 的 value 变化时，所有消费该 Context 的组件全部重渲染」，它没有细粒度订阅。购物车状态高频变化（频繁增删商品），若用 Context，每次加购都会让所有 useContext(CartContext) 的组件重渲染，哪怕它只关心数量不关心商品列表。Zustand/Redux 支持 selector 订阅切片（只订阅 cart.length 的组件在商品列表变化时不重渲染），能把重渲染范围压到最小。Context 适合低频、全局、几乎所有人都要的整体配置，不适合高频细粒度状态。",
    tags: ["Context", "性能", "重渲染"],
  },
  {
    id: "jfs-state-management-3",
    chapter: "jfs-state-management",
    level: 3,
    question: "什么是 prop drilling？全局状态管理如何解决它？",
    answer:
      "prop drilling 是状态在顶层组件，使用者在最底层，中间组件被迫层层 props 传递。层数一深就不可维护：中间组件被迫接收并转发它自己不关心的 props，改名/重构牵一发动全身。全局状态管理（Redux/Zustand/Context）解决方式：把共享状态放进 store/context，任何组件直接订阅所需切片，跳过中间层——useSelector(s => s.cart) 在最底层直接拿，中间组件完全不感知。判断是否需要全局状态的标志：props 是否穿透了 3 层以上「不使用只转发」的组件。",
    tags: ["prop drilling", "全局状态"],
  },
  {
    id: "jfs-state-management-4",
    chapter: "jfs-state-management",
    level: 4,
    question: "Redux 的单向数据流（action → reducer → store → view）带来什么好处和代价？",
    answer:
      "好处：①可预测——状态变更必须经 reducer 纯函数，给定 state+action 结果确定，可时间旅行调试；②可追溯——action 是显式的变更意图，可日志/回放/序列化；③可测试——reducer 是纯函数，易写单元测试。代价：①样板代码多——action type、action creator、reducer 三件套，简单功能也要写一堆；②异步需中间件（redux-thunk/saga），学习曲线陡；③store 是全局单例，滥用会导致全 app 重渲染。Redux Toolkit 的 createSlice 把 action+reducer 合并大幅减负。判断：团队大、状态复杂、需强可追溯才值这个代价，否则 Zustand 更轻。",
    tags: ["Redux", "单向数据流", "架构"],
  },
];
