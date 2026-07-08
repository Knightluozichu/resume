import type { ReviewQuestion } from "./types";

export const uapFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uap-final-review-1",
    chapter: "uap-final-review",
    level: 1,
    question: "全书十章如何按项目阶段划分主程重心？",
    answer: "原型期：架构先行（第2-3章）——分层+DI+模式，骨架可保留原型可丢弃。开发期：性能立规矩（第4-5章）——GC 零容忍、DrawCall 设预算、Profiler 常态化。联调期：系统打通（第6-7章）——UI 框架+网络同步对接。上线期：工程收尾（第8-9章）——热更新通道+CI/CD 流水线+自动化测试。四阶段重心不同，但架构是贯穿始终的地基。",
    tags: ["项目阶段", "主程重心", "全书"],
  },
  {
    id: "uap-final-review-2",
    chapter: "uap-final-review",
    level: 2,
    question: "主程决策链路是什么？一个新需求到来按什么顺序思考？",
    answer: "1）架构承接（第2章）：需求放哪层？依赖谁？会不会循环依赖？2）模式选择（第3章）：用什么模式实现？单例/观察者/状态/命令？3）性能预算（第4-5章）：会产生 GC 吗？DrawCall 超预算吗？需要池化吗？4）系统对接（第6-7章）：涉及 UI 吗？需要联网同步吗？5）工程交付（第8-9章）：需要热更吗？CI 能自动测试吗？五步走完，需求从架构到交付全链路覆盖。",
    tags: ["决策链路", "需求分析", "主程"],
  },
  {
    id: "uap-final-review-3",
    chapter: "uap-final-review",
    level: 3,
    question: "项目上线后每次更新都引入回归 Bug，用全书知识分析根因和修复方案。",
    answer: "根因在工程层（第8-9章）：①没有 CI/CD 或 CI 没集成自动化测试，回归 Bug 没在出包前拦截；②没有热更新通道，每次修 Bug 重新发版，发版压力大测试不充分；③架构层（第2-3章）模块耦合高，改一处影响多处。修复：①CI 加 UTF 自动化测试，核心流程不过不出包（第9章）；②建热更新通道，紧急 Bug 热更修复不重新发版（第8章）；③架构评审降低模块耦合，提升可测试性（第2章）。三层组合从根上减少回归。",
    tags: ["回归Bug", "CI/CD", "热更新", "综合"],
  },
  {
    id: "uap-final-review-4",
    chapter: "uap-final-review",
    level: 4,
    question: "用全书十章知识，对一个 Unity 项目做一次完整的主程级架构评审，给出评审清单。",
    answer: "架构层（第2-3章）：有没有分层？有没有循环依赖？MonoBehaviour 是否承担逻辑？能单元测试吗？设计模式用对了吗？性能层（第4-5章）：Profiler 每帧 GC Alloc 是 0 吗？DrawCall 在预算内吗？有没有内存泄漏？对象池覆盖高频对象吗？系统层（第6-7章）：UI 框架有栈管理吗？动静分离了吗？网络同步选对流派了吗？插值预测做了吗？工程层（第8-9章）：CI/CD 跑通了吗？自动化测试覆盖核心流程吗？热更新通道验证过吗？出包到分发全自动吗？每层给出「通过/待改进/不达标」评级和修复路径。",
    tags: ["架构评审", "综合", "全书"],
  },
];
