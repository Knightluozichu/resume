import type { ReviewQuestion } from "./types";
export const uusLearningMapQuestions: ReviewQuestion[]=[
  {
    "id": "uus-official-learning-map-1",
    "chapter": "uus-official-learning-map",
    "level": 1,
    "question": "《Unity 6 URP内置Shader源码解析》全图中“包入口”的源码职责是什么？",
    "answer": "从Shaders.cs和ShaderPathID定位内置资源。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》全图",
      "包入口"
    ]
  },
  {
    "id": "uus-official-learning-map-2",
    "chapter": "uus-official-learning-map",
    "level": 2,
    "question": "《Unity 6 URP内置Shader源码解析》全图如何连接“Lit主链”与“内置材质族”？",
    "answer": "从Properties、SurfaceData、Forward与GBuffer追踪PBR。 比较SimpleLit、ComplexLit、BakedLit、Unlit与Particles。 必须给出文件、符号和运行Pass。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》全图",
      "源码链"
    ]
  },
  {
    "id": "uus-official-learning-map-3",
    "chapter": "uus-official-learning-map",
    "level": 3,
    "question": "《Unity 6 URP内置Shader源码解析》全图最关键的失败配置是什么？",
    "answer": "拿master最新代码解释某个已发布Unity版本，文件和关键字会漂移，读者无法复现。 应用固定提交和GPU捕获定位。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》全图",
      "反例"
    ]
  },
  {
    "id": "uus-official-learning-map-4",
    "chapter": "uus-official-learning-map",
    "level": 4,
    "question": "怎样用“共享库”验收《Unity 6 URP内置Shader源码解析》全图？",
    "answer": "以Core、Lighting、GI、Shadows和工程宏解释复用机制。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "《Unity 6 URP内置Shader源码解析》全图",
      "验收"
    ]
  }
];
