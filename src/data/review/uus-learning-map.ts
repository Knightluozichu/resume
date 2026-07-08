import type { ReviewQuestion } from "./types";

export const uusLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uus-learning-map-1",
    chapter: "uus-learning-map",
    level: 1,
    question: "URP 的全称是什么？它的核心设计目标是什么？",
    answer: "URP 全称 Universal Render Pipeline（通用渲染管线）。核心设计目标是兼顾跨平台兼容性与渲染可定制性——在 PC、移动端、主机等多平台统一渲染方案，同时通过 SRP 框架允许开发者自定义管线。",
    tags: ["URP", "渲染管线"],
  },
  {
    id: "uus-learning-map-2",
    chapter: "uus-learning-map",
    level: 2,
    question: "全书四大板块是什么？它们之间是什么递进关系？",
    answer: "四大板块：基础架构（URP/Shader Graph）、材质与光照（Lit/Unlit/光照）、高级效果（阴影/后处理/自定义 Pass）、工程优化（性能调优）。递进关系：基础架构提供管线认知和着色器编辑能力 → 材质与光照实现视觉真实感 → 高级效果拓展渲染表现力 → 工程优化确保高效运行。",
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "uus-learning-map-3",
    chapter: "uus-learning-map",
    level: 3,
    question: "为什么说「SRP 是骨架，Shader 是皮肤，光照是灵魂」？三者缺一会怎样？",
    answer: "SRP 定义渲染管线的组织方式（Pass 顺序、RT 分配、Feature 注入），是骨架。Shader 定义物体表面的视觉表现（颜色、纹理、透明度），是皮肤。光照决定物体的明暗、质感和空间关系，是灵魂。缺 SRP 则管线无法组织，缺 Shader 则物体不可见，缺光照则 PBR 材质只是一片纯色，无真实感。",
    tags: ["SRP", "Shader", "光照"],
  },
  {
    id: "uus-learning-map-4",
    chapter: "uus-learning-map",
    level: 4,
    question: "如果要用「一帧的渲染流程」串联全书知识点，你会怎么描述？",
    answer: "SRP Core 调度 Render() → Shadow Pass 渲染 Shadow Map（CSM 级联）→ Opaque Pass 渲染不透明物体（Lit 执行 PBR BRDF + GI + Shadow，Unlit 直通输出）→ Depth/Normal Pass 辅助纹理 → Transparent Pass 半透明物体 → Post Processing（Bloom → 调色 → Tone Mapping）→ 输出。每个步骤对应全书一个模块，串联了管线架构、Shader、光照、阴影、后处理全链路。",
    tags: ["渲染流程", "知识串联"],
  },
];
