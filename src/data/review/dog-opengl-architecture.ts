import type { ReviewQuestion } from "./types";

/** OpenGL 架构与状态机 复习题 */
export const dogOpenglArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "dog-opengl-architecture-1",
    chapter: "dog-opengl-architecture",
    level: 1,
    question: `渲染上下文的作用是什么？VBO、EBO、VAO 分别存什么？`,
    answer: `渲染上下文承载所有 OpenGL 状态与资源，是工作的前提。VBO 存顶点属性数据（位置/法线/UV），EBO 存索引数组用于复用顶点，VAO 记录「从哪个 VBO 读、属性怎么解析、用哪个 EBO」的配置。`,
    tags: ["上下文", "缓冲对象"],
  },
  {
    id: "dog-opengl-architecture-2",
    chapter: "dog-opengl-architecture",
    level: 2,
    question: `为什么绘制时只需绑定 VAO？它捕获了哪些信息？`,
    answer: `VAO 在绑定时捕获了 VBO 的关联、vertexAttribPointer 的属性指针配置以及 EBO 的关联。绘制时绑一次 VAO 就恢复全部顶点配置，省去重复设属性指针，故只需 bindVertexArray + useProgram 即可绘制。`,
    tags: ["VAO", "捕获"],
  },
  {
    id: "dog-opengl-architecture-3",
    chapter: "dog-opengl-architecture",
    level: 3,
    question: `绑定 VBO/EBO/设属性指针的顺序为什么关键？顺序错会怎样？`,
    answer: `这些操作必须在 VAO 处于绑定时进行，VAO 才会捕获关联。若先绑 VBO 再绑 VAO，或设属性指针时 VAO 未绑定，VAO 不会记录该配置，绘制时拿不到顶点数据。正确顺序：bindVertexArray → bindBuffer(ARRAY) → vertexAttribPointer → bindBuffer(ELEMENT)。`,
    tags: ["绑定顺序", "状态机"],
  },
  {
    id: "dog-opengl-architecture-4",
    chapter: "dog-opengl-architecture",
    level: 4,
    question: `为什么 OpenGL 里 bind 操作如此频繁？这反映什么编程模型？有哪些隐患？`,
    answer: `bind 把对象设为「当前操作对象」，后续操作都作用于它，反映状态机模型——不靠参数传对象而靠当前绑定决定目标，故每次换对象都要 bind。隐患是状态在帧间持续生效，忘记重设会沿用上次状态导致泄漏或绘制错对象；对策是每帧显式设定所需状态、必要时用对象标签/解绑，或采用 DSA（直接状态访问）减少隐式绑定依赖。`,
    tags: ["综合", "状态机", "状态泄漏"],
  },
];
