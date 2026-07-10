import type { ReviewQuestion } from "./types";

export const sxxPixelShadersQuestions: ReviewQuestion[] = [
  {
    id: "sxx-pixel-shaders-1",
    chapter: "sxx-pixel-shaders",
    level: 1,
    question: `像素着色器的作用是什么？它与顶点着色器有什么数据流关系？`,
    answer: `像素着色器决定每个像素的最终颜色，是渲染管线的最终可编程阶段。数据流关系：顶点着色器输出 varying 变量（如法线、UV），光栅化器在三角形内部线性插值这些变量，像素着色器接收插值后的数据，结合纹理采样和光照计算输出最终颜色。`,
    tags: ["像素着色器", "数据流"],
  },
  {
    id: "sxx-pixel-shaders-2",
    chapter: "sxx-pixel-shaders",
    level: 2,
    question: `纹理混合有哪些常见模式？各自适用于什么场景？`,
    answer: `常见模式：1) lerp 线性插值——按权重混合，适用于地形过渡（草地到岩石）；2) 乘法——颜色相乘，适用于细节纹理叠加；3) 加法——颜色相加，适用于发光效果；4) 遮罩——用某通道作权重，适用于局部效果控制。选择依据：线性插值适合过渡，乘法适合增强细节，加法适合光效，遮罩适合精确控制区域。`,
    tags: ["纹理混合", "lerp", "遮罩"],
  },
  {
    id: "sxx-pixel-shaders-3",
    chapter: "sxx-pixel-shaders",
    level: 3,
    question: `为什么光照计算必须在线性空间进行？在 sRGB 空间计算会出什么问题？`,
    answer: `光照是物理过程，颜色在线性空间按能量叠加。sRGB 是非线性编码（近似 gamma 2.2），在 sRGB 空间做光照会导致：1) 混合结果偏暗——sRGB 编码使中间值被压低，两色平均后比线性空间暗；2) 高光位置偏移——光照衰减在非线性空间变形；3) 抗锯齿失真——边缘像素在非线性空间混合产生错误亮度。正确流程：采样时 sRGB 转线性，光照在线性空间计算，输出时转回 sRGB。`,
    tags: ["sRGB", "线性空间", "颜色空间"],
  },
  {
    id: "sxx-pixel-shaders-4",
    chapter: "sxx-pixel-shaders",
    level: 4,
    question: `像素着色器性能优化的核心原则是什么？如何系统性地分析和优化？`,
    answer: `核心原则：像素着色器对每个像素执行，1920x1080 有200万像素，每多一次纹理采样或分支判断开销乘以百万。系统性优化方法：1) 用 GPU Profiler 分析瓶颈类型——ALU 指令数 vs 带宽（纹理采样数）vs 分支发散；2) 减少纹理采样——合并多张纹理为 RGBA、使用 Mipmap、利用双线性采样合并相邻采样点；3) 消除动态分支——用 step/lerp/max 替代 if-else，uniform 分支可保留；4) 利用早期 Z 测试——被遮挡像素的像素着色器被跳过，确保不透明物体从前到后排序；5) 降低全屏后处理的分辨率——后处理在中低分辨率上做再上采样。`,
    tags: ["性能优化", "带宽", "分支发散"],
  },
];
