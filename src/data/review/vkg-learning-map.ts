import type { ReviewQuestion } from "./types";

/** Vulkan 学习指南 全书学习地图 复习题 */
export const vkgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "vkg-learning-map-1",
    chapter: "vkg-learning-map",
    level: 1,
    question: "Vulkan 程序的五大初始化步骤是什么？",
    answer: "1) 创建 Instance 初始化 Vulkan 库；2) 选物理设备并创建逻辑设备与队列；3) 创建交换链管理可呈现图像；4) 创建图形管线（着色器+固定状态）；5) 录制命令缓冲供反复提交。",
    tags: ["初始化步骤"],
  },
  {
    id: "vkg-learning-map-2",
    chapter: "vkg-learning-map",
    level: 2,
    question: "Vulkan 的「显式」体现在哪些方面？与 OpenGL 状态机模型有何不同？",
    answer: "显式体现在：无全局状态、对象显式创建；内存分配由应用管；同步（栅栏/信号量）由应用负责；命令预录制到命令缓冲再提交。OpenGL 是状态机，驱动隐式管理状态与同步、有全局当前上下文；Vulkan 把这些隐式行为全部暴露给应用，代码量大但可预测、无驱动隐式开销。",
    tags: ["显式 API", "对比"],
  },
  {
    id: "vkg-learning-map-3",
    chapter: "vkg-learning-map",
    level: 3,
    question: "阅读渲染循环：取图像、提交命令、等同步、呈现的顺序为什么不能乱？",
    answer: "Vulkan 无隐式同步，顺序必须显式保证：先 vkAcquireNextImageKHR 取到可用图像，才能在该图像上录制/提交命令；vkQueueSubmit 提交后需用栅栏/信号量等 GPU 画完，才能 vkQueuePresentKHR 呈现该图像。乱序会导致在未就绪图像上绘制、或呈现未画完的图像，出现撕裂或崩溃。",
    tags: ["渲染循环", "同步"],
  },
  {
    id: "vkg-learning-map-4",
    chapter: "vkg-learning-map",
    level: 4,
    question: "为什么 Vulkan 代码量大但性能高？什么时候该选 Vulkan 而非 OpenGL？",
    answer: "代码量大因为应用要显式做 OpenGL 里驱动偷做的事（选设备、分配内存、管同步、录命令、建管线）。性能高因无驱动隐式状态检查与同步开销，能精确控制资源生命周期与并行度，多线程录命令、预编译管线，CPU 开销低且行为可预测、跨平台一致。选 Vulkan 当：要极致性能、跨平台一致行为、团队能管理复杂度；快速原型或学图形学仍可从 OpenGL 开始。",
    tags: ["综合", "性能", "选型"],
  },
];
