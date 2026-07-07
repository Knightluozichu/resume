/** 复习题库 · 渲染管线与图形学（unity-advanced-render-pipeline）。《Unity3D高级编程：主程手记》第9章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedRenderPipelineQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-rp-1",
    chapter: "unity-advanced-render-pipeline",
    level: 1,
    question: "简述一帧渲染的管线流程：CPU 端和 GPU 端分别做什么？",
    answer:
      "**CPU 端（渲染准备）**：① **Culling（剔除）**——逐相机计算视锥体内可见的物体（Frustum Culling），还要做遮挡剔除（Occlusion Culling，被前面物体挡住的不渲染）；② **Sorting（排序）**——对可见物体按渲染队列排序（不透明物体从前到后减少 overdraw，透明物体从后到前保证正确混合）；③ **Draw Call 提交**——CPU 为每个要渲染的物体准备 Draw Call：绑定 Vertex Buffer、Index Buffer、纹理、Shader 参数、材质状态，调用 Graphics API（DrawIndexed/DrawDynamic）把命令送入 GPU Command Buffer。**GPU 端（渲染执行）**：① **Vertex Shader（顶点着色器）**——对每个顶点执行，做模型空间→裁剪空间的变换（MVP）、骨骼动画、顶点动画；② **Primitive Assembly & Rasterization（图元装配与光栅化）**——把顶点组装成三角形，再把三角形栅格化为片元（Fragment，即候选像素）；③ **Fragment Shader/Pixel Shader（片元着色器）**——对每个片元计算最终颜色（采样纹理、光照计算）；④ **Output Merger（输出合并/Per-Fragment Operations）**——深度测试（Z-Test）、模板测试（Stencil Test）、混合（Blend，透明物体与颜色缓冲混合），最终写入 FrameBuffer/RenderTexture。CPU 和 GPU 通过 Command Buffer 异步并行工作，CPU 一帧前提交，GPU 一帧后执行。",
    tags: ["渲染管线", "Culling", "Sorting", "DrawCall", "VertexShader", "FragmentShader", "Rasterization", "OutputMerger"],
  },
  {
    id: "ua-rp-2",
    chapter: "unity-advanced-render-pipeline",
    level: 1,
    question: "SetPass Call 和 Draw Call 的区别是什么？为什么 SetPass Call 开销更大？",
    answer:
      "**Draw Call** 是 CPU 调用 GPU 绘制一组图元（通常是一个 Mesh/SubMesh）的命令，每次 Draw Call 会把一组顶点送到 GPU 渲染。**SetPass Call（也叫 Batch 或 Render State Change）** 是指切换渲染状态的调用——包括切换 Shader/Pass、绑定不同的 Material、切换 Render Texture、修改 Blend/Depth/Stencil 状态、绑定不同的 Vertex Declaration 等。一个 SetPass Call 后面通常跟着多个 Draw Call（同一材质不同物体）。**SetPass Call 开销更大**的原因：① GPU 是流水管线设计，切换状态会导致 Pipeline Flush——之前在管线里的工作必须全部完成才能切换状态，产生 GPU 空闲（Pipeline Stall/Bubble）；② Shader 切换可能需要重新编译/上传 Shader 程序到 GPU；③ 材质参数切换需要重新绑定常量缓冲区（Constant Buffer），有 CPU-GPU 通信开销；④ 渲染目标切换会导致 Tile-Based GPU（移动端）的 Tile Memory 刷新。Unity Profiler 的 `SetPass Call` 数字比 `Draw Call` 更能反映 CPU 端渲染压力。优化目标主要是减少 SetPass Call（通过合批），Draw Call 数量多一些只要不切换状态影响较小。",
    tags: ["SetPassCall", "DrawCall", "渲染状态切换", "PipelineFlush", "Batch", "CPU开销"],
  },
  {
    id: "ua-rp-3",
    chapter: "unity-advanced-render-pipeline",
    level: 1,
    question: "Unity 中的三种渲染管线 Built-in、URP、HDRP 分别适合什么项目？",
    answer:
      "① **Built-in Render Pipeline（内置管线）**——Unity 传统管线，固定流程（Forward/Deferred 硬编码），扩展性有限但兼容性最好、资料最多。适合：维护老项目、对渲染定制需求不高的中小项目、低端移动设备（已被官方标记为维护模式，不再添加新功能）。② **URP（Universal Render Pipeline，通用渲染管线）**——SRP 框架下的跨平台管线，默认 Forward 渲染，轻量高性能，支持 Shader Graph 可视化编辑，可自定义 Renderer Feature 扩展。适合：移动端游戏、中低端 PC/主机、跨平台项目、VR/AR、2D 游戏（URP 2D Renderer）、需要平衡画质和性能的绝大多数商业手游。③ **HDRP（High Definition Render Pipeline，高清渲染管线）**——面向高端 PC/主机（PS5/Xbox Series X）的写实渲染管线，基于物理的光照、体积光/雾、光线追踪、高级材质（Subsurface Scattering、Clear Coat、Iridescence）等，Deferred+Forward 混合，画质天花板高但性能要求也高。适合：3A 级写实游戏、汽车展示、建筑可视化、影视级渲染。**选型原则**：移动端/跨平台选 URP；追求写实3A画质且目标高端平台选 HDRP；老项目维护继续 Built-in。三者 Shader 不兼容，切换项目管线需要重写 Shader，项目初期必须确定。",
    tags: ["Built-in", "URP", "HDRP", "SRP", "渲染管线选型", "Forward", "Deferred", "跨平台"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-rp-4",
    chapter: "unity-advanced-render-pipeline",
    level: 2,
    question: "静态合批（Static Batching）、动态合批（Dynamic Batching）、GPU Instancing、SRP Batcher 的原理和适用条件分别是什么？",
    answer:
      "合批的目标是减少 SetPass Call/Draw Call，让多个物体共用一次渲染状态提交：① **静态合批**——标记为 `Static` 的物体，在 Build 时（或编辑器 Play Mode 下）把它们的顶点合并成一个大的 Vertex Buffer，运行时仍然按物体逐个提交 Draw Call 但不需要切换材质状态（VBO 已合并，通过偏移量绘制子区间）。限制：物体必须相同材质、不能移动、会增加内存和包体（顶点数据复制多份），大场景静态几何（地形、建筑物、植被）首选。② **动态合批**——运行时 CPU 把小的动态物体顶点（Unity 限制：Built-in 约 300 顶点/900 顶点属性，URP 已弱化）合并到一个 VBO 一次性 Draw。限制：相同材质、顶点属性少、CPU 有开销（每帧拷贝顶点），只适合非常小的 Mesh（如粒子、小道具），现代 GPU 场景下性价比不高。③ **GPU Instancing**——使用 `DrawMeshInstanced`/`DrawMeshInstancedIndirect` 一次 Draw Call 渲染多个相同 Mesh+相同材质但不同 Transform/参数的物体（通过 per-instance 常量缓冲区传不同位置/颜色）。限制：必须相同 Mesh 和 Material（Shader 需支持 `#pragma multi_compile_instancing`），适合草、树、重复道具、子弹等大量重复物体。性能好且不增加内存。④ **SRP Batcher**——URP/HDRP 内置，不是合并顶点而是让相同 Shader 的材质在 GPU 常量缓冲区（Constant Buffer）层面复用——只要材质变体相同（Shader+Keyword 一致），不同材质参数也可以合批（常量缓冲按材质绑定，CPU 只需更新 per-object 属性，不需要切换 Shader Program）。限制：必须用 SRP（URP/HDRP）、Shader 必须兼容 SRP Batcher（不能用 MaterialPropertyBlock 打破某些规则，但实际上可以用），不限制不同材质、不要求静态/动态、不复制顶点。**现代 URP 项目中 SRP Batcher 是首选合批方式，几乎零成本，静态合批补充大场景，Instancing 用于大量重复物体。**",
    tags: ["静态合批", "动态合批", "GPUInstancing", "SRPBatcher", "合批", "DrawCall优化", "VBO"],
  },
  {
    id: "ua-rp-5",
    chapter: "unity-advanced-render-pipeline",
    level: 2,
    question: "MaterialPropertyBlock 的作用是什么？为什么用它修改渲染参数不会破坏 SRP Batcher/Instancing？",
    answer:
      "**MaterialPropertyBlock（MPB）** 是一个轻量的「属性覆盖块」，可以通过 `Renderer.SetPropertyBlock(block)` 为单个 Renderer 覆盖材质的部分属性（如颜色、Float、纹理），而不需要克隆出新的 Material 实例。**为什么不用直接修改 renderer.material.color**？因为访问 `.material` 会克隆出一个独立 Material 实例（导致材质实例化膨胀、无法合批），而 MPB 只在 Draw Call 时把覆盖的属性写入 per-object 常量缓冲区，不改变材质本身。对合批的影响：① **对 GPU Instancing**——MPB 是 Instancing 的天然搭档，通过 `SetFloat/SetColor/SetTexture` 可以给每个实例传不同参数（如每棵草不同颜色），这些 per-instance 数据走实例化缓冲区，不打断 Instancing 合批；② **对 SRP Batcher**——URP/HDRP 中 SRP Batcher 的工作机制是 Shader 不变即可合批，per-object 属性（包括 MPB 设置的属性）通过 per-object CBuffer 更新，不切换 Shader Program，所以 MPB **不会打断 SRP Batcher**（这是 URP 中的重要优化点，Built-in 中 MPB 可能打断静态/动态合批）；③ **对静态/动态合批**——MPB 可能打断 Built-in 的静态合批（因为属性不同），但在 SRP 下不是问题。使用场景：批量绘制大量相同材质但颜色/参数不同的物体（如队友血条颜色、不同颜色的道具、批量绘制的特效），配合 `Graphics.DrawMeshInstanced` 使用效率最高。注意：MPB 不要每帧 new，作为成员字段复用。",
    tags: ["MaterialPropertyBlock", "MPB", "材质实例化", "SRPBatcher", "GPUInstancing", "per-instance", "渲染属性"],
  },
  {
    id: "ua-rp-6",
    chapter: "unity-advanced-render-pipeline",
    level: 2,
    question: "什么情况会打断合批（Batching Breaks）？列举常见原因。",
    answer:
      "合批被打断意味着两个物体虽然看起来材质相同，但无法合并到同一个 Batch/Draw Call，产生额外 SetPass Call。常见打断原因：① **材质不同**——即使 Shader 相同、贴图不同也不行（材质实例不同），这是最常见原因；② **Shader 变体/Keyword 不同**——同一 Shader 但启用了不同 Keyword（如一个开了法线贴图一个没开，或 Lightmap On/Off、Shadow On/Off）会走不同 Shader 变体，打断合批；③ **顶点属性不同**——一个 Mesh 有第二套 UV、法线、切线，另一个没有，动态合批会被打断；④ **Lightmap 不同**——使用了不同 Lightmap 或不同 Lightmap Index/ScaleOffset 的物体无法合批（但 SRP Batcher 不受此限）；⑤ **材质使用了不同 Render Queue**——即使同材质也会被分到不同 Pass；⑥ **多 Pass Shader**——Shader 有多个 Pass（如 Legacy 透明双面 Shader），合批复杂容易打断；⑦ **不同 Light Probe/Reflection Probe**影响光照一致性；⑧ **Skinned Mesh 与静态 Mesh**不能合批；⑨ **Real-time Shadow 接收/投射设置不同**可能导致额外 Pass 打断；⑩ **Canvas 分层**（不同 Canvas 或不同 Sorting Layer）打断 UI 合批。**排查方法**：Frame Debugger 是神器——可以看到每个 Draw Call 为什么不能和前一个合批，显示 `Break reason`（如 `Different Material Instance`、`Different Shader Keywords`、`Different Lightmap` 等）。工程上要保证：同一类物体材质共享、尽量不用多 Pass、关闭不必要的 Shader Keyword、静态物体统一设置 Lightmap 参数。",
    tags: ["合批打断", "BatchingBreak", "ShaderKeyword", "材质实例", "FrameDebugger", "Lightmap", "合批失败原因"],
  },

  // ── L3 应用：工程实践 ──
  {
    id: "ua-rp-7",
    chapter: "unity-advanced-render-pipeline",
    level: 3,
    question: "CommandBuffer 是什么？在 Unity 中它可以用来扩展哪些渲染效果？",
    answer:
      "**CommandBuffer** 是 Unity 提供的一组「延迟渲染命令列表」——你可以把一系列渲染指令（Blit、DrawRenderer、SetRenderTarget、DrawMesh、Clear、SetGlobalTexture 等）记录到一个 CommandBuffer 中，然后挂载到相机渲染管线的特定时机（CameraEvent，如 BeforeDepthTexture、AfterForwardOpaque、BeforeImageEffectsOpaque 等，URP 中通过 ScriptableRendererFeature + ScriptableRenderPass 注入）执行。相当于可以在渲染管线的任意「钩子点」插入自定义渲染逻辑，而不需要写完整的管线。典型应用：① **自定义阴影/平面阴影**——在 BeforeForwardOpaque 之后把物体再渲染一次到自定义 RT，画到地面；② **描边效果（Outline）**——在 AfterSkybox 或 AfterForwardAlpha 后把选中物体用法线外扩方法单独渲染到 RT，再叠加到屏幕；③ **玻璃/折射**——抓取 Opaque 结果到临时 RT，做扭曲采样；④ **体积光/体积雾**——用多次 Blit + 模糊叠加；⑤ **GrabPass 替代**——Built-in 中 GrabPass 性能差，CommandBuffer 可以精确控制在什么时候抓屏；⑥ **自定义后处理**——在 AfterEverything 之前/后插入自己的 Blit 链；⑦ **贴花（Decal）**——在 GBuffer 之后往 GBuffer 绘制贴花信息（URP 的 Decal System 就是基于 CommandBuffer）；⑧ **多相机渲染**——如小地图相机、热成像效果。注意：CommandBuffer 的执行是在 GPU 端延迟执行的，CPU 侧只是记录命令，性能较好；但创建 RenderTexture 要注意尺寸和格式（不要每帧 new，用 RTHandle 复用），用完用 `Release()` 释放。URP 中推荐用 RTHandle + ScriptableRenderPass 而不是直接 CameraEvent+CommandBuffer。",
    tags: ["CommandBuffer", "CameraEvent", "渲染扩展", "自定义渲染", "Blit", "ScriptableRenderPass", "URPFeature", "描边", "贴花"],
  },
  {
    id: "ua-rp-8",
    chapter: "unity-advanced-render-pipeline",
    level: 3,
    question: "Forward Rendering 和 Deferred Rendering 的核心区别是什么？各自适合什么场景？",
    answer:
      "**Forward Rendering（前向渲染）**：逐物体渲染，每个光源照到的每个物体都要在 Shader 中跑一次光照计算。流程：每个物体的 Shader 遍历影响它的光源算颜色，直接写入颜色缓冲。优点：支持半透明、MSAA、多样的 Shader 效果（如次表面散射）、实现简单、移动端 Tile-Based GPU 友好；缺点：光源多时 Draw Call 爆炸——N 个物体 × M 个光源 = N×M 次光照 Pass，Unity 前向 Base Pass 只处理最亮的平行光，其余逐像素光源走 Additional Pass（Additive），性能随光源数线性下降。**Deferred Rendering（延迟渲染）**：分两阶段——G-Buffer Pass 先渲染所有物体到多个几何信息缓冲区（Albedo、Normal、Roughness/Metallic、Emission、Depth，共 3~4 个 RT），不做光照；然后 Lighting Pass 对每个像素做光照计算（用 G-Buffer 信息），光源多时只影响像素处理数，不影响物体绘制次数。优点：光源数量几乎不影响 Draw Call（只影响 Lighting Pass 的像素计算），适合多光源场景（城市夜景、室内灯光多），方便做 SSAO/SSR/Decal 等屏幕空间效果；缺点：① 不支持 MSAA（需要 Post-Process AA，如 FXAA/TAA）；② 半透明物体仍需要 Forward 路径单独渲染（Deferred 不支持透明）；③ G-Buffer 占用大量显存带宽（4 个 MRT 每个 4 字节 = 16 字节/像素，1080p 约 16MB），移动端带宽压力大；④ 不支持多种材质类型（只能是统一 G-Buffer 格式）。**选型**：移动端/VR/半透明多的项目选 Forward（URP 默认）；3A 写实/多光源/PC主机选 Deferred（HDRP 默认，URP 也有 Deferred Renderer Path）。",
    tags: ["ForwardRendering", "DeferredRendering", "前向渲染", "延迟渲染", "GBuffer", "MRT", "光源", "渲染路径"],
  },
  {
    id: "ua-rp-9",
    chapter: "unity-advanced-render-pipeline",
    level: 3,
    question: "在 URP 项目中，如何通过 Frame Debugger 和 Profiler 定位渲染性能瓶颈？请给出排查流程。",
    answer:
      "**排查流程**：① **Profiler 看各模块占比**——打开 Profiler → GPU/CPU 面板看 `Render.OpaqueGeometry`、`Render.TransparentGeometry`、`Render.PostProcessing`、`Render.Shadows` 各占多少毫秒，判断瓶颈在 CPU（SetPass Call 过多）还是 GPU（Fragment Shader 复杂/Overdraw 高）；② **Frame Debugger 看 Draw Call**——打开 Frame Debugger，启用后逐帧步进：a) 看总 Draw Call/SetPass Call 数；b) 检查 `Why this draw call can't be batched with the previous one` 找到 Batch Break 原因；c) 定位是否有重复渲染（如相机没剔除干净、Shadow 重复）、是否有意外的全屏 Blit、是否有 Runtime 生成的材质实例导致合批失败；③ **Overdraw 查看**——Scene 视图切换 Overdraw 模式，越亮/越红的区域 overdraw 越高，透明/粒子/UI 是重灾区，要减少叠层数、缩小粒子面积；④ **GPU 瓶颈细分**：Profiler GPU 面板看各 Pass 耗时——如果 Shadows 占比大，要减少阴影距离/阴影 Cascades/阴影贴图分辨率；如果 Post-Processing 占比大，要关闭不必要 Effect、降低 Bloom 半径、用 Half Res 下采样；⑤ **Shaded Wireframe/SetPass 可视化**——Stats 面板实时看 Batches/Saved by batching/SetPass Count 指标；⑥ **Memory/Texture 检查**——Memory Profiler 看纹理是否过大、是否有未压缩的 RGBA32 纹理、RenderTexture 数量是否泄漏；⑦ **移动端补充**——用 Xcode Frame Capture/GPU Profiler 或 Snapdragon Profiler 看 Shader Cycles、Tile Utilization，检查是否有 Load/Store Action 不必要地读写 GMEM（移动端带宽极贵）。**常见元凶**：过多 Realtime Light、阴影距离过大、后处理全开、透明粒子叠加过密、未合批的大量小物体、Canvas 重建频繁。",
    tags: ["FrameDebugger", "Profiler", "性能排查", "Overdraw", "SetPassCall", "瓶颈定位", "渲染优化", "URP"],
  },

  // ── L4 主程视角：技术决策 ──
  {
    id: "ua-rp-10",
    chapter: "unity-advanced-render-pipeline",
    level: 4,
    question: "你作为主程从零搭建一个跨平台（移动端+PC）的 URP 项目，如何制定渲染管线配置和合批策略？",
    answer:
      "**管线选择**：URP，Asset 配置按平台分档（Quality Settings 中 Tier 配置）——**移动端（Low/Med Tier）**：Forward Renderer、HDR 关闭（或 FP16 HDR 仅高端机）、MSAA 2x（Low 档关）、阴影 Distance 30~50m、Shadow Cascade 1 级、Shadow Resolution 1024~2048、Additional Lights Per-Object 上限 4 个（Vertex 模式）、后处理只开 Bloom+Tonemapping（Bloom 用 Half Res + 双线性，Scalable Ambient Obscuration 代替 SSAO 或关闭）、LOD Bias 0.5~0.7、Pixel Light Count 1；**PC/主机（High Tier）**：Forward+ 或 Deferred、HDR(R11G11B10)、MSAA 4x 或 TAA、阴影 Distance 70~100m、Shadow Cascade 4 级、Shadow Resolution 2048~4096、Additional Lights Per-Pixel 上限 16~32、后处理全开（Bloom/SSAO/SSR/Depth of Field/Tonemapping/Motion Blur/Film Grain）、LOD Bias 1.5~2。**合批策略**：① **SRP Batcher 作为主力**——强制所有 Shader 兼容 SRP Batcher（Shader Graph 生成的自动兼容，手写 Shader 要保证 CBUFFER_START(UnityPerMaterial) 包裹所有 Properties），Code Review 检查；② **GPU Instancing**——草、树、子弹、重复道具用 DrawMeshInstancedIndirect 或 Entities Graphics，配合 MPB 传 per-instance 数据；③ **静态合批**——大场景静态几何（建筑、地形装饰）勾选 Static，注意内存成本，必要时用「分块静态合批」（Chunk-based）避免单块 VB 过大；④ **动态合批基本不用**——Vertex 限制太小，SRP Batcher 覆盖场景；⑤ **UI 合批**——同一 Canvas 下精灵图集（Sprite Atlas）合批，尽量减少 Mask/Raycast Target 打断，不同 UI 面板用 Sub-Canvas 隔离重建范围；⑥ **粒子合批**——同一材质粒子系统合批，不同材质严格禁止叠加超过 3 层。**Shader 策略**：用 Shader Graph 为主保证兼容性，手写 Shader 用 single-pass、避免 multi_compile 过多 Keyword 变体（用 shader_feature 限制），打包用 Shader Variant Collection 预收集变体防止运行时编译卡顿。**资源策略**：纹理压缩（移动端 ASTC 6x6，PC DXT5/BC7）、Mipmap 开启、各向异性过滤仅地面/路面开启、模型 Read/Write 关闭、Mesh Compression 启用。**运行时策略**：CullingGroup API 做远距离物体禁用、相机 Layer 分层（远距不渲染小物体）、Shadow Casting 模式二选一（Two Sided 不滥用）、QualitySettings 按设备跑分动态调整档位。主程要把这些规则写进**渲染规范文档**，配合 CI 的 Shader Variant 分析和包体检查工具执行红线。",
    tags: ["主程决策", "URP配置", "跨平台", "合批策略", "质量分级", "移动端", "PC", "SRPBatcher", "Shader变体", "渲染规范"],
  },
];
