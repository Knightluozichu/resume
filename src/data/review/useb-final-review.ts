import type { ReviewQuestion } from "./types";
export const usebFinalReviewQuestions: ReviewQuestion[] = [
  {
    "id": "useb-official-final-review-1",
    "chapter": "useb-official-final-review",
    "level": 1,
    "question": "《Unity Shader入门精要》总复习中的画面证书是什么？",
    "answer": "固定场景、相机、光照和材质参数得到的参考输出。",
    "tags": [
      "《Unity Shader入门精要》总复习",
      "画面证书"
    ]
  },
  {
    "id": "useb-official-final-review-2",
    "chapter": "useb-official-final-review",
    "level": 2,
    "question": "《Unity Shader入门精要》总复习如何连接数据流证书和状态证书？",
    "answer": "从网格属性到插值器、纹理采样和帧缓冲写入的逐阶段记录。 队列、Pass、剔除、深度、模板和混合状态的Frame Debugger记录。 必须标注阶段、空间与输入。",
    "tags": [
      "《Unity Shader入门精要》总复习",
      "数据流"
    ]
  },
  {
    "id": "useb-official-final-review-3",
    "chapter": "useb-official-final-review",
    "level": 3,
    "question": "《Unity Shader入门精要》总复习最容易出现什么状态或边界错误？",
    "answer": "只看最终画面正常，未检查额外Pass、错误队列或过量采样，隐藏问题会在复杂场景爆发。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "《Unity Shader入门精要》总复习",
      "反例"
    ]
  },
  {
    "id": "useb-official-final-review-4",
    "chapter": "useb-official-final-review",
    "level": 4,
    "question": "《Unity Shader入门精要》总复习如何验收性能证书？",
    "answer": "在指定硬件、分辨率和内容下保存CPU与GPU耗时、Draw Call和过度绘制。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "《Unity Shader入门精要》总复习",
      "验收"
    ]
  }
];
