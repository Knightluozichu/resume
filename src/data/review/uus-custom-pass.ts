import type { ReviewQuestion } from "./types";

export const uusCustomPassQuestions: ReviewQuestion[] = [
  {
    id: "uus-custom-pass-1",
    chapter: "uus-custom-pass",
    level: 1,
    question: `Renderer Feature 和 Render Pass 的关系是什么？`,
    answer: `Renderer Feature（ScriptableRendererFeature）是入口，负责创建和注册 Pass：Create() 初始化 Pass 实例，AddRenderPasses() 每帧调用 EnqueuePass 将 Pass 注入管线。Render Pass（ScriptableRenderPass）是执行体，在 Execute() 中执行 Blit/DrawMesh 等绘制命令。一个 Feature 可以创建一个或多个 Pass。`,
    tags: ["Renderer Feature", "Render Pass"],
  },
  {
    id: "uus-custom-pass-2",
    chapter: "uus-custom-pass",
    level: 2,
    question: `ScriptableRenderPass 的生命周期方法有哪些？各自在何时调用？`,
    answer: `Create()：Feature 初始化时调用，创建 Pass 实例并设置注入点。OnCameraSetup()：每帧每相机调用，分配临时 RT、配置渲染目标。Execute()：每帧每相机调用，执行 Blit/DrawMesh 绘制命令。OnCameraCleanup()：每帧每相机调用后执行，释放临时 RT。FrameCleanup()：帧结束时调用，清理帧级资源。`,
    tags: ["生命周期", "ScriptableRenderPass"],
  },
  {
    id: "uus-custom-pass-3",
    chapter: "uus-custom-pass",
    level: 3,
    question: `为什么自定义 Pass 中不能直接 Blit 到 cameraColorTarget？必须怎么处理？`,
    answer: `直接 Blit 到 cameraColorTarget 是未定义行为——GPU 可能正在读取同一 RT 作为输入（读取和写入同一 RT 会导致数据竞争）。必须分配临时 RT 作为中间缓冲：Blit(cameraColorTarget → tempRT, 经材质处理) → Blit(tempRT → cameraColorTarget)。在 OnCameraSetup() 中用 cmd.GetTemporaryRT() 分配，在 OnCameraCleanup() 中用 cmd.ReleaseTemporaryRT() 释放，否则内存泄漏。`,
    tags: ["Blit", "临时RT", "内存泄漏"],
  },
  {
    id: "uus-custom-pass-4",
    chapter: "uus-custom-pass",
    level: 4,
    question: `如何用自定义 Pass 实现描边效果？注入点应该选在哪里？为什么？`,
    answer: `步骤：1) 编写描边材质（Fragment Shader 采样邻域像素，根据亮度差/深度差生成描边）；2) 创建 OutlineFeature 继承 ScriptableRendererFeature，Create() 创建 OutlinePass；3) OutlinePass 在 OnCameraSetup() 分配临时 RT，Execute() 执行两次 Blit（cameraColorTarget → tempRT 经描边材质 → cameraColorTarget）；4) OnCameraCleanup() 释放 RT。注入点选 AfterRenderingOpaques：不透明物体已渲染（有颜色可采），但在半透明和后处理之前（描边不被半透明覆盖，且后处理的 Bloom 仍能作用于描边高亮）。`,
    tags: ["描边", "注入点", "自定义Pass"],
  },
];
