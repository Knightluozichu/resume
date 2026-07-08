import type { ReviewQuestion } from "./types";

export const umsSrpMasteryQuestions: ReviewQuestion[] = [
  {
    id: "ums-srp-mastery-1",
    chapter: "ums-srp-mastery",
    level: 1,
    question: "URP 渲染流程的主要阶段有哪些？",
    answer: "Shadow（阴影）→ Opaque（不透明物体）→ Sky（天空盒）→ Transparent（半透明物体）→ PostProcessing（后处理）。每个阶段是一个 RenderPass，Renderer 编排这些 Pass 的执行顺序。自定义效果通过 RendererFeature 在特定阶段注入额外的 RenderPass。",
    tags: ["URP", "渲染流程", "RenderPass"],
  },
  {
    id: "ums-srp-mastery-2",
    chapter: "ums-srp-mastery",
    level: 2,
    question: "RendererFeature 和 RenderPass 是什么关系？为什么要分两层？",
    answer: "RenderPass 是渲染执行单元（画什么、怎么画），RendererFeature 是可复用的功能封装（配置 + 挂载 RenderPass）。分层是因为 Feature 需要在 Inspector 里配置参数（材质、注入时机），而 Pass 负责实际执行。一个 Feature 可管理多个 Pass（如描边 Feature 含渲染 Pass + Blit Pass）。Feature 可被多个 Renderer 复用，Pass 是 Feature 内部实现细节。",
    tags: ["RendererFeature", "RenderPass", "架构分层"],
  },
  {
    id: "ums-srp-mastery-3",
    chapter: "ums-srp-mastery",
    level: 3,
    question: "SRP Batcher 和 GPU Instancing 有什么区别？能不能同时用？",
    answer: "SRP Batcher 合并相同 Shader 的材质的 CBUFFER 绑定，不合并 DrawCall（每物体仍一次），适合大量不同网格同 Shader 的场景。GPU Instancing 把同 Mesh 同 Material 的物体合并成一次 DrawCall，适合大量相同物体。两者互斥：一个 DrawCall 要么走 SRP Batcher 要么走 Instancing。规则：相同物体用 Instancing，不同物体同 Shader 用 SRP Batcher。",
    tags: ["SRP Batcher", "GPU Instancing", "批处理"],
  },
  {
    id: "ums-srp-mastery-4",
    chapter: "ums-srp-mastery",
    level: 4,
    question: "自定义 RenderPass 里 Blit 后画面黑屏，可能的原因和排查方法是什么？",
    answer: "可能原因：1）Blit 的源和目标 RenderTexture 格式不匹配；2）depthBuffer 设置错误（后处理应 depthBufferBits=0）；3）passEvent 时机不对（在渲染中途 Blit 导致状态丢失）；4）材质 pass index 错误。排查：用 Frame Debugger 逐 DrawCall 查看每步输出；确认临时纹理的 descriptor 和 camera target 一致（颜色格式、尺寸）；passEvent 选 AfterRenderingOpaques 或 AfterRenderingTransparents。RTHandle 要正确分配和释放。",
    tags: ["RenderPass", "Blit", "黑屏排查", "Frame Debugger"],
  },
];
