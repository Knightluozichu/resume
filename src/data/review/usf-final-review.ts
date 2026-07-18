import type { ReviewQuestion } from "./types";
export const usfFinalReviewQuestions: ReviewQuestion[]=[
  {
    "id": "usf-official-final-review-1",
    "chapter": "usf-official-final-review",
    "level": 1,
    "question": "《Unity着色器和屏幕特效开发秘笈》总复习中“材质证书”承担什么任务？",
    "answer": "保存Properties、纹理、光照函数和生成Pass的输入输出。",
    "tags": [
      "《Unity着色器和屏幕特效开发秘笈》总复习",
      "材质证书"
    ]
  },
  {
    "id": "usf-official-final-review-2",
    "chapter": "usf-official-final-review",
    "level": 2,
    "question": "《Unity着色器和屏幕特效开发秘笈》总复习如何连接“方向证书”与“透明证书”？",
    "answer": "标注法线、光线、视线、反射向量和切线空间。 保存Queue、Blend、ZWrite和排序反例。 必须标注实际Pass与输入来源。",
    "tags": [
      "《Unity着色器和屏幕特效开发秘笈》总复习",
      "数据流"
    ]
  },
  {
    "id": "usf-official-final-review-3",
    "chapter": "usf-official-final-review",
    "level": 3,
    "question": "《Unity着色器和屏幕特效开发秘笈》总复习最关键的失败反例是什么？",
    "answer": "只保存最终截图，没有证明材质生成代码、固定状态、RenderTexture链和目标设备性能。 应用最小场景和帧捕获定位。",
    "tags": [
      "《Unity着色器和屏幕特效开发秘笈》总复习",
      "反例"
    ]
  },
  {
    "id": "usf-official-final-review-4",
    "chapter": "usf-official-final-review",
    "level": 4,
    "question": "怎样用“屏幕证书”验收《Unity着色器和屏幕特效开发秘笈》总复习？",
    "answer": "保存源图、中间RenderTexture、Pass次序和最终合成。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "《Unity着色器和屏幕特效开发秘笈》总复习",
      "验收"
    ]
  }
];
