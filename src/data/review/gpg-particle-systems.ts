import type { ReviewQuestion } from "./types";

export const GpgParticleSystemsQuestions: ReviewQuestion[] = [
  {
    id: "gpg-particle-systems-1",
    chapter: "gpg-particle-systems",
    level: 1,
    question: "CPU 粒子和 GPU 粒子的主要性能差异是什么？",
    answer: "CPU 粒子每帧逐个计算后需把数据传回显存渲染，带宽瓶颈限制在约 1 万粒子。GPU 粒子数据全程在显存，着色器直接读写不回传，可达百万级。",
    tags: ["GPU粒子", "CPU粒子"],
  },
  {
    id: "gpg-particle-systems-2",
    chapter: "gpg-particle-systems",
    level: 2,
    question: "欧拉积分法更新粒子位置的公式是什么？为什么大步长时不稳定？",
    answer: "v_new = v + a * dt; p_new = p + v_new * dt。显式欧拉用当前状态外推，dt 大或速度高时误差累积导致能量发散——粒子越飞越远。半隐式欧拉或 Verlet 积分稳定性更好。",
    tags: ["欧拉积分", "稳定性"],
  },
  {
    id: "gpg-particle-systems-3",
    chapter: "gpg-particle-systems",
    level: 3,
    question: "为什么 GPU 粒子不需要数据回传？整个数据流是怎样的？",
    answer: "粒子位置速度等数据全程存储在显存缓冲中，Compute Shader 直接读写同一缓冲完成更新，顶点着色器再从该缓冲读取位置渲染。数据始终在 GPU 内流转，CPU 只初始化参数，运行时无任何回传，消除 PCIe 带宽瓶颈。",
    tags: ["GPU粒子", "数据流", "无回传"],
  },
  {
    id: "gpg-particle-systems-4",
    chapter: "gpg-particle-systems",
    level: 4,
    question: "设计一个包含发射、更新、渲染三阶段的 GPU 粒子系统，各阶段用什么技术？",
    answer: "发射阶段：CPU 或 Compute Shader 用原子计数器分配粒子槽位写入初始值。更新阶段：Compute Shader 并行执行物理积分（欧拉/Verlet），处理碰撞和寿命递减。渲染阶段：更新后的缓冲直接绑定为顶点源，顶点着色器变换到屏幕空间，可用 billboard 或 mesh 粒子渲染。三阶段全程在 GPU，无需回传。",
    tags: ["粒子系统", "设计", "三阶段"],
  },
];
