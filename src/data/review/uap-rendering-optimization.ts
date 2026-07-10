import type { ReviewQuestion } from "./types";

export const uapRenderingOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "uap-rendering-optimization-1",
    chapter: "uap-rendering-optimization",
    level: 1,
    question: `DrawCall 过多为什么会卡？瓶颈在 CPU 还是 GPU？`,
    answer: `瓶颈在 CPU。每个 DrawCall 都要 CPU 设置材质、shader、纹理、变换矩阵然后提交给 GPU，这个「提交开销」很贵。DrawCall 越多 CPU 越忙，GPU 反而闲着等命令。渲染优化的核心就是减少 DrawCall 数量，让 CPU 少提交、GPU 批量画。健康线：500 以下，1000 警惕，2000 以上必卡。`,
    tags: ["DrawCall", "CPU瓶颈", "渲染"],
  },
  {
    id: "uap-rendering-optimization-2",
    chapter: "uap-rendering-optimization",
    level: 2,
    question: `SRP Batcher、动态批处理、GPU Instancing 三者有什么区别？能同时生效吗？`,
    answer: `SRP Batcher 不减 DrawCall 数，而是按 shader 分组缓存材质参数，减少每个 DrawCall 的 CPU 设置开销（URP 专属）。动态批处理是 CPU 把小物体（<300 顶点）顶点合并成大网格提交，减少 DrawCall 数。GPU Instancing 是 GPU 端用同一材质渲染多实例，一次 DrawCall 画大量相同物体。优先级：GPU Instancing > SRP Batcher > 动态批处理，可叠加。静态批处理是编辑期合并，与运行时方案互斥。`,
    tags: ["批处理", "SRP Batcher", "GPU Instancing"],
  },
  {
    id: "uap-rendering-optimization-3",
    chapter: "uap-rendering-optimization",
    level: 3,
    question: `开了 GPU Instancing 但 DrawCall 没合，原因是什么？怎么修？`,
    answer: `GPU Instancing 要求所有实例用相同的材质实例（不是相同 shader）和相同 shader。如果每个物体改了材质属性（如 \`material.color = ...\`），会创建新材质实例，Instancing 失效。修法：用 MaterialPropertyBlock 修改单个物体属性，不创建新材质实例——\`renderer.SetPropertyBlock(block)\`。或用 Graphics.DrawMeshInstanced 直接批量提交，完全绕过材质实例问题。shader 也需 \`#pragma multi_compile_instancing\`。`,
    tags: ["GPU Instancing", "材质实例", "MaterialPropertyBlock"],
  },
  {
    id: "uap-rendering-optimization-4",
    chapter: "uap-rendering-optimization",
    level: 4,
    question: `一个城市场景 DrawCall 2000+，请给出系统性优化方案。`,
    answer: `1）数 DrawCall：Frame Debugger 分析，分类哪些是可批处理的；2）静止建筑：标记 Static 走静态批处理，编辑期合并网格；3）大量重复物体（路灯、植被）：开 GPU Instancing + MaterialPropertyBlock 变化属性；4）URP 项目：确认 SRP Batcher 开启，shader 用 CBUFFER 兼容；5）远景：配 LOD 组，远处切低模降顶点；6）遮挡：烘焙遮挡剔除，被建筑挡住的物体不渲染；7）合并材质：相同 shader 的材质用图集合并纹理，减少材质切换。目标：DrawCall 降到 500 以下，CPU 渲染耗时 < 5ms。`,
    tags: ["渲染优化", "综合", "DrawCall"],
  },
];
