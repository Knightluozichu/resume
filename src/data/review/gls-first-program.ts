import type { ReviewQuestion } from "./types";

export const glsFirstProgramQuestions: ReviewQuestion[] = [
  {
    id: "gls-first-program-1",
    chapter: "gls-first-program",
    level: 1,
    question: "第一个OpenGL程序需要哪些步骤？",
    answer: "1)GLFW初始化创建窗口 2)GLAD加载函数 3)编译链接着色器 4)创建VBO/VAO上传顶点 5)渲染循环(清空→绘制→交换缓冲)。",
    tags: ["第一个程序"],
  },
  {
    id: "gls-first-program-2",
    chapter: "gls-first-program",
    level: 2,
    question: "渲染循环的基本结构？",
    answer: "while(!glfwWindowShouldClose) { 处理输入→清空缓冲→glUseProgram→绑定VAO→glDrawArrays→glfwSwapBuffers→glfwPollEvents }",
    tags: ["渲染循环"],
  },
  {
    id: "gls-first-program-3",
    chapter: "gls-first-program",
    level: 3,
    question: "第一个三角形需要多少顶点？",
    answer: "3个顶点(一个三角形)。每个顶点至少3个float(x,y,z)。VBO存储9个float，VAO配置属性(3分量float)，glDrawArrays(GL_TRIANGLES,0,3)绘制。",
    tags: ["三角形"],
  },
  {
    id: "gls-first-program-4",
    chapter: "gls-first-program",
    level: 4,
    question: "第一个程序常见问题有哪些？",
    answer: "1)着色器编译失败(检查InfoLog) 2)VAO未绑定(看不到图形) 3)视口未设置(渲染区域错误) 4)深度测试未启用(3D遮挡错误) 5)前后缓冲未交换(白屏)。逐步排查。",
    tags: ["常见问题", "调试"],
  },
];
