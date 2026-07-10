import type { ReviewQuestion } from "./types";

export const gpoProceduralQuestions: ReviewQuestion[] = [
  {
    id: "gpo-procedural-1",
    chapter: "gpo-procedural",
    level: 1,
    question: `Perlin 噪声和 Worley 噪声的区别是什么？`,
    answer: `Perlin 噪声是梯度噪声：网格顶点定义随机梯度，插值产生连续平滑值，适合云雾大理石。Worley 噪声是细胞噪声：计算到最近特征点的距离，产生蜂窝/裂纹结构，适合水面波纹和岩石裂纹。`,
    tags: ["Perlin", "Worley", "噪声"],
  },
  {
    id: "gpo-procedural-2",
    chapter: "gpo-procedural",
    level: 2,
    question: `fbm 的原理是什么？为什么能产生自然纹理？`,
    answer: `fbm 叠加多层不同频率和振幅的噪声：value = sum(amplitude^i * noise(frequency^i * p))，每层频率翻倍振幅减半。自然界许多现象（山脉、云层、海岸线）具有分形特征——不同尺度下有相似细节结构。fbm 通过多尺度噪声叠加模拟这种自相似性：低频层提供大结构，高频层提供小细节。通常 4-6 个 octave 足够。`,
    tags: ["fbm", "分形", "自然纹理"],
  },
  {
    id: "gpo-procedural-3",
    chapter: "gpo-procedural",
    level: 3,
    question: `程序化纹理和预计算纹理的优劣对比是什么？如何选择？`,
    answer: `程序化纹理：零存储、无限分辨率、可参数化，但 ALU 开销高（fbm 6 octave = 24+ 次计算 vs 1 次纹理采样）。预计算纹理：查找快（1 次采样）、GPU 纹理硬件优化，但分辨率有限、占内存。选择策略：低频结构（地形高度、云层分布）用程序化（无分辨率限制），高频细节（法线、颜色纹理）用预计算纹理（ALU 开销过大）。混合方案最佳。`,
    tags: ["程序化纹理", "预计算纹理", "性能"],
  },
  {
    id: "gpo-procedural-4",
    chapter: "gpo-procedural",
    level: 4,
    question: `域扭曲（Domain Warping）是什么？它如何让程序化纹理更有机？`,
    answer: `域扭曲用噪声偏移采样坐标，再用偏移后的坐标采样另一层噪声：result = noise(p + noise(p) * warpStrength)。原始噪声直接采样坐标 p，域扭曲先用一层噪声扭曲坐标空间，使原本规则的噪声图案产生流动、卷曲的有机形态。效果：地形不再有规则的网格状纹理，而是产生河流蜿蜒、山脉扭曲的自然形态。域扭曲让程序化纹理从「数学感」变为「自然感」，是程序化地形和云层的关键技术。`,
    tags: ["域扭曲", "Domain Warping", "程序化"],
  },
];
