import type { ReviewQuestion } from "./types";

export const GpgGpuComputingQuestions: ReviewQuestion[] = [
  {
    id: "gpg-gpu-computing-1",
    chapter: "gpg-gpu-computing",
    level: 1,
    question: "GPGPU 是什么？图形管线和通用计算管线有什么区别？",
    answer: "GPGPU 是把 GPU 用于非图形的通用并行计算。图形管线输入是几何输出是像素，必须经过顶点和光栅化；通用计算管线输入输出都是任意数据缓冲，由线程组直接处理，无光栅化约束。",
    tags: ["GPGPU", "管线"],
  },
  {
    id: "gpg-gpu-computing-2",
    chapter: "gpg-gpu-computing",
    level: 2,
    question: "SIMT 模型是什么？为什么 GPU 适合数据并行而非任务并行？",
    answer: "SIMT 是单指令多线程，一条指令同时驱动一组线程（warp）。数据并行（同代码处理不同数据）天然符合此模型；任务并行（不同线程做不同事）导致 warp 内分支发散，GPU 串行执行所有分支效率大降。",
    tags: ["SIMT", "数据并行"],
  },
  {
    id: "gpg-gpu-computing-3",
    chapter: "gpg-gpu-computing",
    level: 3,
    question: "GPU 的共享内存为什么能大幅提升计算性能？在图像卷积中如何使用？",
    answer: "共享内存是片上缓存，带宽比全局显存高 10-100 倍。图像卷积时多个线程需访问重叠邻域，先协作从全局内存加载到共享内存，再从共享内存读取计算，避免重复全局访问。这就是 GPU 编程的「分块」优化。",
    tags: ["共享内存", "分块", "卷积"],
  },
  {
    id: "gpg-gpu-computing-4",
    chapter: "gpg-gpu-computing",
    level: 4,
    question: "分支发散问题是什么？如何用数学函数替代 if-else 来避免它？",
    answer: "同一 warp 内线程因条件分支走不同路径，GPU 串行执行所有分支导致性能减半。替代方法：用 step(a,b) 返回 0/1 替代 if；用 mix(a,b,t) 替代条件赋值；用 clamp/saturate 替代范围判断。把分支转化为数学运算让所有线程执行相同指令。",
    tags: ["分支发散", "warp", "优化"],
  },
];
