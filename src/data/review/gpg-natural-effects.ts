import type { ReviewQuestion } from "./types";

export const GpgNaturalEffectsQuestions: ReviewQuestion[] = [
  {
    id: "gpg-natural-effects-1",
    chapter: "gpg-natural-effects",
    level: 1,
    question: `水面、火焰、毛发三种自然效果的「扰动源」分别是什么？`,
    answer: `水面用高度场（Gerstner 波/正弦波叠加），映射为顶点位移和法线扰动；火焰用密度场（3D 噪声），映射为颜色渐变和透明度；毛发用偏移场，映射为壳层位置和法线插值。`,
    tags: ["自然效果", "扰动源"],
  },
  {
    id: "gpg-natural-effects-2",
    chapter: "gpg-natural-effects",
    level: 2,
    question: `自然效果渲染的「三步法」是什么？为什么第三步不可省略？`,
    answer: `三步法：生成扰动源 → 映射到几何或颜色 → 叠加光照模型。第三步不可省略是因为没有光照，效果只是彩色图案而非真实物体。光照让效果与场景互动——水面菲涅尔反射随视角变化，火焰加色混合发光照亮周围。`,
    tags: ["三步法", "光照"],
  },
  {
    id: "gpg-natural-effects-3",
    chapter: "gpg-natural-effects",
    level: 3,
    question: `程序化噪声相比预存噪声纹理有什么优势？在什么场景下应该用预存纹理？`,
    answer: `程序化噪声可实时计算、无平铺痕迹、可任意缩放且不占显存。优势是无缝变化和节省内存。当 GPU 算力极度受限（如移动端）或需要特定不可数学生成的图案时，应预存纹理。一般实时渲染优先程序化方案。`,
    tags: ["程序化噪声", "纹理"],
  },
  {
    id: "gpg-natural-effects-4",
    chapter: "gpg-natural-effects",
    level: 4,
    question: `为什么水面真实感主要来自法线扰动而非颜色变化？菲涅尔效应在其中起什么作用？`,
    answer: `法线扰动导致高光位置随波纹变化，产生闪烁感——这是人眼判断「这是水」的核心线索。颜色变化是次要的。菲涅尔效应让水面在掠射角下反射增强，近处透明远处如镜面，这种视角依赖性是水面真实感的关键物理特征。`,
    tags: ["水面", "菲涅尔", "法线"],
  },
];
