/** 复习题库 · URP 专项优化（mxrw-urp-optimization）。Unity Mobile/XR/Web 优化 Ch1 改编。 */

import type { ReviewQuestion } from "./types";

export const mxrwUrpOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "mxrw-urp-1",
    chapter: "mxrw-urp-optimization",
    level: 1,
    question: "URP 和 Built-in 渲染管线最根本的架构区别是什么？",
    answer:
      "Built-in 是黑盒管线——每次换材质都要从 CPU 重新打包管线状态发送给 GPU（产生 SetPass Call）；URP 是可编程管线（SRP），通过 SRP Batcher 把兼容同一 Shader 变体的不同材质按统一常量缓冲布局批量提交，不需重建管线状态。",
    tags: ["URP", "Built-in", "架构"],
  },
  {
    id: "mxrw-urp-2",
    chapter: "mxrw-urp-optimization",
    level: 1,
    question: "SRP Batcher 和 GPU Instancing 解决的是同一个问题吗？分别适用于什么场景？",
    answer:
      "不是同一个问题。GPU Instancing 是一次 Draw Call 画 N 个完全相同网格+材质的物体（如草地、子弹群）；SRP Batcher 是同一 Shader 变体、不同材质参数的物体共用管线状态批量提交（如 200 棵不同颜色的树）。Instancing 降 Draw Call；SRP Batcher 降 SetPass。",
    tags: ["SRP Batcher", "GPU Instancing"],
  },
  {
    id: "mxrw-urp-3",
    chapter: "mxrw-urp-optimization",
    level: 1,
    question: "URP Asset 是什么？它的关键作用是什么？",
    answer:
      "URP Asset 是 URP 管线所有质量/性能参数的集中配置文件（.asset 后缀）。Render Scale、MSAA、Shadow Distance、Cascade Count、HDR、Depth Texture 等都在这里管理。同一项目可有多个 URP Asset 对应不同画质档位（High/Medium/Low）。",
    tags: ["URP Asset"],
  },
  {
    id: "mxrw-urp-4",
    chapter: "mxrw-urp-optimization",
    level: 2,
    question: "为什么移动端不推荐使用延迟渲染（Deferred Rendering）？",
    answer:
      "延迟渲染需要 G-Buffer（至少 4 张高精度 RT：位置/法线/反照率/镜面），对移动 GPU 的 tile memory 和带宽是沉重负担。移动端灯光数量通常较少（≤4 盏实时灯），前向渲染+Lightmap 烘焙比延迟渲染更高效。如果确实需要多盏动态灯，优先烘焙而非切延迟。",
    tags: ["前向渲染", "延迟渲染", "移动端"],
  },
  {
    id: "mxrw-urp-5",
    chapter: "mxrw-urp-optimization",
    level: 2,
    question: "如何验证 SRP Batcher 是否在项目中生效？",
    answer:
      "打开 Frame Debugger（Window → Analysis → Frame Debugger），选一帧展开渲染顺序。检查 Draw Call 的标签——如果 SRP Batcher 激活会显示 `SRP Batch`，否则显示 `SetPass Call`。对比 SRP Batcher 开关前后的 SetPass Call 数量变化。Shader 代码也可检查：需声明 `CBUFFER_START(UnityPerMaterial)` 包裹逐材质属性。",
    tags: ["SRP Batcher", "Frame Debugger"],
  },
  {
    id: "mxrw-urp-6",
    chapter: "mxrw-urp-optimization",
    level: 2,
    question: "Custom Shader 为什么不进入 SRP Batcher？列出至少两个可能原因。",
    answer:
      "① Shader 未声明 `CBUFFER_START(UnityPerMaterial)` 包裹逐材质属性——SRP Batcher 依赖统一的常量缓冲布局。② 使用了 MaterialPropertyBlock 修改材质属性——MPB 会中断 Batcher。③ Shader 不是 URP/HDRP 兼容 Shader（未使用 SRP 的 Shader Library）。④ 运行时修改了 Render State（Blend/ZTest 等）导致管线状态变化。",
    tags: ["SRP Batcher", "Shader"],
  },
  {
    id: "mxrw-urp-7",
    chapter: "mxrw-urp-optimization",
    level: 2,
    question: "Unity 6 的 Adaptive Probe Volumes 相比旧 Light Probe Group 的最大改进是什么？",
    answer:
      "自适应细分——不用再手动在场景里摆几百个 Probe 球体。Unity 自动根据场景几何密度生成 3D 探针体积网格：靠近几何体（墙边、角落）自动细分更密，空旷处更疏。动态物体进入不同区域自动采样最近探针以获得准确间接光照。",
    tags: ["Adaptive Probe Volumes", "Unity 6"],
  },
  {
    id: "mxrw-urp-8",
    chapter: "mxrw-urp-optimization",
    level: 3,
    question: "项目切到 URP 后 Draw Call 没减少，和 Built-in 差不多。如何判断 SRP Batcher 是否正常工作？",
    answer:
      "SRP Batcher 降的是 SetPass Call（管线状态切换次数）而非 Draw Call 数——两者是不同的指标。检查 Frame Debugger：如果 SetPass 从 200 降到 20 但 Draw Call 还是 500，Batcher 已正常工作，你盯错指标了。Draw Call 数量由 Static Batching/GPU Instancing/Dynamic Batching 控制，不是 SRP Batcher 的职责。合批降 Draw Call、Batcher 降 SetPass——两条路并行走。",
    tags: ["SRP Batcher", "Draw Call", "SetPass"],
  },
  {
    id: "mxrw-urp-9",
    chapter: "mxrw-urp-optimization",
    level: 3,
    question: "在 URP Asset 里开了 HDR，移动端帧率掉了一半。分析原因并给出修法。",
    answer:
      "HDR 需要 RGBA16F 浮点颜色缓冲——数据量是普通 RGBA8 的 2 倍（每像素 64bit vs 32bit）。移动 GPU 的 tile memory 和 DRAM 带宽直接翻倍。大多数手机屏幕也不支持真正的 HDR 显示。修法：移动端关闭 HDR；如果确实需要 HDR 效果（如 Bloom），用伪 HDR 后处理技巧代替整张浮点缓冲。",
    tags: ["HDR", "移动端", "URP Asset"],
  },
  {
    id: "mxrw-urp-10",
    chapter: "mxrw-urp-optimization",
    level: 3,
    question: "你负责一个移动端室内场景项目：一个房间里有 6 盏实时点光源 + 窗外方向光。设计一套完整的光照优化方案。",
    answer:
      "① 首先确定前向渲染（不切延迟——移动端不划算）。② 把 6 盏灯中大部分改成 Baked（Lightmap 烘焙场景静态光照），只留 1–2 盏关键灯做实时（如跟随角色的灯）。③ 动态物体用 Light Probe 或 Adaptive Probe Volumes（Unity 6）补间接光照。④ 方向光用 Mixed 模式——静态物体烘焙阴影、动态物体实时阴影。⑤ 如果还有 GPU bound：减少 Shadow Distance 和 Cascade Count。核心思路：灯光数量不在多而在「几盏是真正动态必需的」。",
    tags: ["光照优化", "前向渲染", "烘焙"],
  },
  {
    id: "mxrw-urp-11",
    chapter: "mxrw-urp-optimization",
    level: 2,
    question: "Renderer Feature 在 URP 架构中扮演什么角色？",
    answer:
      "Renderer Feature 是 URP 的管线扩展插件机制——开发者不碰管线源码就能在渲染流程中插入自定义 Pass（如自定义后处理、覆盖渲染、深度/模板操作）。在 URP Asset 的 Renderer Data 中添加，通过 RenderPassEvent 指定插入时机（BeforeRendering/Opaque/Transparent/AfterRendering 等）。这是 URP 相比 Built-in 的重大灵活性优势。",
    tags: ["Renderer Feature", "URP"],
  },
];
