import type { ReviewQuestion } from "./types";
export const psdFinalReviewQuestions: ReviewQuestion[]=[
  {
    "id": "psd-official-final-review-1",
    "chapter": "psd-official-final-review",
    "level": 1,
    "question": "《Shader开发实战》总复习中的跨阶段证书是什么？",
    "answer": "记录顶点输入、插值、片元输出和固定状态的数据流。",
    "tags": [
      "《Shader开发实战》总复习",
      "跨阶段证书"
    ]
  },
  {
    "id": "psd-official-final-review-2",
    "chapter": "psd-official-final-review",
    "level": 2,
    "question": "《Shader开发实战》总复习如何连接空间证书与画面证书？",
    "answer": "标注每个位置和方向所处空间及变换矩阵。 固定资源、相机、灯光与参数得到的参考输出。 必须标注阶段与空间。",
    "tags": [
      "《Shader开发实战》总复习",
      "数据流"
    ]
  },
  {
    "id": "psd-official-final-review-3",
    "chapter": "psd-official-final-review",
    "level": 3,
    "question": "《Shader开发实战》总复习的关键反例是什么？",
    "answer": "三个引擎都出现类似画面就宣称等价，却没有核对色彩空间、光照模型、深度和混合状态。 用最小输入和GPU捕获定位。",
    "tags": [
      "《Shader开发实战》总复习",
      "反例"
    ]
  },
  {
    "id": "psd-official-final-review-4",
    "chapter": "psd-official-final-review",
    "level": 4,
    "question": "《Shader开发实战》总复习如何验收跨引擎映射？",
    "answer": "把GLSL概念对应到Unity、UE4与Godot而不混淆语法和语义。 保存源码、状态、参考图和性能。",
    "tags": [
      "《Shader开发实战》总复习",
      "验收"
    ]
  }
];
