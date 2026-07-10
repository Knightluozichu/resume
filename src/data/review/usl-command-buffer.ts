import type { ReviewQuestion } from "./types";

export const uslCommandBufferQuestions: ReviewQuestion[] = [
  {
    id: "usl-command-buffer-1",
    chapter: "usl-command-buffer",
    level: 1,
    question: `Command Buffer 的作用是什么？`,
    answer: `Command Buffer 允许在渲染管线的特定位置插入自定义渲染命令，如渲染特定对象、拷贝纹理、执行自定义 Shader Pass。比 GrabPass 更灵活高效，可精确控制渲染流程。`,
    tags: ["Command Buffer", "渲染管线"],
  },
  {
    id: "usl-command-buffer-2",
    chapter: "usl-command-buffer",
    level: 2,
    question: `Command Buffer 可以挂载到哪些渲染事件上？`,
    answer: `AfterEvent（如 AfterGBuffer、AfterLighting、BeforeImageEffects）、BeforeEvent、BetweenEvent 等。可挂在相机上（CameraEvent）或光源上（LightEvent），在管线的不同阶段插入自定义渲染命令。`,
    tags: ["渲染事件", "CameraEvent"],
  },
  {
    id: "usl-command-buffer-3",
    chapter: "usl-command-buffer",
    level: 3,
    question: `如何用 Command Buffer 实现选择性描边效果？`,
    answer: `1)创建 RenderTexture 作为描边目标 2)Command Buffer 在 AfterGBuffer 阶段执行 3)用替换着色器（Replacement Shader）只渲染需要描边的对象到纯色纹理 4)对纹理做边缘检测（Sobel/Roberts）5)将描边结果叠加回主画面 6)通过 Layer 过滤只描边指定对象。`,
    tags: ["描边", "Replacement Shader", "实践"],
  },
  {
    id: "usl-command-buffer-4",
    chapter: "usl-command-buffer",
    level: 4,
    question: `Command Buffer 与 URP/HDRP 的 Render Feature 有什么关系？`,
    answer: `URP 的 ScriptableRendererFeature 是 Command Buffer 的升级版，集成了渲染管线架构。URP 中用 RenderObjects/RenderPass 替代 Command Buffer 的功能，支持管线内自定义 Pass，与管线原生特性（如后处理、阴影）更好集成。内置管线仍使用 Command Buffer。`,
    tags: ["URP", "Render Feature", "对比"],
  },
];
