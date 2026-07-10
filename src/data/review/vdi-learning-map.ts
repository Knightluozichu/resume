import type { ReviewQuestion } from "./types";

export const vdiLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "vdi-learning-map-1",
    chapter: "vdi-learning-map",
    level: 2,
    question: `全书五层递进结构是什么？为什么是这个顺序？`,
    answer:
      `响应式系统（Proxy/track/trigger）→ 渲染器（挂载/卸载/patch/Diff）→ 组件模型（setup/Props/emit）→ 编译器（Parse/Transform/Generate）→ 内置组件（KeepAlive/Teleport/Suspense）→ 总复习。顺序由依赖关系决定：没有响应式就没有「数据变则通知」的机制；没有通知就没有需要渲染器更新的视图；没有渲染器就没有组件可挂载的载体；没有组件就没有编译器要编译的模板；没有前面四层，内置组件的特殊调度就无从附着。先「能感知」，再「能渲染」，然后「能抽象」，接着「能编译」，最后「能调度」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "vdi-learning-map-2",
    chapter: "vdi-learning-map",
    level: 2,
    question: `Vue 的「响应式」与「命令式操作 DOM」有什么本质区别？`,
    answer:
      `命令式是「你告诉浏览器每一步怎么做」：拿到元素、手动改属性、手动同步数据与视图，对应关系靠人脑维护。响应式是「你声明数据与副作用的关系，框架替你同步」：数据一变，框架自动找到依赖这块数据的副作用并重新执行。本质区别在于「谁维护数据到视图的映射」——命令式由开发者维护（易出错），响应式由框架的依赖收集系统维护（Proxy 拦截读写、track 登记、trigger 派发）。响应式让你只关心「数据是什么状态」，把「如何反映到界面」交给框架。`,
    tags: ["响应式", "命令式", "数据驱动"],
  },
  {
    id: "vdi-learning-map-3",
    chapter: "vdi-learning-map",
    level: 3,
    question: `用「一次数据变化到视图更新」的链路描述全书主线。`,
    answer:
      `count.value++：①响应式设计——ref 的 set 拦截触发 trigger，从 targetMap 取出依赖该数据的 effect（第 2 章）；②副作用调度——scheduler 决定 effect 何时重跑，computed 标脏、watch 执行回调（第 3 章）；③渲染器——组件 render effect 重跑产出新 VNode，patch 比对新旧 VNode（第 4 章）；④Diff 算法——子节点用快速 Diff 预处理头尾，未知序列用 LIS 最小化移动（第 5 章）；⑤组件模型——若 count 在子组件，props 变触发子组件重渲染（第 6 章）；⑥异步组件——若子组件异步加载，defineAsyncComponent 管理状态（第 7 章）；⑦编译器——模板编译生成 render，patchFlag 标记动态节点（第 8 章）；⑧内置组件——KeepAlive 缓存、Teleport 传送、Suspense 协调（第 9 章）。十章都在这条链路中扮演角色。`,
    tags: ["架构", "运行时链路"],
  },
  {
    id: "vdi-learning-map-4",
    chapter: "vdi-learning-map",
    level: 4,
    question: `会用 Vue 和真正懂 Vue 的设计有什么本质区别？`,
    answer:
      `会调 API、搭模板、写 setup 只是表层——照文档抄就会。真正理解 Vue 在于搞懂设计动机：为什么用 Proxy 而不是 Object.defineProperty；为什么渲染器要与平台解耦；为什么 Diff 要分双端和快速两种；为什么编译器要在 Transform 阶段注入 patchFlag；为什么 KeepAlive 卸载时不断 DOM 而是移到隐藏容器。这些是「源码层面」的问题，也是区分「使用者」与「实现者」的标志。把 API 当终点的人，遇到框架升级只会重学语法；把设计当核心的人，能举一反三理解任何响应式框架。区分标志：能否解释「为什么这样设计」而非只是「能跑」。`,
    tags: ["架构", "设计动机", "工程思维"],
  },
];
