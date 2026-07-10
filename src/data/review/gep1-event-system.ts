import type { ReviewQuestion } from "./types";

export const gep1EventSystemQuestions: ReviewQuestion[] = [
  {
    id: "gep1-event-system-1",
    chapter: "gep1-event-system",
    level: 1,
    question: `事件系统的发布订阅模式如何实现模块解耦？`,
    answer: `发布者发事件、订阅者收事件，双方互不感知。玩家开枪时只发一个 \`ShootEvent\`，UI、音频、成就系统各自订阅该事件。开枪逻辑不直接调这三个系统，加新系统（如震动反馈）只需订阅事件，不改开枪代码。双向解耦：发布者不关心谁订阅，订阅者不关心谁触发。`,
    tags: ["发布订阅", "解耦"],
  },
  {
    id: "gep1-event-system-2",
    chapter: "gep1-event-system",
    level: 2,
    question: `立即分发、排队分发、下一帧分发分别适合什么场景？`,
    answer: `立即分发：emit 瞬间同步调用回调，延迟最低，适合输入响应（按键要立刻生效）。排队分发：入队帧末统一处理，发送与处理时机分离，适合玩法逻辑（保证按帧有序、不被中途状态打断）。下一帧分发：延迟到下帧处理，适合销毁对象（当前帧迭代中不能安全删除自己，延迟到下帧不破坏正在遍历的集合）。`,
    tags: ["分发模式", "立即分发", "排队分发"],
  },
  {
    id: "gep1-event-system-3",
    chapter: "gep1-event-system",
    level: 3,
    question: `事件队列如何解决「回调中再 emit」导致的无限递归？`,
    answer: `立即分发下，回调 A 处理时 emit 事件 B，B 立即调用回调 B，B 又 emit A……无限递归栈溢出。队列方案：emit 只入队不执行，Dispatch 从队头取事件执行。回调中再 emit 的事件排到队尾，当前事件处理完才轮到它。这样事件按入队顺序线性处理，不会递归，最多队列变长但不会栈溢出。把「触发」与「处理」分离是关键。`,
    tags: ["事件队列", "递归", "栈溢出"],
  },
  {
    id: "gep1-event-system-4",
    chapter: "gep1-event-system",
    level: 4,
    question: `在遍历订阅者列表时取消订阅会导致什么问题？如何解决？`,
    answer: `Dispatch 遍历 \`subscribers_\` 时，某个回调里调了 \`Unsubscribe()\` 修改了正在遍历的容器，导致迭代器失效——可能跳过后续订阅者、重复调用或直接崩溃。解决：取消订阅只标记「待移除」标志（不从容器删除），Dispatch 结束后统一清理待移除项。这样遍历过程中容器结构不变，迭代器有效；清理在遍历外完成，安全。这是「延迟修改」模式，也用于场景图删节点等场景。`,
    tags: ["综合", "迭代器失效", "延迟修改"],
  },
];
