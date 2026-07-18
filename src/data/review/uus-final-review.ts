import type { ReviewQuestion } from "./types";
export const uusFinalReviewQuestions: ReviewQuestion[]=[
  {
    "id": "uus-official-final-review-1",
    "chapter": "uus-official-final-review",
    "level": 1,
    "question": "《Unity 6 URP内置Shader源码解析》总复习中“入口证书”的源码职责是什么？",
    "answer": "记录ShaderPathID、ShaderLab入口和材质属性。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》总复习",
      "入口证书"
    ]
  },
  {
    "id": "uus-official-final-review-2",
    "chapter": "uus-official-final-review",
    "level": 2,
    "question": "《Unity 6 URP内置Shader源码解析》总复习如何连接“Pass证书”与“数据证书”？",
    "answer": "记录LightMode、RenderState、关键字、include和目标缓冲。 从纹理和常量追踪SurfaceData、InputData、BRDFData与GBuffer。 必须给出文件、符号和运行Pass。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》总复习",
      "源码链"
    ]
  },
  {
    "id": "uus-official-final-review-3",
    "chapter": "uus-official-final-review",
    "level": 3,
    "question": "《Unity 6 URP内置Shader源码解析》总复习最关键的失败配置是什么？",
    "answer": "只画静态include图，没有在Renderer、Frame Debugger和GPU事件中证明哪些Pass真的执行。 应用固定提交和GPU捕获定位。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》总复习",
      "反例"
    ]
  },
  {
    "id": "uus-official-final-review-4",
    "chapter": "uus-official-final-review",
    "level": 4,
    "question": "怎样用“工程证书”验收《Unity 6 URP内置Shader源码解析》总复习？",
    "answer": "保存变体统计、SRP Batcher、DOTS、XR与GPU捕获。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》总复习",
      "验收"
    ]
  }
];
