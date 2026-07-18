import type { ReviewQuestion } from "./types";
export const pmSeriesFinalReviewQuestions: ReviewQuestion[] = [
  {
    "id": "pm-series-final-review-1",
    "chapter": "pm-series-final-review",
    "level": 1,
    "question": "三册系列共同的方法论是什么？",
    "answer": "从定义对象和假设开始，经推导得到算法，再用边界、反例、复杂度、统计误差或数值残差形成可重放证据。",
    "tags": [
      "总复习",
      "方法"
    ]
  },
  {
    "id": "pm-series-final-review-2",
    "chapter": "pm-series-final-review",
    "level": 2,
    "question": "何时选离散、概率或线性模型？",
    "answer": "有限状态、周期与证明选离散工具；随机机制与抽样误差选概率统计；多维表示、映射、求解和动态稳定性选线性代数。",
    "tags": [
      "总复习",
      "选择"
    ]
  },
  {
    "id": "pm-series-final-review-3",
    "chapter": "pm-series-final-review",
    "level": 3,
    "question": "综合系统最容易遗漏哪些边界？",
    "answer": "输入域和单位、独立性与分流机制、指数空间、不可判定性、矩阵秩与条件数、浮点残差，以及随机种子和版本。",
    "tags": [
      "总复习",
      "边界"
    ]
  },
  {
    "id": "pm-series-final-review-4",
    "chapter": "pm-series-final-review",
    "level": 4,
    "question": "怎样证明一个数学驱动程序可以交付？",
    "answer": "同时提供模型说明、关键推导、自动测试、故障注入、性能与误差预算、固定环境重放和明确的未覆盖范围。",
    "tags": [
      "总复习",
      "交付"
    ]
  }
];
