import type { ReviewQuestion } from "./types";

/** 现代 C++ 测试驱动开发 · 全书总复习 */
export const ctrFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ctr-final-review-1",
    chapter: "ctr-final-review",
    level: 1,
    question: "怎样把规则、依赖、遗留、并发、工作流/性能和反馈健康六类风险映射到证据？",
    answer: "规则用快速单元例和边界；依赖用最小 stub/spy/fake 与真实适配器契约；遗留用特征测试和 seam；并发用事件控制、不变量、压力与 TSan；用户价值用验收场景、性能用代表基准；反馈健康用 CI 时长、红主干 owner、随机项期限和团队标准。",
    tags: ["风险证据矩阵", "测试层", "失败责任"],
  },
  {
    id: "ctr-final-review-2",
    chapter: "ctr-final-review",
    level: 2,
    question: "遇到失败时，信号、层次、依赖、变化类型和持续机制五道闸门怎样工作？",
    answer: "先确认测试发现、旧基线和诊断形成可信红灯；再下沉到最窄 unit/integration/acceptance 层；显式化时间、I/O、随机或线程 seam；区分新行为红灯与全绿结构重构；修复后把复现、门禁、owner 和标准纳入 CI，使同类问题更早定位。",
    tags: ["失败诊断", "可信红灯", "持续机制"],
  },
  {
    id: "ctr-final-review-3",
    chapter: "ctr-final-review",
    level: 3,
    question: "订单服务综合项目如何同时证明替身选择、遗留改造、并发关闭和性能预算？",
    answer: "用 FixedClock/stub 控制查询、Receipt spy 观察命令、Repository fake 与 PostgreSQL 契约共享行为；先 characterization 全局日志，再包装 Logger seam 驱动隔离新需求；用 latch 固定 submit/stop、核对恰好一次与 join 并跑 TSan；在参考环境以代表批次记录 p95/吞吐/分配预算。",
    tags: ["综合项目", "遗留并发", "性能预算"],
  },
  {
    id: "ctr-final-review-4",
    chapter: "ctr-final-review",
    level: 4,
    question: "现代 C++ TDD 综合验收的环境、设计、复杂风险和团队四道门分别要求什么？",
    answer: "环境门要求干净目录一键构建、测试数和故意失败传播；设计门要求公开行为断言、显式依赖、替身角色与适配器契约；复杂门要求遗留特征/seam 或并发事件/不变量/sanitizer；团队门要求 CI required 状态、红主干 owner、随机测试期限、快层预算和覆盖变化风险审查。",
    tags: ["综合验收", "四道门", "团队门禁"],
  },
];
