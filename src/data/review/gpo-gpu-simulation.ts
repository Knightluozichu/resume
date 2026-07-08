import type { ReviewQuestion } from "./types";

export const gpoGpuSimulationQuestions: ReviewQuestion[] = [
  {
    id: "gpo-gpu-simulation-1",
    chapter: "gpo-gpu-simulation",
    level: 1,
    question: "GPU 模拟的数据流是什么？",
    answer: "Compute Shader 更新结构化缓冲（Position/Velocity/Lifetime）→ Append/Consume Buffer 管理粒子生命周期（发射/死亡）→ Vertex Shader 读取缓冲 → DrawProcedural 渲染。数据始终在 GPU 显存，不回读 CPU。",
    tags: ["GPU模拟", "数据流"],
  },
  {
    id: "gpo-gpu-simulation-2",
    chapter: "gpo-gpu-simulation",
    level: 2,
    question: "为什么 GPU 模拟数据不回读 CPU？",
    answer: "GPU→CPU 回读（GetData/Map）会强制 GPU 等待（Pipeline Stall），破坏 CPU/GPU 并行流水线。回读数据量大时带宽成为瓶颈。大多数模拟状态不需要 CPU 知晓。需要 CPU 交互时用间接绘制（Indirect Draw）——GPU 写入 Draw Call 参数，CPU 不需读取，保持流水线并行。",
    tags: ["回读", "Pipeline Stall", "Indirect Draw"],
  },
  {
    id: "gpo-gpu-simulation-3",
    chapter: "gpo-gpu-simulation",
    level: 3,
    question: "SPH 和 Eulerian 流体模拟的区别是什么？各适合什么场景？",
    answer: "SPH（拉格朗日）：每粒子携带流体属性，逐粒子计算邻居贡献。无网格、自然处理自由表面（飞溅/水滴），但邻居搜索开销大（需空间哈希）。适合飞溅水滴效果。Eulerian（欧拉）：固定 3D 网格存密度/速度场，在网格上求解 Navier-Stokes。易并行（规则网格）但需处理对流项和界面追踪。适合大面积水体烟雾。",
    tags: ["SPH", "Eulerian", "流体模拟"],
  },
  {
    id: "gpo-gpu-simulation-4",
    chapter: "gpo-gpu-simulation",
    level: 4,
    question: "Append/Consume Buffer 如何管理 GPU 粒子的生命周期？",
    answer: "AppendStructuredBuffer 维护一个空闲索引栈。粒子死亡时 Append 其索引到 DeadList（回收）。粒子发射时 Consume 从 DeadList 取一个空闲索引（复用）。这样无需遍历整个粒子数组寻找空位——O(1) 的发射/死亡操作。发射数量通过原子计数器（InterlockedAdd）控制，写入 Indirect Draw 参数驱动渲染。整个生命周期管理在 GPU 端完成，CPU 只需设置最大粒子数和每帧发射数。",
    tags: ["Append/Consume", "粒子生命周期", "GPU粒子"],
  },
];
