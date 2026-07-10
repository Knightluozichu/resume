import type { ReviewQuestion } from "./types";

/** 观察者模式章复习题 */
export const dpObserverQuestions: ReviewQuestion[] = [
  {
    id: "dp-observer-01",
    chapter: "dp-observer",
    level: 1,
    question: `观察者模式中 Subject 和 Observer 是什么关系？`,
    answer: `Subject（主题/被观察者）维护一个 Observer 列表，当自身状态变化时主动通知所有注册的 Observer（观察者）；Observer 向 Subject 注册自己以接收通知，不主动轮询。\n\n本质：一对多的依赖关系——一个 Subject 的状态改变，所有依赖于它的 Observer 都得到通知并自动更新。Subject 「拥有」观察者列表，Observer 「依赖」Subject 的状态，但 Subject 不需要知道 Observer 的具体类型，只面向 \`update()\` 接口。`,
    tags: ["基础概念", "关系"],
  },
  {
    id: "dp-observer-02",
    chapter: "dp-observer",
    level: 2,
    question: `观察者模式的推模式（push）和拉模式（pull）有什么区别？`,
    answer: `推模式：Subject 在通知时把变化的数据「推」给 Observer，\`notify(data)\` 直接传参。\n- 优点：Observer 不需要知道 Subject 内部结构。\n- 缺点：Subject 假设了 Observer 需要哪些数据；不同 Observer 需要的数据不同时，要么推多了（浪费），要么推少了（不够用）。\n\n拉模式：Subject 只发「我变了」的通知，Observer 收到后自己从 Subject「拉」取需要的数据，\`update(subject)\` 把 Subject 引用传过去。\n- 优点：Observer 按需取数，灵活。\n- 缺点：Observer 需要知道 Subject 的内部结构，耦合更紧。\n\n选择标准：数据结构稳定用推，Observer 需求差异大用拉。`,
    tags: ["推拉模式", "对比"],
  },
  {
    id: "dp-observer-03",
    chapter: "dp-observer",
    level: 3,
    question: `日常开发中用的事件监听器（如 \`addEventListener\`）是观察者模式吗？请说明对应关系。`,
    answer: `是观察者模式的典型应用，对应关系如下：\n- DOM 元素（或 EventEmitter）= Subject，内部维护监听器列表。\n- 回调函数 / 事件处理函数 = Observer，对应 \`update()\` 方法。\n- \`addEventListener('click', handler)\` = \`attach(observer)\`，注册观察者。\n- \`removeEventListener\` = \`detach(observer)\`，取消注册。\n- 事件触发（如用户点击）= Subject 状态变化，自动遍历并调用所有 handler。\n\n区别于教科书模型的细节：事件监听器通常用「事件对象」传参（推模式变体），且一个事件类型可以有多个监听器。但核心机制——注册、通知、解耦——完全一致。`,
    tags: ["应用", "事件监听"],
  },
  {
    id: "dp-observer-04",
    chapter: "dp-observer",
    level: 4,
    question: `观察者模式在实际系统中可能导致哪些问题？如何应对？`,
    answer: `1. 级联更新：Observer A 收到通知后修改了状态，又触发 Observer B，B 又触发 C……形成连锁反应，难以追踪调用链，甚至死循环。\n应对：限制通知深度；Observer 的更新逻辑应是「只读」的，避免在 \`update()\` 里反向修改 Subject；引入中间层或事件总线做协调。\n\n2. 内存泄漏：Observer 注册后忘记取消，Subject 一直持有它的引用，导致无法被 GC 回收（经典「lapsed listener」问题）。\n应对：Observer 销毁时务必 \`detach()\`；或用弱引用持有 Observer；或让 Subject 提供一次性订阅（如 \`once()\`）。\n\n3. 性能：Observer 数量多或更新逻辑重时，一次通知会同步阻塞。\n应对：改异步通知、批量通知（合并多次变化只通知一次）、或引入队列缓冲。\n\n4. 顺序依赖：多个 Observer 的执行顺序不确定，但某些逻辑隐含依赖顺序。\n应对：显式编排顺序，避免在 Observer 间隐式依赖。`,
    tags: ["问题", "工程实践", "内存泄漏"],
  },
];
