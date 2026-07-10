import type { ReviewQuestion } from "./types";

export const vjpComponentDesignQuestions: ReviewQuestion[] = [
  {
    id: "vjp-component-design-1",
    chapter: "vjp-component-design",
    level: 2,
    question: `props 单向数据流的含义？子组件直接改 props 会怎样？`,
    answer:
      `单向数据流指数据只能从父组件通过 props 传给子组件，子组件不能反向修改 props（避免子组件无意间改了父组件状态导致数据流混乱、难以追踪）。子组件直接修改 props 在 Vue 3 会报警告（开发模式），且若 props 是对象/数组，修改其内部属性虽然能改成功（因为是引用），但会破坏单向流约定、让父组件状态与 props 来源不一致。正确做法：①子组件想基于 props 派生新值，用 computed 计算，不改 props 本身；②子组件想让父组件改数据，通过 emit 事件通知父组件由父组件改；③需要把 props 当本地可变状态时，用 ref(props.x) 复制一份或用 watch 同步。`,
    tags: ["props", "单向数据流", "emit"],
  },
  {
    id: "vjp-component-design-2",
    chapter: "vjp-component-design",
    level: 2,
    question: `默认插槽、具名插槽、作用域插槽的区别？`,
    answer:
      `默认插槽：父组件写在子组件标签之间的内容，投递到子组件 <slot/> 处，用于「让父决定子组件某区域显示什么」。具名插槽：子组件用 <slot name=\"header\"/> 定义多个占位，父组件用 #header（v-slot:header 缩写）指定内容投到哪个位置，用于「一个组件有多个可定制区域」。作用域插槽：子组件在 <slot :item=\"item\"/> 把数据传给父组件，父组件用 #default=\"{ item }\" 接收，用于「子组件提供数据、父组件决定如何渲染每一项」（典型如列表组件让父定制每行模板）。三者递进：从「父塞内容」到「父分区域塞内容」到「子给数据父定渲染」。`,
    tags: ["slots", "具名插槽", "作用域插槽"],
  },
  {
    id: "vjp-component-design-3",
    chapter: "vjp-component-design",
    level: 3,
    question: `provide/inject 与 props 相比有什么取舍？`,
    answer:
      `provide/inject 是跨层依赖注入：祖先组件 provide(key, value)，任意层级的后代 inject(key) 直接拿到，无需中间组件层层透传 props（避免「prop drilling」）。适合主题、用户信息、i18n、配置这类「很多后代都要、但中间组件不需要」的全局性数据。取舍：①优点——解耦中间层、减少样板代码；②缺点——数据来源不显式（看 inject 处看不出谁 provide），耦合隐藏、调试需借助 DevTools；③响应性——provide 的若是 ref/reactive，后代 inject 拿到的是响应式引用，改了会更新；但若 provide 原始值则非响应式。原则：跨层共享且稳定的依赖用 provide/inject，父子直接通信仍用 props/emit 更显式可控；provide 应尽量提供只读或带约束的接口，避免后代乱改。`,
    tags: ["provide", "inject", "依赖注入", "prop drilling"],
  },
  {
    id: "vjp-component-design-4",
    chapter: "vjp-component-design",
    level: 4,
    question: `为什么说「组件是带契约的黑箱」？这个心智如何指导设计？`,
    answer:
      `「黑箱」指组件封装内部实现，外部只通过约定接口与之交互——props 是入参（输入数据）、emit 是回调（输出事件）、slot 是扩展点（注入内容）、expose 是可选公开的方法。使用者不需要知道内部怎么实现，只要遵守契约就能用。「带契约」强调接口要稳定、可预测、最小化。这个心智指导设计：①props 命名要语义化且数量克制，超过 7 个说明组件职责过大该拆；②emit 事件名要描述「发生了什么」而非「要做什么」（如 emit('add') 而非 emit('incrementParent')），让父组件决定如何响应；③slot 提供合理的默认值，让组件开箱即用；④内部状态尽量不暴露，必须暴露的用 defineExpose 显式声明。契约越清晰，组件越像乐高积木可随意组合；契约越乱，组件越像纠缠的线团改一处崩多处。`,
    tags: ["组件设计", "契约", "封装", "工程思维"],
  },
];
