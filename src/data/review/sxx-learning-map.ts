import type { ReviewQuestion } from "./types";
export const sxxLearningMapQuestions: ReviewQuestion[]=[
  {
    "id": "sxx-official-learning-map-1",
    "chapter": "sxx-official-learning-map",
    "level": 1,
    "question": "ShaderX为何是7个系列编号却有8册物理书？",
    "answer": "ShaderX 2被编辑拆成Introductions and Tutorials与Shader Programming Tips and Tricks两册。",
    "tags": [
      "系列身份",
      "物理卷"
    ]
  },
  {
    "id": "sxx-official-learning-map-2",
    "chapter": "sxx-official-learning-map",
    "level": 2,
    "question": "329篇唯一文章如何核对覆盖？",
    "answer": "以卷ID和篇名组成唯一键，主题计数之和、唯一键数和清单总数都必须等于329。",
    "tags": [
      "覆盖守恒",
      "唯一归属"
    ]
  },
  {
    "id": "sxx-official-learning-map-3",
    "chapter": "sxx-official-learning-map",
    "level": 3,
    "question": "旧API失效时应保留什么？",
    "answer": "保留文章问题、数学或数据流不变量、边界和参考路径，再实现现代等价或受控近似。",
    "tags": [
      "历史不变量",
      "现代迁移"
    ]
  },
  {
    "id": "sxx-official-learning-map-4",
    "chapter": "sxx-official-learning-map",
    "level": 4,
    "question": "全系列学习地图的发布门禁是什么？",
    "answer": "来源、329篇唯一覆盖、逐篇教学与运行证据必须同时通过。",
    "tags": [
      "学习地图",
      "门禁"
    ]
  }
];
