import type { ReviewQuestion } from "./types";

export const usfColorGradingQuestions: ReviewQuestion[] = [
  {
    id: "usf-color-grading-1",
    chapter: "usf-color-grading",
    level: 1,
    question: `色彩校正（Color Grading）的目的是什么？`,
    answer: `统一场景色彩风格，调整亮度/对比度/饱和度，实现电影级调色效果。通过 LUT（查找表）或运行时着色器实现。分为颜色映射（Tone Mapping）、颜色调整（亮度/对比度/饱和度）和风格化（LUT 查找）三层。`,
    tags: ["色彩校正", "Color Grading"],
  },
  {
    id: "usf-color-grading-2",
    chapter: "usf-color-grading",
    level: 2,
    question: `LUT（Look-Up Table）在色彩校正中如何使用？`,
    answer: `LUT 是预计算的 3D 颜色查找表，将输入 RGB 映射到输出 RGB。在 Shader 中用原始颜色作为 UV 采样 LUT 纹理，直接得到调色后的颜色。优点是可在外部工具（Photoshop/DaVinci）调色后导出 LUT，在引擎中一键应用。常用 256x16 的 2D 纹理存储 3D LUT。`,
    tags: ["LUT", "查找表"],
  },
  {
    id: "usf-color-grading-3",
    chapter: "usf-color-grading",
    level: 3,
    question: `ACES 色调映射相比 Reinhard 有什么优势？`,
    answer: `ACES（Academy Color Encoding System）保留了更多高光和暗部细节，色彩过渡更自然，是电影行业标准。Reinhard 简单但高光区域容易发灰。ACES 公式为 (x*(2.51x+0.03))/(x*(2.43x+0.59)+0.14)，虽然计算量稍大但视觉效果更好。`,
    tags: ["ACES", "Tone Mapping", "对比"],
  },
  {
    id: "usf-color-grading-4",
    chapter: "usf-color-grading",
    level: 4,
    question: `如何在 Unity 中实现完整的色彩校正管线？`,
    answer: `1)HDR 渲染场景 2)白平衡（色温/色调调整）3)色调映射（ACES/Reinhard）将 HDR→LDR 4)颜色调整（亮度/对比度/饱和度/色相）5)通道混合器 6)LUT 查找应用风格化调色 7)最终输出到屏幕 8)用后处理栈 Volume 控制参数，支持 Blending 过渡。`,
    tags: ["色彩管线", "LUT", "实践"],
  },
];
