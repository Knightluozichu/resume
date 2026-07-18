import type { ReviewQuestion } from "./types";
export const uslLearningMapQuestions: ReviewQuestion[]=[
  {
    "id": "usl-official-learning-map-1",
    "chapter": "usl-official-learning-map",
    "level": 1,
    "question": "《Unity 3D ShaderLab开发实战详解》全书导览中“第一篇基础”承担什么任务？",
    "answer": "第1至4章建立Shader角色、ShaderLab形态、空间与基本光照。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》全书导览",
      "第一篇基础"
    ]
  },
  {
    "id": "usl-official-learning-map-2",
    "chapter": "usl-official-learning-map",
    "level": 2,
    "question": "《Unity 3D ShaderLab开发实战详解》全书导览如何连接“第二篇照明”与“第三篇阴影”？",
    "answer": "第5至9章沿Pass、VertexLit、Forward、Lightmap和Light Probe理解Unity照明。 第10至14章从平面与球体近似进入阴影体、阴影映射和内置阴影。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》全书导览",
      "执行链"
    ]
  },
  {
    "id": "usl-official-learning-map-3",
    "chapter": "usl-official-learning-map",
    "level": 3,
    "question": "《Unity 3D ShaderLab开发实战详解》全书导览最关键的失败反例是什么？",
    "answer": "只按现代Unity API重写而删除固定管线、VertexLit和Surface Shader，会丢失原书用于解释渲染路径演进的核心链路。 应使用最小场景与帧捕获定位。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》全书导览",
      "反例"
    ]
  },
  {
    "id": "usl-official-learning-map-4",
    "chapter": "usl-official-learning-map",
    "level": 4,
    "question": "怎样用“第五篇优化”验收《Unity 3D ShaderLab开发实战详解》全书导览？",
    "answer": "第30至33章收束复用、Draw Call、渲染路径和移动平台优化。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》全书导览",
      "验收"
    ]
  }
];
