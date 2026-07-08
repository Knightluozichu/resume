import type { ReviewQuestion } from "./types";

export const sxxPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "sxx-performance-1",
    chapter: "sxx-performance",
    level: 1,
    question: "什么是 warp 分支发散？它为什么降低 GPU 性能？",
    answer: "GPU 以 warp（NVIDIA 32线程/AMD 64线程）为单位锁步执行——同一warp内所有线程在同一时钟执行相同指令。当 if 条件使 warp 内不同线程走不同分支时，GPU 无法同时执行两个分支，只能串行化：先执行true分支（false线程闲置），再执行false分支（true线程闲置）。50%线程始终等待，有效吞吐量减半。动态分支（条件逐像素不同）是性能杀手。",
    tags: ["warp发散", "SIMD", "分支"],
  },
  {
    id: "sxx-performance-2",
    chapter: "sxx-performance",
    level: 2,
    question: "Shader 性能优化的 ALU 指令优化有哪些具体技巧？",
    answer: "1) 用 mad(a,b,c) 代替 mul+add 两条指令——mad是单条复合指令；2) 用 rsqrt + 乘法代替 1/sqrt——GPU有硬件rsqrt指令；3) 用 x*x 代替 pow(x,2)——乘法比通用幂函数快；4) 用 dot/cross 代替手动分量运算——内建函数有硬件优化；5) 用 lerp 代替手动插值——编译器可能生成更优指令；6) 规范化只用一次——normalize 后复用结果而非重复计算。",
    tags: ["ALU优化", "mad", "rsqrt"],
  },
  {
    id: "sxx-performance-3",
    chapter: "sxx-performance",
    level: 3,
    question: "uniform 分支和 dynamic 分支在 GPU 上的性能差异是什么？如何优化？",
    answer: "Uniform 分支（条件对所有线程相同，来自 constant buffer 如 if(useTexture)）在编译期或运行期由整个warp统一决策，无发散开销，完全安全可使用 if。Dynamic 分支（条件逐像素不同如 if(NdotL>0)）会导致warp发散——部分线程走true部分走false，GPU串行执行两个分支。优化dynamic分支：用 step/lerp/max 无分支替代，如 max(NdotL, 0) 代替 if(NdotL>0)，lerp(a, b, step(threshold, x)) 代替 if-else。不要过度消除uniform分支，会使代码可读性下降且收益为零。",
    tags: ["uniform分支", "dynamic分支", "无分支替代"],
  },
  {
    id: "sxx-performance-4",
    chapter: "sxx-performance",
    level: 4,
    question: "GPU 占用率与寄存器使用量的关系是什么？如何系统性地优化 Shader 性能？",
    answer: "GPU SM 有固定寄存器总量，寄存器/线程越少能并行的warp越多（占用率高），但占用率高不一定性能好——纯ALU计算无足够延迟可隐藏时低占用率也无所谓。关键是找到「够用的占用率」（通常50%+）。系统性优化方法：1) 用Profiler分析瓶颈类型——是ALU、带宽还是分支；2) 带宽优化收益最大——合并纹理为RGBA、使用BC/DXT压缩、启用Mipmap；3) 消除dynamic分支——用无分支替代避免warp发散；4) ALU优化——用mad/rsqrt/x*x等内建函数和手动优化；5) 寄存器优化——复用中间变量、控制循环展开策略（[loop]vs[unroll]）。不要盲目减少寄存器（如用纹理查找代替中间变量），可能因增加带宽而降低性能。先解决最大瓶颈再优化细节。",
    tags: ["占用率", "寄存器", "系统性优化"],
  },
];
