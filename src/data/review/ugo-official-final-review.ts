import type { ReviewQuestion } from "./types";

export const ugoOfficialFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ugo-official-final-review-1",
    chapter: "ugo-official-final-review",
    level: 1,
    question: "关键路径如何决定帧时间？",
    answer:
      "CPU 主线程、渲染线程、GPU、I/O 与同步链中最慢的完成路径主导一帧，不能简单相加所有模块。",
    tags: ["综合验收", "关键路径"],
  },
  {
    id: "ugo-official-final-review-2",
    chapter: "ugo-official-final-review",
    level: 1,
    question: "什么是正确性护栏？",
    answer:
      "验证画面、物理、交互、资源生命周期与 XR 双眼在候选前后保持目标行为。",
    tags: ["综合验收", "正确性"],
  },
  {
    id: "ugo-official-final-review-3",
    chapter: "ugo-official-final-review",
    level: 2,
    question: "合批降低批次却提高内存峰值，应如何判定？",
    answer:
      "按整体预算判定；若触发平台内存风险则不通过，并比较 Instancing 或 SRP Batcher 等替代。",
    tags: ["综合验收", "成本转移"],
  },
  {
    id: "ugo-official-final-review-4",
    chapter: "ugo-official-final-review",
    level: 2,
    question: "失败候选为何也要归档？",
    answer:
      "它证明适用边界、防止重复试错，并可解释 VSync、热状态、任务规模或成本转移造成的假收益。",
    tags: ["综合验收", "失败重放"],
  },
  {
    id: "ugo-official-final-review-5",
    chapter: "ugo-official-final-review",
    level: 2,
    question: "性能回归门禁应包含哪些输入？",
    answer:
      "固定场景和随机种子、目标设备/代表档位、构建配置、阈值、捕获与失败报告。",
    tags: ["综合验收", "回归"],
  },
  {
    id: "ugo-official-final-review-6",
    chapter: "ugo-official-final-review",
    level: 2,
    question: "XR 候选为何必须检查左右眼？",
    answer:
      "Single Pass 与全屏后处理可能只写一层纹理或使用错误视图，单眼正确不能证明双眼正确。",
    tags: ["综合验收", "XR"],
  },
  {
    id: "ugo-official-final-review-7",
    chapter: "ugo-official-final-review",
    level: 3,
    question: "DOTS 候选何时可能更慢？",
    answer:
      "任务规模太小、调度与同步成本占主导、数据迁移频繁或主线程仍需立即 Complete 时。",
    tags: ["综合验收", "DOTS"],
  },
  {
    id: "ugo-official-final-review-8",
    chapter: "ugo-official-final-review",
    level: 3,
    question: "什么条件下可签发全书综合验收？",
    answer:
      "目标预算、P95 长尾、正确性、可重复性、目标平台兼容和十章原始边界全部通过。",
    tags: ["综合验收", "交付"],
  },
];
