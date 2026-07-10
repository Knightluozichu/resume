import type { ReviewQuestion } from "./types";

/** Unity Shader 入门精要全书学习地图 复习题 */
export const useLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "use-learning-map-1",
    chapter: "use-learning-map",
    level: 1,
    question: `Unity Shader 全书分为哪四大板块？`,
    answer: `基础管线（渲染流程/数学基础）、ShaderLab语法（Properties/SubShader/Pass）、光照与效果（光照模型/透明/深度纹理）、高级技术（后处理/程序化纹理/噪声）。`,
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "use-learning-map-2",
    chapter: "use-learning-map",
    level: 2,
    question: `为什么四大板块要按「基础->语法->光照->高级」的顺序学习？`,
    answer: `递进依赖：基础管线提供架构认知（理解Shader运行环境），ShaderLab语法是编写工具（如何写Shader），光照与效果是核心内容（最常用的Shader技术），高级技术是进阶应用（需要前三层基础）。跳过任何一层都会断裂。`,
    tags: ["学习路径", "递进"],
  },
  {
    id: "use-learning-map-3",
    chapter: "use-learning-map",
    level: 3,
    question: `Shader是并行程序意味着什么？对编程有什么影响？`,
    answer: `GPU同时处理数千顶点/像素，每个独立执行。影响：1)不能依赖其他顶点/像素结果（无全局通信）；2)分支效率低（需同时执行所有分支）；3)数据局部性重要（相邻像素缓存友好）。思维从串行转为数据并行。`,
    tags: ["并行", "GPU"],
  },
  {
    id: "use-learning-map-4",
    chapter: "use-learning-map",
    level: 4,
    question: `对比Unity Shader与OpenGL原生Shader的异同，分析Unity Shader的抽象层次。`,
    answer: `相同：底层都是GPU上的顶点/片元程序，用Cg/HLSL编写。不同：Unity Shader用ShaderLab封装——Properties声明暴露到材质面板，SubShader支持多平台回退，Pass管理渲染通道，Tags控制渲染顺序，Unity提供内置变量和宏(UnityObjectToClipPos等)简化跨平台。Unity Shader的抽象层次更高——开发者不需管理shader编译链接、多平台GLSL/HLSL差异、材质参数序列化，专注写渲染逻辑。代价是灵活性降低（如难以做compute shader的多dispatch调度）。`,
    tags: ["对比", "抽象层次", "综合"],
  },
];