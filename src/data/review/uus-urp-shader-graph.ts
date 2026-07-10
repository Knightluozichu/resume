import type { ReviewQuestion } from "./types";

export const uusUrpShaderGraphQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-shader-graph-1",
    chapter: "uus-urp-shader-graph",
    level: 1,
    question: `Shader Graph 的节点工作流是什么？数据如何流动？`,
    answer: `工作流：输入节点（Property/Texture）→ 处理节点（Multiply/Lerp/Sample Texture 等数学与纹理节点）→ 主节点（Vertex/Fragment 输出）。数据从左到右流动：左侧节点产生数据，经中间节点处理，最终连到右侧主节点的输出端口。`,
    tags: ["Shader Graph", "节点工作流"],
  },
  {
    id: "uus-urp-shader-graph-2",
    chapter: "uus-urp-shader-graph",
    level: 2,
    question: `Property、Sub Graph 和 Master Node 各自的用途是什么？`,
    answer: `Property 是外部参数（Color/Float/Vector/Texture），对应 ShaderLab Properties，可在材质面板调节。Sub Graph 是可复用子图，类似函数封装，可跨多个 Shader Graph 调用，提高复用性。Master Node 是输出节点，决定 Vertex 和 Fragment 的最终输出值（BaseColor/Normal/Emission 等）。`,
    tags: ["Property", "Sub Graph", "Master Node"],
  },
  {
    id: "uus-urp-shader-graph-3",
    chapter: "uus-urp-shader-graph",
    level: 3,
    question: `Shader Graph 如何编译为 HLSL？生成的代码结构与手写有何不同？`,
    answer: `Shader Graph 将节点图序列化为 Graph Data（.shadergraph），编译器遍历节点图生成 HLSL 代码，包装在 ShaderLab 的 .shader 文件中。生成的代码包含 CBUFFER 声明、纹理声明、vert/frag 函数。与手写不同：生成的代码可能包含冗余计算（未优化的节点连接）、变量名自动生成（不直观），但 CBUFFER 结构符合 SRP Batcher 规范。`,
    tags: ["编译流程", "HLSL"],
  },
  {
    id: "uus-urp-shader-graph-4",
    chapter: "uus-urp-shader-graph",
    level: 4,
    question: `什么时候该用 Shader Graph，什么时候该手写 HLSL？给出决策依据。`,
    answer: `用 Shader Graph：快速原型开发、简单到中等复杂度效果（颜色混合、纹理变换、简单光照修改）、团队中非程序员参与 Shader 制作。手写 HLSL：性能敏感的 Shader（需精确控制指令数和寄存器）、复杂循环/分支逻辑、自定义 Render Pass 着色器、需深度优化变体数量的场景。决策依据：先用 Shader Graph 做原型验证效果，确认后手写 HLSL 优化性能和变体。`,
    tags: ["Shader Graph", "HLSL", "决策"],
  },
];
