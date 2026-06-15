/** 复习题库 · GPU 性能分析（prof-gpu-performance-analysis）。Unity 官方 Profiling 指南 Ch3 改编。 */

import type { ReviewQuestion } from "./types";

export const profGpuPerformanceAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "prof-gpu-1",
    chapter: "prof-gpu-performance-analysis",
    level: 1,
    question: "GPU Usage Profiler 和 CPU Usage 里的 Rendering 类别是什么关系？",
    answer:
      "CPU Rendering 是 CPU 侧「为 GPU 准备命令」的时间（构建命令缓冲区、提交到驱动），GPU Usage 是 GPU 侧「真的执行绘制命令」的时间。两者是「上下楼」关系：CPU 准备命令（Rendering 条），GPU 执行命令（GPU Usage）。帧率瓶颈到谁身上就优化谁。",
    tags: ["GPU Profiler", "Rendering", "CPU vs GPU"],
  },
  {
    id: "prof-gpu-2",
    chapter: "prof-gpu-performance-analysis",
    level: 1,
    question: "Draw Call、Batches、SetPass 三个指标分别代表什么？它们之间的关系是什么？",
    answer:
      "Draw Call = CPU 向 GPU 发送「画东西」命令的次数（通信频率）。Batches = Unity 做完合批后的实际命令数量（驱动收到的命令数）。SetPass = 材质/Shader 切换次数（合批的最大障碍）。关系：Draw Call 多 → Unity 自动合批 → 看 Batches 是否下降；Batches 还是高 → 看 SetPass——SetPass 高说明材质/Shader 种类太杂，合批失败。",
    tags: ["Draw Call", "Batches", "SetPass"],
  },
  {
    id: "prof-gpu-3",
    chapter: "prof-gpu-performance-analysis",
    level: 1,
    question: "什么是 Fill Rate 瓶颈？用什么方法可以判断当前帧是不是 Fill Rate 瓶颈？",
    answer:
      "Fill Rate 瓶颈 = GPU 每秒读写像素的吞吐量成为限制——通常由大量透明叠加（Overdraw）或多重全屏后处理导致。判断方法：把画质分辨率降到 50%（如 1080p→540p），如果 GPU ms 等比例下降（如从 22ms 降到 11ms），就是 Fill Rate 瓶颈。如果几乎不变，瓶颈在 Memory Bandwidth。",
    tags: ["Fill Rate", "分辨率测试", "Overdraw"],
  },
  {
    id: "prof-gpu-4",
    chapter: "prof-gpu-performance-analysis",
    level: 1,
    question: "Frame Debugger 和 GPU Profiler 有什么区别？什么场景该用 Frame Debugger 而不是看 Profiler？",
    answer:
      "GPU Profiler 告诉你「花了多久、有多少 Draw Call」，Frame Debugger 告诉你「每条 Draw Call 是谁发的、用了什么 Shader/纹理/渲染目标」。该用 Frame Debugger 的场景：①排查为什么两个材质相同的物体没有合批；②找 Overdraw 的具体来源（透明物体画在谁上面）；③排查意外的无效 Draw Call（UI 画出来但被遮住了）。",
    tags: ["Frame Debugger", "对比"],
  },
  {
    id: "prof-gpu-5",
    chapter: "prof-gpu-performance-analysis",
    level: 1,
    question: "SRP Batcher 启用后 Draw Call 数量没变——是没生效吗？写出用来验证 SRP Batcher 是否生效的两个信号。",
    answer:
      "不是没生效——SRP Batcher 不减少 Draw Call 数量，它只降低 SetPass 切换开销。验证信号：①GPU Profiler 里 GPU ms 是否显著下降（SetPass 开销被消灭）；②Frame Debugger 里逐条看 Draw Call 标记——SRP Batcher 生效后每条 Draw Call 会显示 SRP Batch 标注而不是 SetPass Call 标注。",
    tags: ["SRP Batcher", "验证", "Draw Call"],
  },
  {
    id: "prof-gpu-6",
    chapter: "prof-gpu-performance-analysis",
    level: 2,
    question: "什么是 Memory Bandwidth 瓶颈？移动端为什么比 PC 更容易遇到？",
    answer:
      "Memory Bandwidth = GPU 与显存之间的数据传输速率上限。高分辨率纹理采样、Compute Shader 频繁读写 Buffer 时成为瓶颈。移动端比 PC 更容易遇到因为移动 GPU 的显存带宽通常只有 PC 的 1/4 到 1/10——在 PC 上不痛不痒的多纹理采样到了手机上就是带宽杀手。判断方法：降分辨率后 GPU ms 基本不变就是 Bandwidth 瓶颈。",
    tags: ["Memory Bandwidth", "移动端", "纹理采样"],
  },
  {
    id: "prof-gpu-7",
    chapter: "prof-gpu-performance-analysis",
    level: 2,
    question:
      "Editor 里 GPU Profiler 显示 GPU ms 只有 4ms，真机却是 16ms。写出至少两个具体原因。",
    answer:
      "原因一：Editor 用你开发机上的桌面 GPU（独立显卡或 Apple Silicon Metal GPU），Fill Rate 和 Memory Bandwidth 通常是移动 GPU 的 5 倍以上——Editor 跑得动不代表真机跑得动。原因二：Editor 进程本身还在渲染 Scene View、Inspector 等 UI——但这些编辑器 UI 渲染通常由 Editor 主窗口和 Scene View 分摊，不直接算进 Game 窗口的 GPU 时间——更根本的原因是桌面 GPU 和移动 GPU 在架构上的差异（Immediate Mode vs Tile-Based Rendering）。",
    tags: ["Editor vs Device", "GPU", "性能差异"],
  },
  {
    id: "prof-gpu-8",
    chapter: "prof-gpu-performance-analysis",
    level: 2,
    question: "GPU Profiler 里 SetPass 达到 30、Batches 达到 400。写出你的排查和优化顺序。",
    answer:
      "①在 GPU Profiler 里确认 SetPass 确实很高（30）。②打开 Frame Debugger，找第一条 SetPass Call 的「Why not batched」提示——确认是否因为不同 Shader/不同材质属性/不同 Render Queue 导致合批失败。③如果材质种类多 → 做材质的纹理合图（Texture Atlas）+ 材质合并。④如果 Shader 变体多 → 启用 SRP Batcher（URP/HDRP），它不要求材质参数一致只要 Shader 变体相同。⑤如果用的 Built-in RP → 考虑静态/动态合批或手动合并网格。优化目标：SetPass 降到个位数、Batches 压到 100 以下（移动端 50 以内）。",
    tags: ["SetPass", "Batches", "优化流程"],
  },
  {
    id: "prof-gpu-9",
    chapter: "prof-gpu-performance-analysis",
    level: 3,
    question:
      "你把画质分辨率从 1080p 降到 540p，GPU ms 从 22ms 降到 20ms（只降了 2ms）。这说明了什么？下一步该查什么？",
    answer:
      "GPU ms 只降了 2ms（约 9%），说明 Fill Rate 不是主要瓶颈——如果 Fill Rate 瓶颈，降 50% 分辨率 GPU ms 应该也接近降 50%。GPU ms 仍然在 20ms 说明瓶颈是 Memory Bandwidth 或几何处理阶段。下一步：①打开 GPU Profiler 看渲染阶段分解，确认是 Opaque（几何处理->顶点着色器）还是 PostProcess（带宽->纹理采样）阶段最长；②检查高分辨率纹理（4K 非必需纹理降回 1K/512）；③检查是否有大量纹理采样（一个材质采样 5+ 张纹理——合并通道或降低采样数）。",
    tags: ["Fill Rate", "Memory Bandwidth", "分辨率测试"],
  },
  {
    id: "prof-gpu-10",
    chapter: "prof-gpu-performance-analysis",
    level: 3,
    question:
      "Draw Call 只有 40 但 GPU ms 高达 18ms。你怎么排查是什么让 GPU 这么忙？写出三步排查方案。",
    answer:
      "①展开 GPU Profiler 的渲染阶段分解——看 Opaque/Transparent/PostProcess/Shadows 各自占了多少毫秒，锁定最长的阶段。②对最长的阶段做分辨率测试：降分辨率到 50% 重跑，判断 Fill Rate 还是 Bandwidth 瓶颈。③如果是 Transparent 阶段最长 + Fill Rate 瓶颈 → Overdraw 问题，打开 Frame Debugger 逐条步进透明物体，找覆盖面积大且被多次绘制的区域（如全屏粒子特效、多层 UI 叠加）。如果是 PostProcess 阶段最长 → 逐个关后处理 Pass（Bloom/DOF/Color Grading）定位最贵的后处理。",
    tags: ["GPU ms", "Draw Call 低", "三步排查"],
  },
  {
    id: "prof-gpu-11",
    chapter: "prof-gpu-performance-analysis",
    level: 4,
    question:
      "你的移动端项目场景里包含 15 个带粒子特效的角色、大量全屏后处理、以及约 30 张 2048×2048 的纹理。第一步应该优化什么？写出优先级排序和理由。",
    answer:
      "优先级排序：①**纹理压缩**——30 张 2048×2048 RGBA ≈ 480MB（加 Mipmap ≈ 630MB），对于移动端已经非常危险。立刻改用 ASTC/ETC2 压缩（降到 1–0.5 字节/像素），并检查哪些纹理不需要 2048（UI 元素可能 1024 就够了）。②**后处理**——全屏后处理每帧每个像素都要跑一遍 Shader，移动端 Fill Rate 很敏感。先关掉 Bloom 和 DOF，保留必要的 Color Grading，看 GPU ms 降了多少。③**粒子特效**——15 个角色都带粒子 = 大量透明叠加（Overdraw），是移动端 Fill Rate 杀手。减少粒子发射数、降低粒子纹理分辨率、或合并为共享的一个粒子系统。④最后才考虑几何复杂度优化。",
    tags: ["移动端", "优先级", "综合"],
  },
  {
    id: "prof-gpu-12",
    chapter: "prof-gpu-performance-analysis",
    level: 4,
    question: "描述 CPU Bound 和 GPU Bound 场景下帧耗时如何决定、以及如何从 Profiler 数据中判断当前是哪种 Bound。",
    answer:
      "CPU Bound：CPU 时间 > GPU 时间，帧总耗时 = CPU 时间（GPU 在等 CPU 给命令）。表现为 CPU Usage 的 Timeline 色带总宽度接近帧预算，GPU Usage 的 GPU ms 远小于帧预算。GPU Bound：GPU 时间 > CPU 时间，帧总耗时 = GPU 时间（CPU 发完命令就等 GPU 画完）。表现为 GPU ms 接近帧预算，CPU Usage 的 CPU 总耗时远小于帧预算。判断方法：同时打开 CPU Usage 和 GPU Usage 模块，看谁的 ms 更大——大的那个就是当前瓶颈。优化错误的 Bound 类型（CPU Bound 时去改 GPU 设置）等于白干。",
    tags: ["CPU Bound", "GPU Bound", "帧耗时"],
  },
];
