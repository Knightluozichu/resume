import type { ReviewQuestion } from "./types";

export const glrModernOpenglQuestions: ReviewQuestion[] = [
  {
    id: "glr-modern-opengl-1",
    chapter: "glr-modern-opengl",
    level: 1,
    question: `什么是实例化渲染(Instancing)？`,
    answer: `用一次Draw Call绘制多个相同网格的实例。每个实例有不同属性(位置、颜色等)通过gl_InstanceID或实例属性数组访问。适合树木、草地、粒子。`,
    tags: ["实例化"],
  },
  {
    id: "glr-modern-opengl-2",
    chapter: "glr-modern-opengl",
    level: 2,
    question: `间接绘制(Indirect Draw)有什么优势？`,
    answer: `Draw Call参数存GPU缓冲区，CPU不参与。glMultiDrawElementsIndirect一次调用多个绘制命令。减少CPU-GPU通信，支持GPU端剔除。`,
    tags: ["间接绘制"],
  },
  {
    id: "glr-modern-opengl-3",
    chapter: "glr-modern-opengl",
    level: 3,
    question: `DSA(Direct State Access)是什么？`,
    answer: `OpenGL 4.5引入，允许直接操作对象状态而无需先绑定。如glNamedBufferStorage替代glBindBuffer+glBufferData。代码更清晰减少绑定开销。`,
    tags: ["DSA"],
  },
  {
    id: "glr-modern-opengl-4",
    chapter: "glr-modern-opengl",
    level: 4,
    question: `现代OpenGL性能优化有哪些关键策略？`,
    answer: `1)实例化减少Draw Call 2)合批(Mesh合并) 3)间接绘制减少CPU-GPU通信 4)持久映射(Persistent Mapping)零拷贝更新 5)SPIRV预编译着色器 6)Multi-Draw合批 7)GPU端剔除。`,
    tags: ["性能优化", "现代OpenGL"],
  },
];
