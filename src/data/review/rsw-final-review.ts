import type { ReviewQuestion } from "./types";

export const rswFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rsw-final-review-1",
    chapter: "rsw-final-review",
    level: 1,
    question: "全书13章可归为哪三层统一模型？",
    answer: "第1至4章是值、类型与内存表示；第5至8章是所有权、调用与数据抽象；第9至13章是失败、模块、并发、生成代码与安全边界。",
    tags: ["全书结构", "统一模型"],
  },
  {
    id: "rsw-final-review-2",
    chapter: "rsw-final-review",
    level: 2,
    question: "故障逆向诊断的顺序是什么？",
    answer: "先判断展开、类型借用、链接、运行、并发活性或外部协议阶段，再固定最小输入和toolchain，画值与线程关系，追错误source，定位首个失效不变量。",
    tags: ["诊断", "不变量"],
  },
  {
    id: "rsw-final-review-3",
    chapter: "rsw-final-review",
    level: 3,
    question: "可取消CSV处理服务应如何分层？",
    answer: "同步核心定义有效领域值和错误；CSV适配器验证协议并保留坐标；并发外壳用有界channel、取消与join；输出使用临时产物原子提交；unsafe只留在外部binding薄层。",
    tags: ["综合项目", "分层"],
  },
  {
    id: "rsw-final-review-4",
    chapter: "rsw-final-review",
    level: 4,
    question: "全书最终门禁至少覆盖哪些维度？",
    answer: "覆盖功能、内存与资源、类型和无效状态、并发安全与活性、模块与依赖复现、宏展开与诊断、unsafe与FFI协议；每维都要有失败注入和可重复证据。",
    tags: ["多维验收", "综合"],
  },
];
