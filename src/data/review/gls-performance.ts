import type { ReviewQuestion } from "./types";

export const glsPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "gls-performance-1",
    chapter: "gls-performance",
    level: 1,
    question: `如何定位渲染瓶颈？`,
    answer: `1)GPU时间查询(GL_TIME_ELAPSED) 2)遮挡查询统计 3)NVIDIA Nsight/AMD GPA分析 4)简化法:去掉着色器看几何瓶颈，去掉几何看着色器瓶颈。瓶颈在CPU(Draw Call)还是GPU(着色/带宽)。`,
    tags: ["瓶颈定位"],
  },
  {
    id: "gls-performance-2",
    chapter: "gls-performance",
    level: 2,
    question: `减少Draw Call的方法？`,
    answer: `1)实例化(相同网格一次Draw Call) 2)合批(合并网格) 3)间接绘制(参数在GPU) 4)Multi-Draw(一次调用多次绘制) 5)纹理图集减少材质切换。目标是让GPU而非CPU成为瓶颈。`,
    tags: ["Draw Call", "实例化"],
  },
  {
    id: "gls-performance-3",
    chapter: "gls-performance",
    level: 3,
    question: `如何减少GPU带宽？`,
    answer: `1)纹理压缩(BC/ASTC) 2)顶点格式压缩(UNORM16) 3)Mipmap减少远处纹素读取 4)Z-Prepass减少片段着色 5)延迟着色多光源 6)帧缓冲压缩(硬件)。带宽是移动端最大瓶颈。`,
    tags: ["带宽优化"],
  },
  {
    id: "gls-performance-4",
    chapter: "gls-performance",
    level: 4,
    question: `Compute Shader与图形管线的协作？`,
    answer: `Compute Shader独立于管线，用于GPU通用计算:1)粒子更新(写入SSBO) 2)GPU剔除(写入Indirect Draw参数) 3)图像处理(后处理) 4)光线追踪加速结构构建。结果通过SSBO/Image与图形管线共享。`,
    tags: ["Compute Shader", "GPU计算"],
  },
];
