/** 复习题库 · 动态图形（ugo-dynamic-graphics）。Unity Game Optimization Ch6 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoDynamicGraphicsQuestions: ReviewQuestion[] = [
  {
    id: "ugo-dg-1",
    chapter: "ugo-dynamic-graphics",
    level: 1,
    question: "Profiler 显示 GPU bound 时，应优先查看哪三类 GPU 热点？",
    answer:
      "Vertex/几何（Tris、Vertices 高）、Fragment/Fill（Overdraw、透明叠层）、Post-processing（Bloom/DOF 等全屏 Pass）。用 Frame Debugger 看 Pass 占时，Stats 看 Tris 与 Overdraw，再对症 LOD、粒子或 Volume。",
    tags: ["GPU bound", "Profiler"],
  },
  {
    id: "ugo-dg-2",
    chapter: "ugo-dynamic-graphics",
    level: 1,
    question: "LOD Group 的作用是什么？",
    answer:
      "按与相机距离自动切换不同精度网格：近处 LOD0 高精度，远处 LOD1/LOD2 降面，超出最大距离可 Culled 完全不渲染，降低 Vertex 与 Raster 成本。",
    tags: ["LOD", "LOD Group"],
  },
  {
    id: "ugo-dg-3",
    chapter: "ugo-dynamic-graphics",
    level: 1,
    question: "Frustum Culling 与 Occlusion Culling 有何区别？",
    answer:
      "Frustum：视锥外的物体不绘制，引擎默认。Occlusion：视锥内但被静态遮挡物完全挡住的物体也不绘制，需烘焙 Occlusion 数据并标记 Occluder/Occludee。",
    tags: ["Occlusion", "Frustum"],
  },
  {
    id: "ugo-dg-4",
    chapter: "ugo-dynamic-graphics",
    level: 2,
    question: "Stats 里 Tris 随镜头拉远几乎不变，说明什么？应如何优化？",
    answer:
      "说明远景仍提交高面数网格，LOD 未生效或未配置多级网格。应为重复场景物体添加 LOD Group，各级绑定不同面数 Renderer，设置合理切换距离或 Screen Relative Height，并用 LOD Visualization 验证。",
    tags: ["LOD", "Tris"],
  },
  {
    id: "ugo-dg-5",
    chapter: "ugo-dynamic-graphics",
    level: 2,
    question: "Occlusion Culling 适合什么场景？启用前需做什么？",
    answer:
      "适合室内、走廊、城市峡谷等静态遮挡丰富场景；开放平原收益小。需在 Window → Rendering → Occlusion Culling 烘焙数据，Occluder 墙体标 Static，Occludee 写入剔除单元，并用 Visualization 验证。",
    tags: ["Occlusion Culling"],
  },
  {
    id: "ugo-dg-6",
    chapter: "ugo-dynamic-graphics",
    level: 2,
    question: "后处理栈为何容易成为 GPU 瓶颈？",
    answer:
      "每个 Effect（Bloom、DOF、SSR 等）多为独立全屏 Pass，分辨率越高带宽越大；多 Effect 叠加无合批。优化靠减 Pass 数、降 Bloom 迭代/分辨率、按平台分级 Volume Profile，Profiler 逐项禁用对比。",
    tags: ["Post-processing", "Volume"],
  },
  {
    id: "ugo-dg-7",
    chapter: "ugo-dynamic-graphics",
    level: 2,
    question: "Bloom 通常比 Color Grading 更耗 GPU 的原因是什么？",
    answer:
      "Bloom 需提取亮区并进行多遍（乒乓）高斯模糊，产生 2N+1 次量级全屏采样；Color Grading 多为单次 LUT/曲线 Pass，相对轻量。",
    tags: ["Bloom", "Color Grading"],
  },
  {
    id: "ugo-dg-8",
    chapter: "ugo-dynamic-graphics",
    level: 3,
    question: "粒子系统造成 GPU 压力的主要机制有哪些？",
    answer:
      "大量 Billboard 半透明粒子导致 Overdraw；每 System/材质可能单独 Batch；Max Particles 与 Lifetime 决定同屏片元数。修法：限粒子数、合并 Atlas 材质、Mesh 粒子替代小 Billboard、Quality 分级减密度。",
    tags: ["Particle System", "Overdraw"],
  },
  {
    id: "ugo-dg-9",
    chapter: "ugo-dynamic-graphics",
    level: 3,
    question: "GPU ms 高时，建议的动态图形排查顺序是什么？",
    answer:
      "① 确认 GPU bound 与 Frame Debugger Pass 占时；② Stats/Tris → LOD；③ 室内转角 → Occlusion 烘焙与 Visualization；④ Post Volume 逐项关闭对比；⑤ Overdraw/Transparent → 粒子与 LineRenderer。避免未定位瓶颈就只关 Bloom。",
    tags: ["排查清单", "Profiler"],
  },
  {
    id: "ugo-dg-10",
    chapter: "ugo-dynamic-graphics",
    level: 3,
    question: "LOD Group 已加但拉远 Tris 不降，常见原因有哪些？",
    answer:
      "各级 LOD 绑了同一高精度网格；切换阈值/Screen Relative Height 设错使始终 LOD0；LOD Bias 全局偏高。修法：每级不同面数网格、LOD Visualization 看生效级别、调整距离或 Fade 减 pop。",
    tags: ["LOD Group", "Tris"],
  },
  {
    id: "ugo-dg-11",
    chapter: "ugo-dynamic-graphics",
    level: 2,
    question: "LineRenderer 在性能上应注意什么？",
    answer:
      "positionCount 与分段数直接决定顶点数，每帧 SetPosition 全数组更新贵。静态轨迹改 Mesh 或贴图；动态轨迹限制更新频率、减少点数，避免与大量透明粒子叠加造成 Fragment bound。",
    tags: ["LineRenderer"],
  },
];
