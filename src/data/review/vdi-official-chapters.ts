import type { ReviewQuestion } from "./types";

export const vdiOfficialQuestions: ReviewQuestion[] = [
  {
    id: "vdi-official-learning-map-1",
    chapter: "vdi-official-learning-map",
    level: 1,
    question: "《Vue.js设计与实现》权威学习地图的核心主张是什么？",
    answer:
      "全书由框架设计概览、响应系统、渲染器、组件化、编译器和服务端渲染6篇18章构成，必须沿模块协作链逐章实现。",
    tags: ["《Vue.js设计与实现》权威学习地图", "核心机制"],
  },
  {
    id: "vdi-official-learning-map-2",
    chapter: "vdi-official-learning-map",
    level: 2,
    question: "《Vue.js设计与实现》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第 1 章 权衡的艺术、第 2 章 框架设计的核心要素、第 3 章 Vue.js 3的设计思路、第 4 章 响应系统的作用与实现、第 5 章 非原始值的响应式方案、第 6 章 原始值的响应式方案、第 7 章 渲染器的设计、第 8 章 挂载与更新、第 9 章 简单Diff算法、第 10 章 双端Diff算法、第 11 章 快速Diff算法、第 12 章 组件的实现原理、第 13 章 异步组件与函数式组件、第 14 章 内建组件和模块、第 15 章 编译器核心技术概览、第 16 章 解析器、第 17 章 编译优化、第 18 章 同构渲染",
    tags: ["《Vue.js设计与实现》权威学习地图", "目录覆盖"],
  },
  {
    id: "vdi-official-learning-map-3",
    chapter: "vdi-official-learning-map",
    level: 2,
    question: "《Vue.js设计与实现》权威学习地图的六阶段机制链是什么？",
    answer:
      "核对18章 → 设计响应系统 → 实现渲染器 → 建立组件模型 → 编译模板 → 完成同构激活",
    tags: ["《Vue.js设计与实现》权威学习地图", "机制链"],
  },
  {
    id: "vdi-official-learning-map-4",
    chapter: "vdi-official-learning-map",
    level: 3,
    question: "《Vue.js设计与实现》权威学习地图应注入哪两类失败？",
    answer:
      "沿用原10页专题结构，把三种Diff、解析器和同构渲染压缩成附带段落。；只阅读Vue源码最终形态，不按书中从规范和最小模型逐步推导。",
    tags: ["《Vue.js设计与实现》权威学习地图", "故障注入"],
  },
  {
    id: "vdi-official-learning-map-5",
    chapter: "vdi-official-learning-map",
    level: 3,
    question: "《Vue.js设计与实现》权威学习地图签发时保持什么不变量？",
    answer:
      "6篇18章各有独立页面，161个公开目录条目可追踪，状态到编译再到同构的模块链可执行且来源边界清楚。",
    tags: ["《Vue.js设计与实现》权威学习地图", "工程验收"],
  },
  {
    id: "vdi-official-learning-map-6",
    chapter: "vdi-official-learning-map",
    level: 3,
    question: "《Vue.js设计与实现》权威学习地图怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["《Vue.js设计与实现》权威学习地图", "可复现实验"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-1",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 1,
    question: "第 1 章 权衡的艺术的核心主张是什么？",
    answer:
      "框架设计不是追求单一最快路径，而是在声明式可维护性、运行时开销和编译时信息之间选择可证明的平衡。",
    tags: ["第 1 章 权衡的艺术", "核心机制"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-2",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 2,
    question: "第 1 章 权衡的艺术覆盖哪些正式目录主题？",
    answer:
      "1.1 命令式和声明式、1.2 性能与可维护性的权衡、1.3 虚拟DOM的性能到底如何、1.4 运行时和编译时、1.5 总结",
    tags: ["第 1 章 权衡的艺术", "目录覆盖"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-3",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 2,
    question: "第 1 章 权衡的艺术的六阶段机制链是什么？",
    answer:
      "描述需求 → 比较范式 → 估算更新成本 → 选择运行策略 → 引入编译信息 → 签发权衡",
    tags: ["第 1 章 权衡的艺术", "机制链"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-4",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 3,
    question: "第 1 章 权衡的艺术应注入哪两类失败？",
    answer:
      "宣称虚拟DOM必然比原生DOM快，却没有定义创建、更新和维护成本。；只按微基准选择范式，忽略业务变化后命令式更新路径的复杂度。",
    tags: ["第 1 章 权衡的艺术", "故障注入"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-5",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 3,
    question: "第 1 章 权衡的艺术签发时保持什么不变量？",
    answer:
      "权衡结论明确输入规模、更新模式和维护目标，运行时与编译时责任可解释，同一基准可以重放。",
    tags: ["第 1 章 权衡的艺术", "工程验收"],
  },
  {
    id: "vdi-01-art-of-tradeoffs-6",
    chapter: "vdi-01-art-of-tradeoffs",
    level: 3,
    question: "第 1 章 权衡的艺术怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 1 章 权衡的艺术", "可复现实验"],
  },
  {
    id: "vdi-02-core-elements-framework-design-1",
    chapter: "vdi-02-core-elements-framework-design",
    level: 1,
    question: "第 2 章 框架设计的核心要素的核心主张是什么？",
    answer:
      "成熟框架同时设计开发体验、体积、产物、特性开关、错误边界和类型，而不是等核心功能完成后再补工程包装。",
    tags: ["第 2 章 框架设计的核心要素", "核心机制"],
  },
  {
    id: "vdi-02-core-elements-framework-design-2",
    chapter: "vdi-02-core-elements-framework-design",
    level: 2,
    question: "第 2 章 框架设计的核心要素覆盖哪些正式目录主题？",
    answer:
      "2.1 提升用户的开发体验、2.2 控制框架代码的体积、2.3 框架要做到良好的Tree-Shaking、2.4 框架应该输出怎样的构建产物、2.5 特性开关、2.6 错误处理、2.7 良好的TypeScript类型支持、2.8 总结",
    tags: ["第 2 章 框架设计的核心要素", "目录覆盖"],
  },
  {
    id: "vdi-02-core-elements-framework-design-3",
    chapter: "vdi-02-core-elements-framework-design",
    level: 2,
    question: "第 2 章 框架设计的核心要素的六阶段机制链是什么？",
    answer:
      "定义用户契约 → 隔离开发代码 → 标记纯调用 → 输出多种产物 → 统一错误边界 → 验证类型",
    tags: ["第 2 章 框架设计的核心要素", "机制链"],
  },
  {
    id: "vdi-02-core-elements-framework-design-4",
    chapter: "vdi-02-core-elements-framework-design",
    level: 3,
    question: "第 2 章 框架设计的核心要素应注入哪两类失败？",
    answer:
      "把开发警告直接带进生产产物，既增加体积又泄露内部上下文。；声称支持Tree-Shaking，但模块顶层注册全局状态导致整包都被视为有副作用。",
    tags: ["第 2 章 框架设计的核心要素", "故障注入"],
  },
  {
    id: "vdi-02-core-elements-framework-design-5",
    chapter: "vdi-02-core-elements-framework-design",
    level: 3,
    question: "第 2 章 框架设计的核心要素签发时保持什么不变量？",
    answer:
      "开发和生产产物可区分，未用能力可被消除，错误进入统一边界，模块格式与类型声明匹配目标环境。",
    tags: ["第 2 章 框架设计的核心要素", "工程验收"],
  },
  {
    id: "vdi-02-core-elements-framework-design-6",
    chapter: "vdi-02-core-elements-framework-design",
    level: 3,
    question: "第 2 章 框架设计的核心要素怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 2 章 框架设计的核心要素", "可复现实验"],
  },
  {
    id: "vdi-03-vue3-design-thinking-1",
    chapter: "vdi-03-vue3-design-thinking",
    level: 1,
    question: "第 3 章 Vue.js 3的设计思路的核心主张是什么？",
    answer:
      "Vue 3由响应系统、渲染器、组件和编译器协作：状态触发组件副作用，组件产出VNode，渲染器提交宿主变更，编译器提供优化信息。",
    tags: ["第 3 章 Vue.js 3的设计思路", "核心机制"],
  },
  {
    id: "vdi-03-vue3-design-thinking-2",
    chapter: "vdi-03-vue3-design-thinking",
    level: 2,
    question: "第 3 章 Vue.js 3的设计思路覆盖哪些正式目录主题？",
    answer:
      "3.1 声明式地描述UI、3.2 初识渲染器、3.3 组件的本质、3.4 模板的工作原理、3.5 Vue.js是各个模块组成的有机整体、3.6 总结",
    tags: ["第 3 章 Vue.js 3的设计思路", "目录覆盖"],
  },
  {
    id: "vdi-03-vue3-design-thinking-3",
    chapter: "vdi-03-vue3-design-thinking",
    level: 2,
    question: "第 3 章 Vue.js 3的设计思路的六阶段机制链是什么？",
    answer:
      "声明模板 → 编译render → 执行组件 → 生成VNode → 渲染宿主节点 → 响应状态更新",
    tags: ["第 3 章 Vue.js 3的设计思路", "机制链"],
  },
  {
    id: "vdi-03-vue3-design-thinking-4",
    chapter: "vdi-03-vue3-design-thinking",
    level: 3,
    question: "第 3 章 Vue.js 3的设计思路应注入哪两类失败？",
    answer:
      "把模板、响应式和DOM更新看成三个独立黑盒，无法解释一次状态写入的调用链。；把VNode等同真实DOM并在业务代码中直接修改，破坏渲染器的所有权。",
    tags: ["第 3 章 Vue.js 3的设计思路", "故障注入"],
  },
  {
    id: "vdi-03-vue3-design-thinking-5",
    chapter: "vdi-03-vue3-design-thinking",
    level: 3,
    question: "第 3 章 Vue.js 3的设计思路签发时保持什么不变量？",
    answer:
      "任一状态更新都能追踪到effect、组件render、VNode比较和宿主提交，模块边界不循环持有无关状态。",
    tags: ["第 3 章 Vue.js 3的设计思路", "工程验收"],
  },
  {
    id: "vdi-03-vue3-design-thinking-6",
    chapter: "vdi-03-vue3-design-thinking",
    level: 3,
    question: "第 3 章 Vue.js 3的设计思路怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 3 章 Vue.js 3的设计思路", "可复现实验"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-1",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 1,
    question: "第 4 章 响应系统的作用与实现的核心主张是什么？",
    answer:
      "完善响应系统需要精确依赖、cleanup、嵌套effect栈、递归保护、调度、computed惰性缓存和watch过期清理共同成立。",
    tags: ["第 4 章 响应系统的作用与实现", "核心机制"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-2",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 2,
    question: "第 4 章 响应系统的作用与实现覆盖哪些正式目录主题？",
    answer:
      "4.1 响应式数据与副作用函数、4.2 响应式数据的基本实现、4.3 设计一个完善的响应系统、4.4 分支切换与cleanup、4.5 嵌套的effect与effect栈、4.6 避免无限递归循环、4.7 调度执行、4.8 计算属性computed与lazy、4.9 watch的实现原理、4.10 立即执行的watch与回调执行时机、4.11 过期的副作用、4.12 总结",
    tags: ["第 4 章 响应系统的作用与实现", "目录覆盖"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-3",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 2,
    question: "第 4 章 响应系统的作用与实现的六阶段机制链是什么？",
    answer:
      "执行effect → 读取并track → 清理旧依赖 → 写入并trigger → 调度去重 → 处理过期副作用",
    tags: ["第 4 章 响应系统的作用与实现", "机制链"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-4",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 3,
    question: "第 4 章 响应系统的作用与实现应注入哪两类失败？",
    answer:
      "effect重新执行前不cleanup，分支离开后旧属性仍触发副作用。；watch异步请求不注册失效回调，较慢旧响应覆盖较快新响应。",
    tags: ["第 4 章 响应系统的作用与实现", "故障注入"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-5",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 3,
    question: "第 4 章 响应系统的作用与实现签发时保持什么不变量？",
    answer:
      "依赖随分支精确收敛，嵌套effect归属正确，同步自触发受阻，调度去重，computed与watch不会提交过期结果。",
    tags: ["第 4 章 响应系统的作用与实现", "工程验收"],
  },
  {
    id: "vdi-04-reactivity-role-implementation-6",
    chapter: "vdi-04-reactivity-role-implementation",
    level: 3,
    question: "第 4 章 响应系统的作用与实现怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 4 章 响应系统的作用与实现", "可复现实验"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-1",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 1,
    question: "第 5 章 非原始值的响应式方案的核心主张是什么？",
    answer:
      "对象响应式必须按ECMAScript对象语义区分读取、设置、新增、删除、遍历、数组长度和集合迭代，不能只实现get与set。",
    tags: ["第 5 章 非原始值的响应式方案", "核心机制"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-2",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 2,
    question: "第 5 章 非原始值的响应式方案覆盖哪些正式目录主题？",
    answer:
      "5.1 理解Proxy和Reflect、5.2 JavaScript对象及Proxy的工作原理、5.3 如何代理Object、5.4 合理地触发响应、5.5 浅响应与深响应、5.6 只读和浅只读、5.7 代理数组、5.7.1 数组的索引与length、5.7.2 遍历数组、5.7.3 数组的查找方法、5.7.4 隐式修改数组长度的原型方法、5.8 代理Set和Map、5.8.1 如何代理Set和Map、5.8.2 建立响应联系、5.8.3 避免污染原始数据、5.8.4 处理forEach、5.8.5 迭代器方法、5.8.6 values与keys方法、5.9 总结",
    tags: ["第 5 章 非原始值的响应式方案", "目录覆盖"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-3",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 2,
    question: "第 5 章 非原始值的响应式方案的六阶段机制链是什么？",
    answer:
      "代理对象 → 按操作track → 区分ADD与SET → 代理数组语义 → 封装集合方法 → 阻止原始污染",
    tags: ["第 5 章 非原始值的响应式方案", "机制链"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-4",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 3,
    question: "第 5 章 非原始值的响应式方案应注入哪两类失败？",
    answer:
      "代理Object只拦截get和set，删除属性或for-in变化时视图不更新。；把响应式代理对象直接写入原始Map，之后从原始入口读取也携带代理污染。",
    tags: ["第 5 章 非原始值的响应式方案", "故障注入"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-5",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 3,
    question: "第 5 章 非原始值的响应式方案签发时保持什么不变量？",
    answer:
      "对象、数组、Map和Set的读取与结构变化触发准确，原型链不重复触发，浅深只读语义清楚，原始数据不被代理污染。",
    tags: ["第 5 章 非原始值的响应式方案", "工程验收"],
  },
  {
    id: "vdi-05-non-primitive-reactivity-6",
    chapter: "vdi-05-non-primitive-reactivity",
    level: 3,
    question: "第 5 章 非原始值的响应式方案怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 5 章 非原始值的响应式方案", "可复现实验"],
  },
  {
    id: "vdi-06-primitive-reactivity-1",
    chapter: "vdi-06-primitive-reactivity",
    level: 1,
    question: "第 6 章 原始值的响应式方案的核心主张是什么？",
    answer:
      "原始值不能被Proxy直接代理，ref以对象属性承载它；toRef和自动脱ref必须在保持原对象联系的前提下改善使用体验。",
    tags: ["第 6 章 原始值的响应式方案", "核心机制"],
  },
  {
    id: "vdi-06-primitive-reactivity-2",
    chapter: "vdi-06-primitive-reactivity",
    level: 2,
    question: "第 6 章 原始值的响应式方案覆盖哪些正式目录主题？",
    answer: "6.1 引入ref的概念、6.2 响应丢失问题、6.3 自动脱ref、6.4 总结",
    tags: ["第 6 章 原始值的响应式方案", "目录覆盖"],
  },
  {
    id: "vdi-06-primitive-reactivity-3",
    chapter: "vdi-06-primitive-reactivity",
    level: 2,
    question: "第 6 章 原始值的响应式方案的六阶段机制链是什么？",
    answer:
      "包装原始值 → 读取value → 追踪依赖 → 映射对象属性 → 代理脱ref → 写回来源",
    tags: ["第 6 章 原始值的响应式方案", "机制链"],
  },
  {
    id: "vdi-06-primitive-reactivity-4",
    chapter: "vdi-06-primitive-reactivity",
    level: 3,
    question: "第 6 章 原始值的响应式方案应注入哪两类失败？",
    answer:
      "用{ value: state.count }复制当前数字，误以为它仍与响应式对象保持联系。；任何对象只要有value属性就自动脱ref，业务对象被误判并改写。",
    tags: ["第 6 章 原始值的响应式方案", "故障注入"],
  },
  {
    id: "vdi-06-primitive-reactivity-5",
    chapter: "vdi-06-primitive-reactivity",
    level: 3,
    question: "第 6 章 原始值的响应式方案签发时保持什么不变量？",
    answer:
      "原始值读写可追踪，toRef始终连接来源属性，自动脱ref只识别真实ref，替换ref和写入value的语义不混淆。",
    tags: ["第 6 章 原始值的响应式方案", "工程验收"],
  },
  {
    id: "vdi-06-primitive-reactivity-6",
    chapter: "vdi-06-primitive-reactivity",
    level: 3,
    question: "第 6 章 原始值的响应式方案怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 6 章 原始值的响应式方案", "可复现实验"],
  },
  {
    id: "vdi-07-renderer-design-1",
    chapter: "vdi-07-renderer-design",
    level: 1,
    question: "第 7 章 渲染器的设计的核心主张是什么？",
    answer:
      "渲染器核心只理解VNode和生命周期，把平台操作注入后，响应式effect负责驱动新旧子树比较。",
    tags: ["第 7 章 渲染器的设计", "核心机制"],
  },
  {
    id: "vdi-07-renderer-design-2",
    chapter: "vdi-07-renderer-design",
    level: 2,
    question: "第 7 章 渲染器的设计覆盖哪些正式目录主题？",
    answer:
      "7.1 渲染器与响应系统的结合、7.2 渲染器的基本概念、7.3 自定义渲染器、7.4 总结",
    tags: ["第 7 章 渲染器的设计", "目录覆盖"],
  },
  {
    id: "vdi-07-renderer-design-3",
    chapter: "vdi-07-renderer-design",
    level: 2,
    question: "第 7 章 渲染器的设计的六阶段机制链是什么？",
    answer:
      "执行组件effect → 生成VNode → 识别节点类型 → 调用宿主操作 → 保存旧VNode → 更新或卸载",
    tags: ["第 7 章 渲染器的设计", "机制链"],
  },
  {
    id: "vdi-07-renderer-design-4",
    chapter: "vdi-07-renderer-design",
    level: 3,
    question: "第 7 章 渲染器的设计应注入哪两类失败？",
    answer:
      "渲染器核心直接调用document，所谓自定义渲染器只换了容器参数。；容器不保存旧VNode，每次render都重新挂载并留下旧节点。",
    tags: ["第 7 章 渲染器的设计", "故障注入"],
  },
  {
    id: "vdi-07-renderer-design-5",
    chapter: "vdi-07-renderer-design",
    level: 3,
    question: "第 7 章 渲染器的设计签发时保持什么不变量？",
    answer:
      "宿主操作可替换，节点类型分派完整，容器保留唯一旧VNode，响应更新被调度去重，render(null)对称卸载。",
    tags: ["第 7 章 渲染器的设计", "工程验收"],
  },
  {
    id: "vdi-07-renderer-design-6",
    chapter: "vdi-07-renderer-design",
    level: 3,
    question: "第 7 章 渲染器的设计怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 7 章 渲染器的设计", "可复现实验"],
  },
  {
    id: "vdi-08-mount-update-1",
    chapter: "vdi-08-mount-update",
    level: 1,
    question: "第 8 章 挂载与更新的核心主张是什么？",
    answer:
      "正确挂载更新要区分属性与property、子节点类型、事件时序、Fragment边界和卸载资源，不能只比较props对象。",
    tags: ["第 8 章 挂载与更新", "核心机制"],
  },
  {
    id: "vdi-08-mount-update-2",
    chapter: "vdi-08-mount-update",
    level: 2,
    question: "第 8 章 挂载与更新覆盖哪些正式目录主题？",
    answer:
      "8.1 挂载子节点和元素的属性、8.2 HTML Attributes与DOM Properties、8.3 正确地设置元素属性、8.4 class的处理、8.5 卸载操作、8.6 区分vnode的类型、8.7 事件的处理、8.8 事件冒泡与更新时机问题、8.9 更新子节点、8.10 文本节点和注释节点、8.11 Fragment、8.12 总结",
    tags: ["第 8 章 挂载与更新", "目录覆盖"],
  },
  {
    id: "vdi-08-mount-update-3",
    chapter: "vdi-08-mount-update",
    level: 2,
    question: "第 8 章 挂载与更新的六阶段机制链是什么？",
    answer:
      "创建元素 → 设置属性 → 挂载子节点 → 安装事件伪造器 → 比较并更新 → 卸载清理",
    tags: ["第 8 章 挂载与更新", "机制链"],
  },
  {
    id: "vdi-08-mount-update-4",
    chapter: "vdi-08-mount-update",
    level: 3,
    question: "第 8 章 挂载与更新应注入哪两类失败？",
    answer:
      "所有属性都用setAttribute，input.value和布尔disabled得到错误运行语义。；更新事件时反复remove/add，且新处理器收到正在冒泡的旧事件。",
    tags: ["第 8 章 挂载与更新", "故障注入"],
  },
  {
    id: "vdi-08-mount-update-5",
    chapter: "vdi-08-mount-update",
    level: 3,
    question: "第 8 章 挂载与更新签发时保持什么不变量？",
    answer:
      "属性落入正确通道，事件处理器更新无重复和时序穿透，文本数组空值转换完整，Fragment与组件卸载不残留节点或监听器。",
    tags: ["第 8 章 挂载与更新", "工程验收"],
  },
  {
    id: "vdi-08-mount-update-6",
    chapter: "vdi-08-mount-update",
    level: 3,
    question: "第 8 章 挂载与更新怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 8 章 挂载与更新", "可复现实验"],
  },
  {
    id: "vdi-09-simple-diff-1",
    chapter: "vdi-09-simple-diff",
    level: 1,
    question: "第 9 章 简单Diff算法的核心主张是什么？",
    answer:
      "简单Diff用key建立身份，记录已遇到的最大旧索引判断移动，并通过锚点完成复用、新增和删除。",
    tags: ["第 9 章 简单Diff算法", "核心机制"],
  },
  {
    id: "vdi-09-simple-diff-2",
    chapter: "vdi-09-simple-diff",
    level: 2,
    question: "第 9 章 简单Diff算法覆盖哪些正式目录主题？",
    answer:
      "9.1 减少DOM操作的性能开销、9.2 DOM复用与key的作用、9.3 找到需要移动的元素、9.4 如何移动元素、9.5 添加新元素、9.6 移除不存在的元素、9.7 总结",
    tags: ["第 9 章 简单Diff算法", "目录覆盖"],
  },
  {
    id: "vdi-09-simple-diff-3",
    chapter: "vdi-09-simple-diff",
    level: 2,
    question: "第 9 章 简单Diff算法的六阶段机制链是什么？",
    answer:
      "遍历新子序列 → 按key查旧节点 → patch复用节点 → 比较旧索引 → 移动或新增 → 清理旧节点",
    tags: ["第 9 章 简单Diff算法", "机制链"],
  },
  {
    id: "vdi-09-simple-diff-4",
    chapter: "vdi-09-simple-diff",
    level: 3,
    question: "第 9 章 简单Diff算法应注入哪两类失败？",
    answer:
      "把数组索引当key，插入首项后所有业务实体沿用错误组件实例。；只patch匹配节点而不真正insert移动，DOM顺序仍停留在旧序列。",
    tags: ["第 9 章 简单Diff算法", "故障注入"],
  },
  {
    id: "vdi-09-simple-diff-5",
    chapter: "vdi-09-simple-diff",
    level: 3,
    question: "第 9 章 简单Diff算法签发时保持什么不变量？",
    answer:
      "key唯一稳定，复用只发生在类型兼容节点，移动锚点正确，新增按新顺序落位，旧节点完整卸载。",
    tags: ["第 9 章 简单Diff算法", "工程验收"],
  },
  {
    id: "vdi-09-simple-diff-6",
    chapter: "vdi-09-simple-diff",
    level: 3,
    question: "第 9 章 简单Diff算法怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 9 章 简单Diff算法", "可复现实验"],
  },
  {
    id: "vdi-10-double-ended-diff-1",
    chapter: "vdi-10-double-ended-diff",
    level: 1,
    question: "第 10 章 双端Diff算法的核心主张是什么？",
    answer:
      "双端Diff通过新旧头尾四种比较快速处理反转和端部移动，未命中时搜索新头在旧序列的位置并维护空洞。",
    tags: ["第 10 章 双端Diff算法", "核心机制"],
  },
  {
    id: "vdi-10-double-ended-diff-2",
    chapter: "vdi-10-double-ended-diff",
    level: 2,
    question: "第 10 章 双端Diff算法覆盖哪些正式目录主题？",
    answer:
      "10.1 双端比较的原理、10.2 双端比较的优势、10.3 非理想状况的处理方式、10.4 添加新元素、10.5 移除不存在的元素、10.6 总结",
    tags: ["第 10 章 双端Diff算法", "目录覆盖"],
  },
  {
    id: "vdi-10-double-ended-diff-3",
    chapter: "vdi-10-double-ended-diff",
    level: 2,
    question: "第 10 章 双端Diff算法的六阶段机制链是什么？",
    answer:
      "比较旧头新头 → 比较旧尾新尾 → 比较旧头新尾 → 比较旧尾新头 → 处理非理想命中 → 补挂或卸载",
    tags: ["第 10 章 双端Diff算法", "机制链"],
  },
  {
    id: "vdi-10-double-ended-diff-4",
    chapter: "vdi-10-double-ended-diff",
    level: 3,
    question: "第 10 章 双端Diff算法应注入哪两类失败？",
    answer:
      "移动后不把旧数组位置标空，后续再次处理同一VNode并重复操作DOM。；旧区间先耗尽时一律append，忽略剩余新节点应插入的锚点。",
    tags: ["第 10 章 双端Diff算法", "故障注入"],
  },
  {
    id: "vdi-10-double-ended-diff-5",
    chapter: "vdi-10-double-ended-diff",
    level: 3,
    question: "第 10 章 双端Diff算法签发时保持什么不变量？",
    answer:
      "四种端点比较推进正确，空洞不会重复处理，非理想查找保持身份，剩余新增和删除区间边界无越界。",
    tags: ["第 10 章 双端Diff算法", "工程验收"],
  },
  {
    id: "vdi-10-double-ended-diff-6",
    chapter: "vdi-10-double-ended-diff",
    level: 3,
    question: "第 10 章 双端Diff算法怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 10 章 双端Diff算法", "可复现实验"],
  },
  {
    id: "vdi-11-fast-diff-1",
    chapter: "vdi-11-fast-diff",
    level: 1,
    question: "第 11 章 快速Diff算法的核心主张是什么？",
    answer:
      "快速Diff剥离公共前后缀，用key索引填充source数组并识别移动，再以最长递增子序列保留最多不动节点。",
    tags: ["第 11 章 快速Diff算法", "核心机制"],
  },
  {
    id: "vdi-11-fast-diff-2",
    chapter: "vdi-11-fast-diff",
    level: 2,
    question: "第 11 章 快速Diff算法覆盖哪些正式目录主题？",
    answer:
      "11.1 相同的前置元素和后置元素、11.2 判断是否需要进行DOM移动操作、11.3 如何移动元素、11.4 总结",
    tags: ["第 11 章 快速Diff算法", "目录覆盖"],
  },
  {
    id: "vdi-11-fast-diff-3",
    chapter: "vdi-11-fast-diff",
    level: 2,
    question: "第 11 章 快速Diff算法的六阶段机制链是什么？",
    answer:
      "同步前缀 → 同步后缀 → 建立key索引 → 填充source → 计算LIS → 逆序挂载移动",
    tags: ["第 11 章 快速Diff算法", "机制链"],
  },
  {
    id: "vdi-11-fast-diff-4",
    chapter: "vdi-11-fast-diff",
    level: 3,
    question: "第 11 章 快速Diff算法应注入哪两类失败？",
    answer:
      "source记录新索引而不是旧索引，LIS结果无法表示旧DOM相对顺序。；正序执行移动，目标右侧锚点尚未就位导致最终顺序错误。",
    tags: ["第 11 章 快速Diff算法", "故障注入"],
  },
  {
    id: "vdi-11-fast-diff-5",
    chapter: "vdi-11-fast-diff",
    level: 3,
    question: "第 11 章 快速Diff算法签发时保持什么不变量？",
    answer:
      "公共前后缀只处理一次，source语义统一，移动标志准确，LIS节点不动，逆序插入得到与新VNode完全一致的顺序。",
    tags: ["第 11 章 快速Diff算法", "工程验收"],
  },
  {
    id: "vdi-11-fast-diff-6",
    chapter: "vdi-11-fast-diff",
    level: 3,
    question: "第 11 章 快速Diff算法怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 11 章 快速Diff算法", "可复现实验"],
  },
  {
    id: "vdi-12-component-implementation-1",
    chapter: "vdi-12-component-implementation",
    level: 1,
    question: "第 12 章 组件的实现原理的核心主张是什么？",
    answer:
      "组件实例汇集自身状态、props、slots、生命周期和子树；effect驱动自更新，父VNode变化驱动被动更新，setup连接组合式API。",
    tags: ["第 12 章 组件的实现原理", "核心机制"],
  },
  {
    id: "vdi-12-component-implementation-2",
    chapter: "vdi-12-component-implementation",
    level: 2,
    question: "第 12 章 组件的实现原理覆盖哪些正式目录主题？",
    answer:
      "12.1 渲染组件、12.2 组件状态与自更新、12.3 组件实例与组件的生命周期、12.4 props与组件的被动更新、12.5 setup函数的作用与实现、12.6 组件事件与emit的实现、12.7 插槽的工作原理与实现、12.8 注册生命周期、12.9 总结",
    tags: ["第 12 章 组件的实现原理", "目录覆盖"],
  },
  {
    id: "vdi-12-component-implementation-3",
    chapter: "vdi-12-component-implementation",
    level: 2,
    question: "第 12 章 组件的实现原理的六阶段机制链是什么？",
    answer:
      "创建实例 → 解析props与slots → 执行setup → 运行render effect → patch子树 → 触发生命周期",
    tags: ["第 12 章 组件的实现原理", "机制链"],
  },
  {
    id: "vdi-12-component-implementation-4",
    chapter: "vdi-12-component-implementation",
    level: 3,
    question: "第 12 章 组件的实现原理应注入哪两类失败？",
    answer:
      "每次父组件更新都新建子组件实例，局部状态和生命周期被无意重置。；setup结束后仍把currentInstance留在全局，异步回调向错误组件注册生命周期。",
    tags: ["第 12 章 组件的实现原理", "故障注入"],
  },
  {
    id: "vdi-12-component-implementation-5",
    chapter: "vdi-12-component-implementation",
    level: 3,
    question: "第 12 章 组件的实现原理签发时保持什么不变量？",
    answer:
      "实例在同一身份下复用，自更新和被动更新路径可区分，props只读且可刷新，setup上下文及时恢复，生命周期顺序稳定。",
    tags: ["第 12 章 组件的实现原理", "工程验收"],
  },
  {
    id: "vdi-12-component-implementation-6",
    chapter: "vdi-12-component-implementation",
    level: 3,
    question: "第 12 章 组件的实现原理怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 12 章 组件的实现原理", "可复现实验"],
  },
  {
    id: "vdi-13-async-functional-components-1",
    chapter: "vdi-13-async-functional-components",
    level: 1,
    question: "第 13 章 异步组件与函数式组件的核心主张是什么？",
    answer:
      "异步组件是加载状态机，必须协调延迟、超时、错误、重试与卸载；函数式组件则用更小实例成本表达纯输入视图。",
    tags: ["第 13 章 异步组件与函数式组件", "核心机制"],
  },
  {
    id: "vdi-13-async-functional-components-2",
    chapter: "vdi-13-async-functional-components",
    level: 2,
    question: "第 13 章 异步组件与函数式组件覆盖哪些正式目录主题？",
    answer:
      "13.1 异步组件要解决的问题、13.2 异步组件的实现原理、13.2.1 封装defineAsyncComponent函数、13.2.2 超时与Error组件、13.2.3 延迟与Loading组件、13.2.4 重试机制、13.3 函数式组件、13.4 总结",
    tags: ["第 13 章 异步组件与函数式组件", "目录覆盖"],
  },
  {
    id: "vdi-13-async-functional-components-3",
    chapter: "vdi-13-async-functional-components",
    level: 2,
    question: "第 13 章 异步组件与函数式组件的六阶段机制链是什么？",
    answer:
      "启动loader → 等待延迟 → 显示Loading → 处理超时错误 → 按策略重试 → 渲染已加载组件",
    tags: ["第 13 章 异步组件与函数式组件", "机制链"],
  },
  {
    id: "vdi-13-async-functional-components-4",
    chapter: "vdi-13-async-functional-components",
    level: 3,
    question: "第 13 章 异步组件与函数式组件应注入哪两类失败？",
    answer:
      "加载成功后未清除延迟或超时计时器，稍后又把已成功界面切成错误状态。；重试只再次调用loader却不返回Promise，包装组件永远等待第一次失败结果。",
    tags: ["第 13 章 异步组件与函数式组件", "故障注入"],
  },
  {
    id: "vdi-13-async-functional-components-5",
    chapter: "vdi-13-async-functional-components",
    level: 3,
    question: "第 13 章 异步组件与函数式组件签发时保持什么不变量？",
    answer:
      "加载状态互斥，计时器和卸载对称，重试次数与结果版本可追踪，晚到响应不能覆盖新尝试，函数式props契约明确。",
    tags: ["第 13 章 异步组件与函数式组件", "工程验收"],
  },
  {
    id: "vdi-13-async-functional-components-6",
    chapter: "vdi-13-async-functional-components",
    level: 3,
    question: "第 13 章 异步组件与函数式组件怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 13 章 异步组件与函数式组件", "可复现实验"],
  },
  {
    id: "vdi-14-built-in-components-modules-1",
    chapter: "vdi-14-built-in-components-modules",
    level: 1,
    question: "第 14 章 内建组件和模块的核心主张是什么？",
    answer:
      "KeepAlive、Teleport和Transition都需要渲染器配合：分别改写组件寿命、宿主位置和挂载卸载时序。",
    tags: ["第 14 章 内建组件和模块", "核心机制"],
  },
  {
    id: "vdi-14-built-in-components-modules-2",
    chapter: "vdi-14-built-in-components-modules",
    level: 2,
    question: "第 14 章 内建组件和模块覆盖哪些正式目录主题？",
    answer:
      "14.1 KeepAlive组件的实现原理、14.1.1 组件的激活与失活、14.1.2 include和exclude、14.1.3 缓存管理、14.2 Teleport组件的实现原理、14.2.1 Teleport组件要解决的问题、14.2.2 实现Teleport组件、14.3 Transition组件的实现原理、14.3.1 原生DOM的过渡、14.3.2 实现Transition组件、14.4 总结",
    tags: ["第 14 章 内建组件和模块", "目录覆盖"],
  },
  {
    id: "vdi-14-built-in-components-modules-3",
    chapter: "vdi-14-built-in-components-modules",
    level: 2,
    question: "第 14 章 内建组件和模块的六阶段机制链是什么？",
    answer:
      "识别内建类型 → 缓存或选目标 → 注入渲染钩子 → 移动宿主节点 → 协调过渡阶段 → 清理缓存资源",
    tags: ["第 14 章 内建组件和模块", "机制链"],
  },
  {
    id: "vdi-14-built-in-components-modules-4",
    chapter: "vdi-14-built-in-components-modules",
    level: 3,
    question: "第 14 章 内建组件和模块应注入哪两类失败？",
    answer:
      "KeepAlive只缓存DOM不缓存组件实例，重新激活后状态和生命周期不一致。；Transition立即卸载离开节点，CSS类名存在却没有任何可过渡的宿主对象。",
    tags: ["第 14 章 内建组件和模块", "故障注入"],
  },
  {
    id: "vdi-14-built-in-components-modules-5",
    chapter: "vdi-14-built-in-components-modules",
    level: 3,
    question: "第 14 章 内建组件和模块签发时保持什么不变量？",
    answer:
      "缓存身份与淘汰明确，激活失活不重复挂载，Teleport目标切换保留逻辑父子关系，过渡结束或取消后类名和回调全部清理。",
    tags: ["第 14 章 内建组件和模块", "工程验收"],
  },
  {
    id: "vdi-14-built-in-components-modules-6",
    chapter: "vdi-14-built-in-components-modules",
    level: 3,
    question: "第 14 章 内建组件和模块怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 14 章 内建组件和模块", "可复现实验"],
  },
  {
    id: "vdi-15-compiler-core-overview-1",
    chapter: "vdi-15-compiler-core-overview",
    level: 1,
    question: "第 15 章 编译器核心技术概览的核心主张是什么？",
    answer:
      "模板编译器沿解析、模板AST转换、JavaScript AST生成和代码输出推进，插件通过进入与退出阶段安全改写树。",
    tags: ["第 15 章 编译器核心技术概览", "核心机制"],
  },
  {
    id: "vdi-15-compiler-core-overview-2",
    chapter: "vdi-15-compiler-core-overview",
    level: 2,
    question: "第 15 章 编译器核心技术概览覆盖哪些正式目录主题？",
    answer:
      "15.1 模板DSL的编译器、15.2 parser的实现原理与状态机、15.3 构造AST、15.4 AST的转换与插件化架构、15.4.1 节点的访问、15.4.2 转换上下文与节点操作、15.4.3 进入与退出、15.5 将模板AST转为JavaScript AST、15.6 代码生成、15.7 总结",
    tags: ["第 15 章 编译器核心技术概览", "目录覆盖"],
  },
  {
    id: "vdi-15-compiler-core-overview-3",
    chapter: "vdi-15-compiler-core-overview",
    level: 2,
    question: "第 15 章 编译器核心技术概览的六阶段机制链是什么？",
    answer:
      "读取模板 → 状态机解析 → 构造模板AST → 插件化转换 → 生成JS AST → 输出render代码",
    tags: ["第 15 章 编译器核心技术概览", "机制链"],
  },
  {
    id: "vdi-15-compiler-core-overview-4",
    chapter: "vdi-15-compiler-core-overview",
    level: 3,
    question: "第 15 章 编译器核心技术概览应注入哪两类失败？",
    answer:
      "parser直接拼render源码，属性转义和嵌套结构一复杂就失去可组合性。；转换父节点时立即读取子节点codegen结果，退出回调尚未执行导致数据为空。",
    tags: ["第 15 章 编译器核心技术概览", "故障注入"],
  },
  {
    id: "vdi-15-compiler-core-overview-5",
    chapter: "vdi-15-compiler-core-overview",
    level: 3,
    question: "第 15 章 编译器核心技术概览签发时保持什么不变量？",
    answer:
      "解析与生成分层，AST节点位置可追踪，插件遍历顺序确定，替换删除不跳节点，生成代码可重新解析并执行。",
    tags: ["第 15 章 编译器核心技术概览", "工程验收"],
  },
  {
    id: "vdi-15-compiler-core-overview-6",
    chapter: "vdi-15-compiler-core-overview",
    level: 3,
    question: "第 15 章 编译器核心技术概览怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 15 章 编译器核心技术概览", "可复现实验"],
  },
  {
    id: "vdi-16-parser-1",
    chapter: "vdi-16-parser",
    level: 1,
    question: "第 16 章 解析器的核心主张是什么？",
    answer:
      "符合HTML语义的模板解析器必须让文本模式、祖先栈、递归下降、属性解析和字符引用解码共同约束何时开始与停止。",
    tags: ["第 16 章 解析器", "核心机制"],
  },
  {
    id: "vdi-16-parser-2",
    chapter: "vdi-16-parser",
    level: 2,
    question: "第 16 章 解析器覆盖哪些正式目录主题？",
    answer:
      "16.1 文本模式及其对解析器的影响、16.2 递归下降算法构造模板AST、16.3 状态机的开启与停止、16.4 解析标签节点、16.5 解析属性、16.6 解析文本与解码HTML实体、16.6.1 解析文本、16.6.2 解码命名字符引用、16.6.3 解码数字字符引用、16.7 解析插值与注释、16.8 总结",
    tags: ["第 16 章 解析器", "目录覆盖"],
  },
  {
    id: "vdi-16-parser-3",
    chapter: "vdi-16-parser",
    level: 2,
    question: "第 16 章 解析器的六阶段机制链是什么？",
    answer:
      "选择文本模式 → 识别节点起点 → 解析标签属性 → 递归解析子节点 → 解码字符引用 → 验证结束标签",
    tags: ["第 16 章 解析器", "机制链"],
  },
  {
    id: "vdi-16-parser-4",
    chapter: "vdi-16-parser",
    level: 3,
    question: "第 16 章 解析器应注入哪两类失败？",
    answer:
      "任何</都结束当前元素，嵌套标签遇到兄弟结束符时提前截断AST。；非法输入不消费字符也不抛错，parseChildren在同一位置无限循环。",
    tags: ["第 16 章 解析器", "故障注入"],
  },
  {
    id: "vdi-16-parser-5",
    chapter: "vdi-16-parser",
    level: 3,
    question: "第 16 章 解析器签发时保持什么不变量？",
    answer:
      "每次循环都消费输入或显式失败，结束标签与祖先匹配，文本模式切换恢复，属性和字符引用按上下文解码，错误包含位置。",
    tags: ["第 16 章 解析器", "工程验收"],
  },
  {
    id: "vdi-16-parser-6",
    chapter: "vdi-16-parser",
    level: 3,
    question: "第 16 章 解析器怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 16 章 解析器", "可复现实验"],
  },
  {
    id: "vdi-17-compiler-optimization-1",
    chapter: "vdi-17-compiler-optimization",
    level: 1,
    question: "第 17 章 编译优化的核心主张是什么？",
    answer:
      "编译优化把模板已知信息编码为PatchFlags和Block树，再通过静态提升、预字符串化与缓存减少运行时创建和比较。",
    tags: ["第 17 章 编译优化", "核心机制"],
  },
  {
    id: "vdi-17-compiler-optimization-2",
    chapter: "vdi-17-compiler-optimization",
    level: 2,
    question: "第 17 章 编译优化覆盖哪些正式目录主题？",
    answer:
      "17.1 动态节点收集与补丁标志、17.1.1 传统Diff算法的问题、17.1.2 Block与PatchFlags、17.1.3 收集动态节点、17.1.4 渲染器的运行时支持、17.2 Block树、17.2.1 带有v-if指令的节点、17.2.2 带有v-for指令的节点、17.2.3 Fragment的稳定性、17.3 静态提升、17.4 预字符串化、17.5 缓存内联事件处理函数、17.6 v-once、17.7 总结",
    tags: ["第 17 章 编译优化", "目录覆盖"],
  },
  {
    id: "vdi-17-compiler-optimization-3",
    chapter: "vdi-17-compiler-optimization",
    level: 2,
    question: "第 17 章 编译优化的六阶段机制链是什么？",
    answer:
      "分析动态绑定 → 写入PatchFlags → 打开Block → 收集动态节点 → 提升静态内容 → 运行时快速patch",
    tags: ["第 17 章 编译优化", "机制链"],
  },
  {
    id: "vdi-17-compiler-optimization-4",
    chapter: "vdi-17-compiler-optimization",
    level: 3,
    question: "第 17 章 编译优化应注入哪两类失败？",
    answer:
      "给所有VNode都添加PatchFlags却仍完整递归Diff，没有利用编译信息缩小更新范围。；把引用v-for局部变量的节点静态提升，所有行错误共享第一次迭代值。",
    tags: ["第 17 章 编译优化", "故障注入"],
  },
  {
    id: "vdi-17-compiler-optimization-5",
    chapter: "vdi-17-compiler-optimization",
    level: 3,
    question: "第 17 章 编译优化签发时保持什么不变量？",
    answer:
      "动态标志与真实绑定一致，Block边界覆盖结构变化，提升不跨作用域，缓存有稳定槽位，优化前后渲染语义等价。",
    tags: ["第 17 章 编译优化", "工程验收"],
  },
  {
    id: "vdi-17-compiler-optimization-6",
    chapter: "vdi-17-compiler-optimization",
    level: 3,
    question: "第 17 章 编译优化怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 17 章 编译优化", "可复现实验"],
  },
  {
    id: "vdi-18-isomorphic-rendering-1",
    chapter: "vdi-18-isomorphic-rendering",
    level: 1,
    question: "第 18 章 同构渲染的核心主张是什么？",
    answer:
      "同构渲染让服务器生成HTML、客户端激活交互；正确实现依赖安全字符串化、节点匹配、跨平台代码和逐请求状态隔离。",
    tags: ["第 18 章 同构渲染", "核心机制"],
  },
  {
    id: "vdi-18-isomorphic-rendering-2",
    chapter: "vdi-18-isomorphic-rendering",
    level: 2,
    question: "第 18 章 同构渲染覆盖哪些正式目录主题？",
    answer:
      "18.1 CSR、SSR以及同构渲染、18.2 将虚拟DOM渲染为HTML字符串、18.3 将组件渲染为HTML字符串、18.4 客户端激活的原理、18.5 编写同构的代码、18.5.1 组件的生命周期、18.5.2 使用跨平台的API、18.5.3 只在某一端引入模块、18.5.4 避免交叉请求引起的状态污染、18.5.5 组件、18.6 总结",
    tags: ["第 18 章 同构渲染", "目录覆盖"],
  },
  {
    id: "vdi-18-isomorphic-rendering-3",
    chapter: "vdi-18-isomorphic-rendering",
    level: 2,
    question: "第 18 章 同构渲染的六阶段机制链是什么？",
    answer:
      "创建请求实例 → 服务端渲染VNode → 转义HTML → 发送状态快照 → 客户端激活 → 验证请求隔离",
    tags: ["第 18 章 同构渲染", "机制链"],
  },
  {
    id: "vdi-18-isomorphic-rendering-4",
    chapter: "vdi-18-isomorphic-rendering",
    level: 3,
    question: "第 18 章 同构渲染应注入哪两类失败？",
    answer:
      "服务端直接把用户文本拼入HTML，未按文本与属性上下文转义。；所有请求复用模块级store，并发访问时用户状态交叉污染。",
    tags: ["第 18 章 同构渲染", "故障注入"],
  },
  {
    id: "vdi-18-isomorphic-rendering-5",
    chapter: "vdi-18-isomorphic-rendering",
    level: 3,
    question: "第 18 章 同构渲染签发时保持什么不变量？",
    answer:
      "HTML正确转义，服务端和客户端首屏结构一致，激活复用节点并安装事件，浏览器API不在服务端执行，每次请求状态独立。",
    tags: ["第 18 章 同构渲染", "工程验收"],
  },
  {
    id: "vdi-18-isomorphic-rendering-6",
    chapter: "vdi-18-isomorphic-rendering",
    level: 3,
    question: "第 18 章 同构渲染怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["第 18 章 同构渲染", "可复现实验"],
  },
  {
    id: "vdi-official-final-review-1",
    chapter: "vdi-official-final-review",
    level: 1,
    question: "《Vue.js设计与实现》全书总复习的核心主张是什么？",
    answer:
      "全书验收应从一个状态写入追到依赖调度、组件render、快速Diff、PatchFlags和客户端激活，并在故障后证明资源与状态收敛。",
    tags: ["《Vue.js设计与实现》全书总复习", "核心机制"],
  },
  {
    id: "vdi-official-final-review-2",
    chapter: "vdi-official-final-review",
    level: 2,
    question: "《Vue.js设计与实现》全书总复习覆盖哪些正式目录主题？",
    answer:
      "第 1 章 权衡的艺术、第 2 章 框架设计的核心要素、第 3 章 Vue.js 3的设计思路、第 4 章 响应系统的作用与实现、第 5 章 非原始值的响应式方案、第 6 章 原始值的响应式方案、第 7 章 渲染器的设计、第 8 章 挂载与更新、第 9 章 简单Diff算法、第 10 章 双端Diff算法、第 11 章 快速Diff算法、第 12 章 组件的实现原理、第 13 章 异步组件与函数式组件、第 14 章 内建组件和模块、第 15 章 编译器核心技术概览、第 16 章 解析器、第 17 章 编译优化、第 18 章 同构渲染",
    tags: ["《Vue.js设计与实现》全书总复习", "目录覆盖"],
  },
  {
    id: "vdi-official-final-review-3",
    chapter: "vdi-official-final-review",
    level: 2,
    question: "《Vue.js设计与实现》全书总复习的六阶段机制链是什么？",
    answer:
      "触发响应更新 → 调度组件effect → 比较VNode → 利用编译提示 → 服务端输出 → 客户端激活签发",
    tags: ["《Vue.js设计与实现》全书总复习", "机制链"],
  },
  {
    id: "vdi-official-final-review-4",
    chapter: "vdi-official-final-review",
    level: 3,
    question: "《Vue.js设计与实现》全书总复习应注入哪两类失败？",
    answer:
      "最终页面正确就认定Diff正确，遗漏重复移动、错误实例复用和卸载泄漏。；SSR首屏看似一致就签发，未并发测试请求状态隔离与激活事件安装。",
    tags: ["《Vue.js设计与实现》全书总复习", "故障注入"],
  },
  {
    id: "vdi-official-final-review-5",
    chapter: "vdi-official-final-review",
    level: 3,
    question: "《Vue.js设计与实现》全书总复习签发时保持什么不变量？",
    answer:
      "18章与161条目录全部可定位，核心算法可独立运行，跨模块更新链可重放，故障恢复后无旧依赖、旧任务、错位DOM或请求污染。",
    tags: ["《Vue.js设计与实现》全书总复习", "工程验收"],
  },
  {
    id: "vdi-official-final-review-6",
    chapter: "vdi-official-final-review",
    level: 3,
    question: "《Vue.js设计与实现》全书总复习怎样完成可复现实验？",
    answer:
      "固定运行时、输入和初始状态，依次运行正常、边界、失败和恢复样本，保存依赖、任务、VNode、组件或AST轨迹以及清理动作。",
    tags: ["《Vue.js设计与实现》全书总复习", "可复现实验"],
  },
];
