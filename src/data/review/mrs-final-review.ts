import type { ReviewQuestion } from "./types";
export const mrsFinalReviewQuestions: ReviewQuestion[] = [
  { id: "mrs-final-review-1", chapter: "mrs-final-review", level: 1, question: "Rust静态契约主要覆盖什么？", answer: "所有权、trait bound、Result和Send或Sync把资源、能力、失败与线程边界编码进类型。", tags: ["总复习", "静态契约"] },
  { id: "mrs-final-review-2", chapter: "mrs-final-review", level: 2, question: "哪些问题仍需运行期协议？", answer: "超时、背压、锁顺序、事务、日志字段、取消和优雅关闭仍需状态机、测试与运行证据。", tags: ["总复习", "运行协议"] },
  { id: "mrs-final-review-3", chapter: "mrs-final-review", level: 3, question: "为什么要最小化不可信边界？", answer: "宏、unsafe、FFI、HTTP和数据库边界越小，验证、审计和失败测试越集中，安全核心越容易推理。", tags: ["总复习", "边界"] },
  { id: "mrs-final-review-4", chapter: "mrs-final-review", level: 4, question: "全书综合验收命令链是什么？", answer: "固定工具链和依赖后依次检查格式、静态分析、全部target测试、文档测试，并为外部系统保留超时和关闭证据。", tags: ["总复习", "验收"] },
];
