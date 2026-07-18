import type { ReviewQuestion } from "./types";
export const pmSeriesLearningMapQuestions: ReviewQuestion[] = [
  {
    "id": "pm-series-learning-map-1",
    "chapter": "pm-series-learning-map",
    "level": 1,
    "question": "三册系列共有多少个权威核心单元？",
    "answer": "第一册9章、概率统计8章、线性代数含第0章在内6章，共23个核心单元；站内另设导览与总复习。",
    "tags": [
      "导览",
      "目录"
    ]
  },
  {
    "id": "pm-series-learning-map-2",
    "chapter": "pm-series-learning-map",
    "level": 2,
    "question": "三册的依赖关系是什么？",
    "answer": "数学思维提供表示、逻辑、证明和计数；概率统计用它们建模不确定性；线性代数处理多维空间与映射，并反过来支撑协方差、PCA与滤波。",
    "tags": [
      "导览",
      "依赖"
    ]
  },
  {
    "id": "pm-series-learning-map-3",
    "chapter": "pm-series-learning-map",
    "level": 3,
    "question": "程序实验为何不能替代数学证明？",
    "answer": "实验只覆盖有限输入且可能与推导共享错误；它适合验证实现和发现反例，普遍结论仍需证明，统计结论还需报告不确定性。",
    "tags": [
      "导览",
      "证据"
    ]
  },
  {
    "id": "pm-series-learning-map-4",
    "chapter": "pm-series-learning-map",
    "level": 4,
    "question": "如何验收贯穿三册的学习项目？",
    "answer": "保存对象定义、假设、推导、复杂度或误差、正常与退化样例、随机种子、程序输出和反例，使他人能重放并指出边界。",
    "tags": [
      "导览",
      "综合"
    ]
  }
];
