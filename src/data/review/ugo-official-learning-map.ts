import type { ReviewQuestion } from "./types";

export const ugoOfficialLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ugo-official-learning-map-1",
    chapter: "ugo-official-learning-map",
    level: 1,
    question: "第三版有多少个正文章？",
    answer:
      "10 个。页面显示的 15 项还包含前言、Section 容器和附加内容，正文边界以官方前言逐章说明为准。",
    tags: ["官方学习地图", "目录"],
  },
  {
    id: "ugo-official-learning-map-2",
    chapter: "ugo-official-learning-map",
    level: 1,
    question: "为什么官方代码仓库只有四个 Chapter 文件夹？",
    answer:
      "只有第 1、2、8、9 章需要配套工程；代码目录不是全书目录，不能据此缩减覆盖率。",
    tags: ["官方学习地图", "来源"],
  },
  {
    id: "ugo-official-learning-map-3",
    chapter: "ugo-official-learning-map",
    level: 2,
    question: "60 FPS 的理论帧预算是多少？",
    answer:
      "约 16.67 ms，即 1000 / 60。目标还应给合成、输入和系统任务保留余量。",
    tags: ["官方学习地图", "帧预算"],
  },
  {
    id: "ugo-official-learning-map-4",
    chapter: "ugo-official-learning-map",
    level: 2,
    question: "单变量实验最重要的约束是什么？",
    answer: "固定设备、构建、场景、画质、预热和采样窗口，一次只改变一个候选。",
    tags: ["官方学习地图", "实验"],
  },
  {
    id: "ugo-official-learning-map-5",
    chapter: "ugo-official-learning-map",
    level: 2,
    question: "第三版到现代 Unity 应怎样迁移？",
    answer:
      "分离稳定不变量与版本载体，记录原 API、现代替代、保持关系和无法等价处，再在目标设备复测。",
    tags: ["官方学习地图", "迁移"],
  },
  {
    id: "ugo-official-learning-map-6",
    chapter: "ugo-official-learning-map",
    level: 2,
    question: "为何平均 FPS 不能单独验收？",
    answer: "平均值会掩盖 P95/P99 慢帧、内存峰值、热降频和偶发加载卡顿。",
    tags: ["官方学习地图", "长尾"],
  },
  {
    id: "ugo-official-learning-map-7",
    chapter: "ugo-official-learning-map",
    level: 3,
    question: "优化证据包至少包含什么？",
    answer:
      "原章身份、设备/构建、固定场景、基线、单变量候选、分位数、正确性、失败样本、迁移说明和结论。",
    tags: ["官方学习地图", "证据"],
  },
  {
    id: "ugo-official-learning-map-8",
    chapter: "ugo-official-learning-map",
    level: 3,
    question: "为什么第 1 章必须先于技巧章节？",
    answer:
      "没有基线与根因归属，后续合批、LOD、对象池或 DOTS 都可能优化错维度或转移瓶颈。",
    tags: ["官方学习地图", "顺序"],
  },
];
