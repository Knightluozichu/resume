import type { ReviewQuestion } from "./types";
export const gdscgFinalReviewQuestions: ReviewQuestion[] = [
  {
    "id": "gdscg-official-final-review-1",
    "chapter": "gdscg-official-final-review",
    "level": 1,
    "question": "《Geometric Data Structures for Computer Graphics》总复习中的结构选型矩阵是什么？",
    "answer": "按对象类型、查询形状、维数、更新模式和数值风险比较候选结构。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》总复习",
      "结构选型矩阵"
    ]
  },
  {
    "id": "gdscg-official-final-review-2",
    "chapter": "gdscg-official-final-review",
    "level": 2,
    "question": "《Geometric Data Structures for Computer Graphics》总复习如何连接剪枝证书与拓扑证书？",
    "answer": "证明一个节点或对象集合不可能包含答案的可重放条件。 由精确谓词和退化规则共同保证的组合结构不变量。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》总复习",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-official-final-review-3",
    "chapter": "gdscg-official-final-review",
    "level": 3,
    "question": "《Geometric Data Structures for Computer Graphics》总复习怎样处理边界与反例？",
    "answer": "高维、密集重叠、近退化、事件风暴、频繁删改和空输出分别击穿不同假设。总复习不接受单一平均耗时，而要求说明渐近界、常数、内存、尾延迟和误差语义。 典型反例是：看到BVH在一个碰撞场景更快，就把它用于所有范围、最近邻和动态查询而不重新分析契约。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》总复习",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-official-final-review-4",
    "chapter": "gdscg-official-final-review",
    "level": 4,
    "question": "《Geometric Data Structures for Computer Graphics》总复习如何形成交叉验收？",
    "answer": "用穷举、另一种结构和理论不变量三路核对同一结果。 从查询形状、数据分布和更新模型重新推导候选，并用统一基线做交叉验收。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》总复习",
      "验收证书"
    ]
  }
];
