import type { ReviewQuestion } from "./types";

export const uusUrpBasicsQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-basics-1",
    chapter: "uus-urp-basics",
    level: 1,
    question: "URP 的核心架构层级是什么？从上到下依次列出。",
    answer: "URP Asset（全局配置）→ Renderer Data（渲染器数据）→ ScriptableRenderer（渲染器）→ ScriptableRenderPass（渲染通道）→ Shader（着色器）。SRP Core 是底层框架，每帧调用 Renderer.Render() 按顺序执行 Pass 列表。",
    tags: ["URP架构", "渲染管线"],
  },
  {
    id: "uus-urp-basics-2",
    chapter: "uus-urp-basics",
    level: 2,
    question: "URP Asset 和 Renderer Data 的职责分别是什么？为什么不能混改？",
    answer: "URP Asset 控制全局渲染参数（渲染质量、MSAA、HDR、阴影分辨率、后处理开关）。Renderer Data 定义渲染器的 Pass 组成和 Renderer Feature 列表。改阴影质量在 URP Asset，加描边效果在 Renderer Data。混改会导致配置混乱——比如在 Renderer Data 里找不到阴影参数，在 URP Asset 里找不到 Feature 列表。",
    tags: ["URP Asset", "Renderer Data"],
  },
  {
    id: "uus-urp-basics-3",
    chapter: "uus-urp-basics",
    level: 3,
    question: "SRP Batch 的生效条件有哪些？为什么不满足条件时会回退？",
    answer: "条件：1) Shader 兼容（使用 CBUFFER_START/END 包裹材质属性）；2) 相同 Shader 且相同 Shader Keyword 组合（变体一致）；3) 不使用 MaterialPropertyBlock（会破坏 CBUFFER 兼容性）；4) URP Asset 中启用 SRP Batcher。不满足时回退到普通绘制，因为 SRP Batcher 的原理是将相同 Shader 的材质 CBUFFER 持久化到 GPU，不兼容的 Shader 无法共享 CBUFFER 布局。",
    tags: ["SRP Batch", "合批", "性能优化"],
  },
  {
    id: "uus-urp-basics-4",
    chapter: "uus-urp-basics",
    level: 4,
    question: "如何在 Frame Debugger 中确认 SRP Batcher 是否生效？如果没生效该怎么排查？",
    answer: "在 Frame Debugger 中展开 Draw Call 节点，查看是否显示「SRP Batcher」标签合并的节点。如果显示单独的 Draw Call 则未合批。排查步骤：1) 检查 URP Asset 是否启用 SRP Batcher；2) 检查 Shader 是否使用 CBUFFER_START(UnityPerMaterial)/CBUFFER_END；3) 检查是否使用了 MaterialPropertyBlock；4) 检查材质是否引用相同 Shader 和相同变体（Keyword 组合）；5) 用 Frame Debugger 查看每个 Draw Call 的 Shader 变体信息。",
    tags: ["SRP Batch", "Frame Debugger", "排查"],
  },
];
