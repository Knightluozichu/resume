import type { ReviewQuestion } from "./types";
export const gpoFinalReviewQuestions: ReviewQuestion[]=[
  {
    "id": "gpo-official-final-review-1",
    "chapter": "gpo-official-final-review",
    "level": 1,
    "question": "GPU Pro 1-7 · 183篇综合验收的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应183篇范围。",
    "tags": [
      "GPU Pro 1-7 · 183篇综合验收",
      "官方范围"
    ]
  },
  {
    "id": "gpo-official-final-review-2",
    "chapter": "gpo-official-final-review",
    "level": 2,
    "question": "GPU Pro 1-7 · 183篇综合验收怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "GPU Pro 1-7 · 183篇综合验收",
      "不变量"
    ]
  },
  {
    "id": "gpo-official-final-review-3",
    "chapter": "gpo-official-final-review",
    "level": 3,
    "question": "GPU Pro 1-7 · 183篇综合验收最关键的失败证据是什么？",
    "answer": "只让14个站内页面通过评分，没有逐篇映射183个官方ID。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "GPU Pro 1-7 · 183篇综合验收",
      "失败重放"
    ]
  },
  {
    "id": "gpo-official-final-review-4",
    "chapter": "gpo-official-final-review",
    "level": 4,
    "question": "如何验收GPU Pro 1-7 · 183篇综合验收的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证失败证书。",
    "tags": [
      "GPU Pro 1-7 · 183篇综合验收",
      "综合验收"
    ]
  }
];
