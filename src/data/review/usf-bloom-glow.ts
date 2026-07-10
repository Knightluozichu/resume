import type { ReviewQuestion } from "./types";

export const usfBloomGlowQuestions: ReviewQuestion[] = [
  {
    id: "usf-bloom-glow-1",
    chapter: "usf-bloom-glow",
    level: 1,
    question: `Bloom（辉光）效果的视觉特征是什么？`,
    answer: `亮度超过阈值的区域向周围扩散发光，产生柔和的光晕。模拟真实相机镜头的光溢出效果，让亮源（太阳/灯光/自发光物体）看起来在发光。是提升画面质感最重要的后处理效果之一。`,
    tags: ["Bloom", "辉光"],
  },
  {
    id: "usf-bloom-glow-2",
    chapter: "usf-bloom-glow",
    level: 2,
    question: `Bloom 效果的标准管线步骤是什么？`,
    answer: `1)从 HDR 场景中提取亮度超过阈值的区域 2)对高亮纹理做降采样（Mip 链）3)每级做高斯模糊 4)从最小 Mip 逐级上采样叠加 5)将累加的 Bloom 纹理叠加到场景颜色 6)最终色调映射输出。降采样-上采样方法比直接大核模糊高效得多。`,
    tags: ["Bloom 管线", "降采样"],
  },
  {
    id: "usf-bloom-glow-3",
    chapter: "usf-bloom-glow",
    level: 3,
    question: `Bloom 的降采样-上采样方法为什么比直接大核模糊高效？`,
    answer: `直接大核模糊需要 N*N 次采样（N 很大才能产生扩散感）。降采样将纹理缩小到 1/2、1/4、1/8 等尺寸，在小尺寸上做小核模糊等价于大尺寸的大核模糊。上采样时累加各级结果。采样次数大幅减少，且小尺寸纹理缓存命中率更高。`,
    tags: ["降采样", "优化"],
  },
  {
    id: "usf-bloom-glow-4",
    chapter: "usf-bloom-glow",
    level: 4,
    question: `如何实现带镜头灰尘散射（Lens Dirt）的高级 Bloom？`,
    answer: `1)标准 Bloom 管线生成高亮辉光纹理 2)准备灰尘散射纹理（全屏 Dirt 贴图）3)将 Bloom 纹理与 Dirt 纹理相乘得到散射光 4)散射光乘以强度系数后叠加到 Bloom 结果 5)最终叠加到场景并做色调映射 6.Dirt 纹理让辉光产生不规则散射，增加真实感 7)可动态变化 Dirt 纹理模拟镜头移动。`,
    tags: ["Lens Dirt", "高级Bloom", "实践"],
  },
];
