import type { ReviewQuestion } from "./types";
export const lad4LearningMapQuestions:ReviewQuestion[]=[
  {
    "id": "lad4-official-learning-map-1",
    "chapter": "lad4-official-learning-map",
    "level": 1,
    "question": "算子中心路线的完整定义是什么？",
    "answer": "先研究空间与线性映射结构，最后才把行列式作为多线性不变量引入。",
    "tags": [
      "《线性代数应该这样学》第四版导览",
      "算子中心路线"
    ]
  },
  {
    "id": "lad4-official-learning-map-2",
    "chapter": "lad4-official-learning-map",
    "level": 2,
    "question": "有限维结构与最小多项式如何连接？",
    "answer": "基和维数把抽象空间变成有限信息，同时保留换基不变量。 以消去算子的最低次多项式统一特征值、三角化和对角化。",
    "tags": [
      "《线性代数应该这样学》第四版导览",
      "证明"
    ]
  },
  {
    "id": "lad4-official-learning-map-3",
    "chapter": "lad4-official-learning-map",
    "level": 3,
    "question": "删除哪项假设会破坏谱与奇异值？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：沿第三版目录学习，漏掉第四版新增的多线性代数与扩展SVD。",
    "tags": [
      "《线性代数应该这样学》第四版导览",
      "反例"
    ]
  },
  {
    "id": "lad4-official-learning-map-4",
    "chapter": "lad4-official-learning-map",
    "level": 4,
    "question": "如何验收第四版新增内容？",
    "answer": "扩展SVD及后果，并新增多线性代数、二次型、行列式和张量积整章。 维护同一个三维算子T：先证明定义域结构和核像，再写不同基下矩阵，求最小多项式与谱，做SVD，最后用行列式和张量积解释体积及双线性关系。",
    "tags": [
      "《线性代数应该这样学》第四版导览",
      "验收"
    ]
  }
];
