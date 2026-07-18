import type { ReviewQuestion } from "./types";
export const uslFinalReviewQuestions: ReviewQuestion[]=[
  {
    "id": "usl-official-final-review-1",
    "chapter": "usl-official-final-review",
    "level": 1,
    "question": "《Unity 3D ShaderLab开发实战详解》总复习中“结构证书”承担什么任务？",
    "answer": "记录Properties、SubShader、Pass、标签和回退的实际选择。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》总复习",
      "结构证书"
    ]
  },
  {
    "id": "usl-official-final-review-2",
    "chapter": "usl-official-final-review",
    "level": 2,
    "question": "《Unity 3D ShaderLab开发实战详解》总复习如何连接“空间证书”与“照明证书”？",
    "answer": "为位置、方向、深度与投影矩阵标注所在空间。 拆分渲染路径、光源、烘焙、探针与阴影贡献。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》总复习",
      "执行链"
    ]
  },
  {
    "id": "usl-official-final-review-3",
    "chapter": "usl-official-final-review",
    "level": 3,
    "question": "《Unity 3D ShaderLab开发实战详解》总复习最关键的失败反例是什么？",
    "answer": "最终画面相似就认为复刻完成，没有证明实际Pass、空间、缓冲、阴影和性能路径一致。 应使用最小场景与帧捕获定位。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》总复习",
      "反例"
    ]
  },
  {
    "id": "usl-official-final-review-4",
    "chapter": "usl-official-final-review",
    "level": 4,
    "question": "怎样用“优化证书”验收《Unity 3D ShaderLab开发实战详解》总复习？",
    "answer": "保存目标设备帧捕获、瓶颈、改动和画质边界。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "《Unity 3D ShaderLab开发实战详解》总复习",
      "验收"
    ]
  }
];
