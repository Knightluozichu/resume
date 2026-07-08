import type { ReviewQuestion } from "./types";

export const usfPostProcessingQuestions: ReviewQuestion[] = [
  {
    id: "usf-post-processing-1",
    chapter: "usf-post-processing",
    level: 1,
    question: "Unity 后处理栈（Post Processing Stack）的核心组件有哪些？",
    answer: "PostProcessVolume（控制效果影响范围和权重）、PostProcessLayer（挂载在相机上控制渲染）、PostProcessProfile（效果配置资源）、各种效果组件（Bloom/ColorGrading/Vignette 等）。",
    tags: ["后处理栈", "架构"],
  },
  {
    id: "usf-post-processing-2",
    chapter: "usf-post-processing",
    level: 2,
    question: "PostProcessVolume 的 Blending 功能如何工作？",
    answer: "多个 Volume 可以在场景中设置影响范围和优先级。相机进入 Volume 范围时，效果按权重平滑过渡。可设置全局 Volume 和局部 Volume，实现区域性的后处理效果变化（如进入洞穴时画面变暗）。",
    tags: ["PostProcessVolume", "Blending"],
  },
  {
    id: "usf-post-processing-3",
    chapter: "usf-post-processing",
    level: 3,
    question: "URP 后处理与内置管线 Post Processing Stack 有什么区别？",
    answer: "URP 后处理集成在渲染管线中，用 Volume + VolumeProfile 配置，更高效且与管线原生集成。URP 用 RenderFeature 自定义后处理 Pass。内置管线用 PostProcessing Stack v2 包，功能更多但性能稍差。URP 的后处理 API 更简洁。",
    tags: ["URP", "对比"],
  },
  {
    id: "usf-post-processing-4",
    chapter: "usf-post-processing",
    level: 4,
    question: "如何在 URP 中自定义后处理效果？",
    answer: "1)创建 ScriptableRendererFeature 和 ScriptableRenderPass 2)在 Pass 中用 Blit 执行自定义 Shader 3)创建 VolumeComponent 定义可调参数 4)用 RenderTargetHandle 管理临时纹理 5)在 Render Feature 中注入到管线合适位置 6)支持 BeforeRendering/AfterRendering 等注入点 7)注意 URP 12+ 的 Blit API 变化。",
    tags: ["URP", "自定义后处理", "RenderFeature"],
  },
];
