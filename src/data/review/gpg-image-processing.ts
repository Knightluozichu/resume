import type { ReviewQuestion } from "./types";

export const GpgImageProcessingQuestions: ReviewQuestion[] = [
  {
    id: "gpg-image-processing-1",
    chapter: "gpg-image-processing",
    level: 1,
    question: `后处理管线的典型流程是什么？`,
    answer: `HDR 场景渲染 → 亮度提取（降采样求平均亮度）→ Bloom（高光提取+降采样金字塔模糊）→ 色调映射（HDR 压缩到 LDR）→ Gamma 校正输出。`,
    tags: ["后处理", "管线"],
  },
  {
    id: "gpg-image-processing-2",
    chapter: "gpg-image-processing",
    level: 2,
    question: `为什么 HDR 渲染需要色调映射？Reinhard 和 ACES 有什么区别？`,
    answer: `HDR 颜色值可超过 1.0 但显示器只能显示 0-1，直接截断丢失亮部细节。色调映射用非线性曲线压缩动态范围。Reinhard（x/(x+1)）简单但高光偏灰；ACES 有更好的对比度和色彩饱和度，是电影工业标准。`,
    tags: ["色调映射", "HDR", "ACES"],
  },
  {
    id: "gpg-image-processing-3",
    chapter: "gpg-image-processing",
    level: 3,
    question: `Bloom 降采样金字塔为什么比全分辨率模糊快？具体快多少？`,
    answer: `每级分辨率减半，1/16 分辨率像素数只有全分辨率的 1/256。大半径模糊在最小 mip 上做计算量是全分辨率的几百分之一，再逐级上采样叠加恢复细节。5 级金字塔 Bloom 比全分辨率快数十倍。`,
    tags: ["Bloom", "降采样", "性能"],
  },
  {
    id: "gpg-image-processing-4",
    chapter: "gpg-image-processing",
    level: 4,
    question: `Bloom 应该在色调映射之前还是之后做？为什么？`,
    answer: `应该在色调映射之前。如果先色调映射，高光已被压缩到 1.0 以内，Bloom 光晕不明显。在 HDR 空间做 Bloom 叠加再统一色调映射，高光溢出更自然。这也是为什么后处理管线中 Bloom 排在色调映射之前。`,
    tags: ["Bloom", "色调映射", "顺序"],
  },
];
