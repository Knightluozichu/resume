/** 复习题库 · 合批的收益（ugo-benefits-of-batching）。Unity Game Optimization Ch3 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoBenefitsOfBatchingQuestions: ReviewQuestion[] = [
  {
    id: "ugo-bob-1",
    chapter: "ugo-benefits-of-batching",
    level: 1,
    question: "Draw Call、Batches、SetPass 分别表示什么？",
    answer:
      "Draw Call 是 CPU 向 GPU 发出的一次绘制指令（网格+材质+Pass）。Batches 是合批后的提交组数，通常 ≤ Draw Calls。SetPass Calls 是着色器 Pass 切换次数，材质/关键字越碎越高。三者都在 Profiler → Rendering 模块可见。",
    tags: ["Draw Call", "Batches", "SetPass"],
  },
  {
    id: "ugo-bob-2",
    chapter: "ugo-benefits-of-batching",
    level: 1,
    question: "为什么「物体很多但模型简单」时，帧率仍可能因 CPU 而掉？",
    answer:
      "每个物体可能单独提交 Draw Call，CPU 在渲染线程上反复下发命令、切换状态，固定开销累积。GPU 绘制本身可能不重，但 CPU 提交成为瓶颈——合批的目的就是减少这类 CPU 开销。",
    tags: ["CPU bound", "合批"],
  },
  {
    id: "ugo-bob-3",
    chapter: "ugo-benefits-of-batching",
    level: 1,
    question: "Profiler 里 Batches 几乎等于 Draw Calls 说明什么？",
    answer:
      "说明合批几乎没有生效，每个（或绝大多数）Draw Call 都单独成批。应检查材质是否一致、是否标记 Static、是否启用 Instancing/SRP Batcher，并用 Frame Debugger 查具体打断原因。",
    tags: ["Batches", "Profiler"],
  },
  {
    id: "ugo-bob-4",
    chapter: "ugo-benefits-of-batching",
    level: 2,
    question: "Dynamic Batching 需要满足哪些主要条件？",
    answer:
      "同材质（含相同 Shader 与关键字）、网格顶点数低于平台阈值（常见约 300–900）、单 Pass 材质、非蒙皮网格、缩放一致等。任一不满足都会打断动态合批。",
    tags: ["Dynamic Batching"],
  },
  {
    id: "ugo-bob-5",
    chapter: "ugo-benefits-of-batching",
    level: 2,
    question: "Dynamic Batching 的主要代价是什么？为什么移动平台常弱化或关闭？",
    answer:
      "代价是 CPU 在运行时复制/合并顶点缓冲，每帧可能有额外 CPU 工作。若合并开销大于省下的 Draw Call，反而更慢。移动平台顶点限制更严、CPU 更宝贵，因此默认常关闭或限制更严。",
    tags: ["Dynamic Batching", "移动平台"],
  },
  {
    id: "ugo-bob-6",
    chapter: "ugo-benefits-of-batching",
    level: 2,
    question: "Static Batching 如何启用？适合什么物体？有什么限制？",
    answer:
      "在 Inspector 勾选 Static（含 Batching Static）。适合永不移动的场景几何：建筑、装饰、地形道具。限制：构建期合并占额外内存；物体不能再移动，移动会打断合批并触发重建。",
    tags: ["Static Batching", "Static"],
  },
  {
    id: "ugo-bob-7",
    chapter: "ugo-benefits-of-batching",
    level: 2,
    question: "GPU Instancing 与 SRP Batcher 分别解决什么问题？",
    answer:
      "GPU Instancing：相同网格+相同材质的多份实例，一次 draw（instanceCount=N），适合草、子弹、相同 Prefab 海。SRP Batcher：URP/HDRP 下兼容 Shader 的批量提交，不同材质参数但同变体时可减少 SetPass，适合大量 URP Lit 物体。",
    tags: ["Instancing", "SRP Batcher"],
  },
  {
    id: "ugo-bob-8",
    chapter: "ugo-benefits-of-batching",
    level: 3,
    question: "如何用 Frame Debugger 验证合批是否生效？",
    answer:
      "Window → Analysis → Frame Debugger → Enable，查看 Event List。合批成功时多个 Draw 归入同一 Batch（如 Static Batched、SRP Batch、Instanced）；未合批则每物体单独 Draw。对比优化前后 Batches/SetPass 与列表结构。",
    tags: ["Frame Debugger", "验证"],
  },
  {
    id: "ugo-bob-9",
    chapter: "ugo-benefits-of-batching",
    level: 3,
    question: "SetPass Calls 很高时，优先查什么？合批一定能降低 SetPass 吗？",
    answer:
      "优先查材质/Shader 种类是否过碎、自定义 Shader 是否兼容 SRP Batcher、多 Pass 材质是否过多。合批主要降 Batches/Draw Calls；SetPass 需靠 SRP Batcher、合并材质图集、减少 Shader 变体/关键字来降，Dynamic/Static Batching 不直接解决 Pass 切换。",
    tags: ["SetPass", "SRP Batcher"],
  },
  {
    id: "ugo-bob-10",
    chapter: "ugo-benefits-of-batching",
    level: 3,
    question: "100 个会动的小敌人，同 Prefab 同材质，应优先考虑 Static Batching 还是 GPU Instancing？为什么？",
    answer:
      "应优先 GPU Instancing（材质勾选 Enable GPU Instancing，Shader 支持）。Static Batching 要求物体不移动，移动 Static 物体会打断合批；会动的相同实例正是 Instancing 的典型场景。",
    tags: ["Instancing", "Static Batching"],
  },
  {
    id: "ugo-bob-11",
    chapter: "ugo-benefits-of-batching",
    level: 2,
    question: "Skinned Mesh（蒙皮网格）为什么通常不参与 Dynamic Batching？",
    answer:
      "蒙皮网格每帧顶点在 CPU/GPU 上由骨骼变形，顶点位置动态变化，难以与其他静态顶点缓冲在运行时安全合并。角色等多用 GPU Instancing（仅相同静态网格）或减少 Draw Call 的其他手段（LOD、合并材质等）。",
    tags: ["Dynamic Batching", "Skinned Mesh"],
  },
];
