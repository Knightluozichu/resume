import type { ReviewQuestion } from "./types";
export const lad4FinalReviewQuestions:ReviewQuestion[]=[
  {
    "id": "lad4-official-final-review-1",
    "chapter": "lad4-official-final-review",
    "level": 1,
    "question": "定义-定理链的完整定义是什么？",
    "answer": "每个结论都能回到已声明的空间、标量域、有限维和内积假设。",
    "tags": [
      "《线性代数应该这样学》第四版总复习",
      "定义-定理链"
    ]
  },
  {
    "id": "lad4-official-final-review-2",
    "chapter": "lad4-official-final-review",
    "level": 2,
    "question": "反例与表示不变量如何连接？",
    "answer": "删除一个假设后给出最小反例，说明定理边界而非只背结论。 换基会改变矩阵，却不改变维数、最小多项式、特征值、迹和行列式。",
    "tags": [
      "《线性代数应该这样学》第四版总复习",
      "证明"
    ]
  },
  {
    "id": "lad4-official-final-review-3",
    "chapter": "lad4-official-final-review",
    "level": 3,
    "question": "删除哪项假设会破坏数值证据？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：只会套数值库，却不能说清定理假设和结果为何成立。",
    "tags": [
      "《线性代数应该这样学》第四版总复习",
      "反例"
    ]
  },
  {
    "id": "lad4-official-final-review-4",
    "chapter": "lad4-official-final-review",
    "level": 4,
    "question": "如何验收综合迁移？",
    "answer": "同一线性映射可在基、矩阵、谱、几何和多线性视角间往返。 选择一个既非正规又不可对角化的复算子和一个矩形线性映射：分别完成Jordan链、迹与最小多项式，以及SVD、伪逆和低秩近似，最后比较结构结论与浮点证据。",
    "tags": [
      "《线性代数应该这样学》第四版总复习",
      "验收"
    ]
  }
];
