import type { ReviewQuestion } from "./types";
export const gdscgLearningMapQuestions: ReviewQuestion[] = [
  {
    "id": "gdscg-official-learning-map-1",
    "chapter": "gdscg-official-learning-map",
    "level": 1,
    "question": "《Geometric Data Structures for Computer Graphics》全书导览中的几何查询契约是什么？",
    "answer": "把输入对象、查询区域、输出集合、复杂度和数值语义同时写清。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》全书导览",
      "几何查询契约"
    ]
  },
  {
    "id": "gdscg-official-learning-map-2",
    "chapter": "gdscg-official-learning-map",
    "level": 2,
    "question": "《Geometric Data Structures for Computer Graphics》全书导览如何连接空间层次与邻近结构？",
    "answer": "通过递归分割或对象包围把不相关候选在高层剪枝。 用距离、空圆或局部邻域显式编码点集之间的接近关系。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》全书导览",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-official-learning-map-3",
    "chapter": "gdscg-official-learning-map",
    "level": 3,
    "question": "《Geometric Data Structures for Computer Graphics》全书导览怎样处理边界与反例？",
    "answer": "空场景、所有对象共面、重复点、查询落在分割面、无限射线、极端尺度和高速运动都必须单独定义归属规则。若不同章节使用不同边界约定，跨结构比较会产生无法解释的假差异。 典型反例是：只比较平均查询时间，却没有让各结构使用同一输入、边界规则和精确谓词，排名无法复现。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》全书导览",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-official-learning-map-4",
    "chapter": "gdscg-official-learning-map",
    "level": 4,
    "question": "《Geometric Data Structures for Computer Graphics》全书导览如何形成验收证书？",
    "answer": "保存构建参数、访问节点、候选集合、精确谓词与基准结果。 固定数据集、查询序列和数值策略，同时报告构建、查询、更新、内存与错误率。",
    "tags": [
      "《Geometric Data Structures for Computer Graphics》全书导览",
      "验收证书"
    ]
  }
];
