import type { ReviewQuestion } from "./types";

/** Pro .NET Memory Management, Second Edition · 15 章学习地图复习题 */
export const dnmMemoryModelQuestions: ReviewQuestion[] = [
  {
    id: "dnm-memory-model-1",
    chapter: "dnm-memory-model",
    level: 1,
    question: "原书 15 章为什么按基础测量、GC 实现、生命周期/高阶内存、程序化 API 四阶段学习，哪些前置关系不能颠倒？",
    answer: "Ch1-4 统一对象、OS/CPU、指标与 CLR/JIT 口径；Ch5-11 才能从 heap/allocation 推导 mark/plan/sweep/compact 和 flavors；Ch12-14 在可达性与 ref safety 上建立资源和 buffer owner/lease；Ch15 再安全观察或干预。没有前置模型，配置/API 只会变成无证据开关。",
    tags: ["权威目录", "15 章", "学习路径"],
  },
  {
    id: "dnm-memory-model-2",
    chapter: "dnm-memory-model",
    level: 2,
    question: "生产出现分配高、暂停长、回收后保留、RSS 上升或互操作 pin 时，最短回读路径的共同第一步是什么？",
    answer: "先回 Ch3 确认时间窗、线程/进程范围、累计/快照和能证明的边界，再进入对应机制。分配走 Ch6/13/14，暂停走 Ch7-11，保留走 Ch8/12/15，RSS 分叉走 Ch2/12/15，pin 走 Ch5/9-10/12-14；都以量化验收结束。",
    tags: ["症状路由", "测量口径", "证据"],
  },
  {
    id: "dnm-memory-model-3",
    chapter: "dnm-memory-model",
    level: 3,
    question: "为什么值类型不等于栈、Span 不等于所有权、GetTotalMemory 不等于 RSS？",
    answer: "值类型定义复制语义，实际可位于寄存器、栈、对象字段、数组或装箱对象；Span 只是 ref+length 的借用 view，底层 owner 决定寿命；GetTotalMemory 估算托管范围，RSS 还含 committed pages、native、stack、JIT 和映射。三者都必须回到存储与指标口径。",
    tags: ["值类型", "Span", "RSS"],
  },
  {
    id: "dnm-memory-model-4",
    chapter: "dnm-memory-model",
    level: 4,
    question: "怎样用建模、测量、推演、所有权设计和自动化五种产物证明已经掌握全书？",
    answer: "提交对象/heap/机器层级图；保存可复现 counter/event/dump 口径；手推一次 GC 并预测存活/pin/碎片成本；画资源与 buffer owner/lease 的异常取消状态机；最后用 EventPipe/ClrMD 自动报告根路径并以 throughput、p99、allocation、heap/RSS 与回滚阈值验收。",
    tags: ["能力矩阵", "毕业作业", "回滚"],
  },
];
