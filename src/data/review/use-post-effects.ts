import type { ReviewQuestion } from "./types";

/** 屏幕后处理效果 复习题 */
export const usePostEffectsQuestions: ReviewQuestion[] = [
  {
    id: "use-post-effects-1",
    chapter: "use-post-effects",
    level: 1,
    question: `后处理的基本原理是什么？`,
    answer: `场景渲染到RenderTexture -> 后处理Shader对RT做全屏像素处理 -> 输出到屏幕。C#用OnRenderImage+Graphics.Blit，Shader写片元着色器处理UV采样颜色。`,
    tags: ["后处理", "原理"],
  },
  {
    id: "use-post-effects-2",
    chapter: "use-post-effects",
    level: 2,
    question: `亮度、对比度、饱和度的调整公式是什么？`,
    answer: `亮度：rgb*=brightness。对比度：(rgb-0.5)*contrast+0.5。饱和度：gray=dot(rgb,(0.299,0.587,0.114))，lerp(gray,rgb,saturation)。三者可在一个Shader中完成。`,
    tags: ["色彩调整", "公式"],
  },
  {
    id: "use-post-effects-3",
    chapter: "use-post-effects",
    level: 3,
    question: `后处理的性能开销在哪里？如何优化？`,
    answer: `开销在全屏纹理读写(与分辨率成正比)、多Pass效果(每Pass全屏操作)、模糊计算。优化：降分辨率中间纹理、分离模糊(2次1D替代1次2D)、合并效果减少Pass、移动端用Kawase等近似算法。后处理通常占帧时间20-40%。`,
    tags: ["性能", "优化"],
  },
  {
    id: "use-post-effects-4",
    chapter: "use-post-effects",
    level: 4,
    question: `设计一个Bloom泛光后处理方案，分析每个步骤的计算开销。`,
    answer: `Bloom流程：1)亮度提取Pass：采样场景纹理，用亮度阈值提取高亮区域，输出亮度纹理。开销：1次全屏读+写。2)降采样Pass(多次)：将亮度纹理逐级降采样(1/2->1/4->1/8->1/16)，每级做高斯模糊。降采样减少像素数降低开销，但需多次Pass(4次降采样=4次全屏操作，但每次像素数递减)。3)上采样+混合Pass(多次)：将各级降采样结果逐级上采样回原分辨率并混合，得到平滑的泛光。4-5次Pass。4)合成Pass：原图+泛光=最终结果。1次全屏读写。总开销：约6-10次全屏操作(含降采样递减)，主要在模糊Pass。优化：降采样用双线性过滤近似、减少降采样级数、移动端用1/4分辨率起始。`,
    tags: ["Bloom", "综合", "性能"],
  },
];