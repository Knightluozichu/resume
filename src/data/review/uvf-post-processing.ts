import type { ReviewQuestion } from "./types";

export const uvfPostProcessingQuestions: ReviewQuestion[] = [
  {
    id: "uvf-post-processing-1",
    chapter: "uvf-post-processing",
    level: 1,
    question: `Unity URP 中后处理特效是通过什么系统管理的？基本配置步骤是什么？`,
    answer: `URP 用 Volume + Volume Profile 系统管理后处理。配置步骤：1）在场景中添加 Volume 组件（Global 或 Local）；2）新建 Volume Profile 资源；3）在 Profile 中添加需要的 Override（如 Bloom、Depth of Field、Color Adjustments）；4）勾选启用各项参数并调整。Global Volume 影响全场景，Local Volume 只在触发器范围内生效（如进入特定区域切换氛围）。`,
    tags: ["Volume", "Volume Profile", "URP", "配置"],
  },
  {
    id: "uvf-post-processing-2",
    chapter: "uvf-post-processing",
    level: 2,
    question: `Bloom（泛光）效果的工作原理是什么？为什么需要开启 HDR 才能正常工作？`,
    answer: `Bloom 原理三步：1）提取亮度——将画面中亮度超过阈值（如1.0）的像素提取出来；2）高斯模糊——对提取的亮区多次降采样模糊，产生光晕扩散；3）叠加回原图——将模糊后的光晕加回原始画面。需要 HDR 是因为 LDR（8位）最大值为1.0，无法表示超过1的亮度。HDR 用浮点缓冲（16位/32位），可以存储大于1的亮度值，Bloom 阈值才能正确提取高亮区域。没有 HDR，Bloom 效果会很弱或完全无效。`,
    tags: ["Bloom", "HDR", "高斯模糊", "原理"],
  },
  {
    id: "uvf-post-processing-3",
    chapter: "uvf-post-processing",
    level: 3,
    question: `如何用 Color Grading（色彩校正）统一游戏场景的视觉风格？Tonemapping 和 LUT 各做什么？`,
    answer: `Tonemapping 将 HDR 线性色彩映射到 LDR 显示范围，常用 ACES 电影色调曲线，让高光不过曝、暗部有细节。LUT（Look-Up Table）是颜色查找表，将原始颜色映射为目标风格颜色，可以制作暖色调、冷色调、复古胶片等统一风格。流程：1）先 Tonemapping 确保亮度范围正确；2）用 LUT 应用艺术化色调；3）调整 Color Adjustments（曝光、对比度、饱和度、色温）微调。全局 Volume 统一管理，场景间用不同 LUT 切换氛围。`,
    tags: ["Color Grading", "Tonemapping", "LUT", "视觉风格"],
  },
  {
    id: "uvf-post-processing-4",
    chapter: "uvf-post-processing",
    level: 4,
    question: `移动端后处理优化的核心策略是什么？如何在效果和性能之间取得平衡？`,
    answer: `核心策略：1）减少 Pass 数——只保留最关键的1-2个后处理（如 Bloom+Color Grading），砍掉 DOF、Motion Blur 等高消耗效果；2）降低渲染分辨率——后处理在半分辨率或四分之一分辨率上计算，Bloom 的模糊降采样本身就是降分辨率；3）避免全屏 GrabPass——URP 的后处理走 ScriptableRenderPass，比 GrabPass 高效；4）用 LUT 替代实时 Color Grading 计算——预烘焙 LUT 查找比实时调色省性能；5）按场景动态开关——过场动画开全部效果，游戏内只开 Bloom。平衡原则：移动端保留 Bloom+Tonemapping+LUT 三件套，其余按需开启，帧率优先于画质。`,
    tags: ["移动端优化", "后处理优化", "性能平衡"],
  },
];
