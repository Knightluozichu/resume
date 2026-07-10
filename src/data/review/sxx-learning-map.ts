import type { ReviewQuestion } from "./types";

export const sxxLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "sxx-learning-map-1",
    chapter: "sxx-learning-map",
    level: 1,
    question: `ShaderX 系列的三个学习层次是什么？`,
    answer: `基础层（顶点/像素着色器、光照模型）、技术层（阴影、后处理、环境渲染）、高级层（程序化纹理、性能优化）。三层递进依赖，建议按顺序学习。`,
    tags: ["学习路径", "知识体系"],
  },
  {
    id: "sxx-learning-map-2",
    chapter: "sxx-learning-map",
    level: 2,
    question: `ShaderX 与普通着色器入门教材的区别是什么？`,
    answer: `ShaderX 是实战技巧合集而非入门教材，假设读者已有着色器基础。每章是独立的技巧文章，包含大量代码细节和参数调优经验，需要动手实践才能内化，不是纯理论书。`,
    tags: ["ShaderX", "学习定位"],
  },
  {
    id: "sxx-learning-map-3",
    chapter: "sxx-learning-map",
    level: 3,
    question: `为什么说 ShaderX 的三个学习层次是递进依赖关系？举例说明。`,
    answer: `基础层的着色器编程能力是技术层的工具：阴影需要顶点着色器做投影、后处理需要像素着色器采样；技术层的经验是高级层优化的前提：性能优化需要理解阴影和后处理的实现才能找到瓶颈。例如优化阴影性能必须先理解 PCF 的采样开销（技术层），而 PCF 又依赖顶点变换到光源空间（基础层）。`,
    tags: ["知识依赖", "递进关系"],
  },
  {
    id: "sxx-learning-map-4",
    chapter: "sxx-learning-map",
    level: 4,
    question: `如何制定一个高效的 ShaderX 学习计划？考虑时间分配和实践策略。`,
    answer: `建议分三阶段：1) 基础层4周——每周攻克一个主题（顶点变形/像素混合/光照模型），每个主题配合实际 Shader 代码实现；2) 技术层5周——阴影、后处理、环境各1-2周，整合到小型渲染项目中；3) 高级层3周——程序化纹理和性能优化各1.5周，用 Profiler 分析优化效果。关键原则：每章选1-2个技巧完整实现并运行，修改参数观察变化，尝试整合到自己的项目中。建议配合 Unity/Unreal 或 Shader Playground 实时调试，避免只读不练。`,
    tags: ["学习计划", "实践策略"],
  },
];
