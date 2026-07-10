import type { ReviewQuestion } from "./types";

export const uusUrpPostProcessingQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-post-processing-1",
    chapter: "uus-urp-post-processing",
    level: 1,
    question: `URP 后处理链的执行顺序是什么？`,
    answer: `场景渲染（Camera Color RT）→ Bloom → Color Adjustments → Tone Mapping → Vignette/Grain → 输出。每个效果执行一次全屏 Blit，读取上一步的 RT，经材质处理后输出新 RT。`,
    tags: ["后处理链", "执行顺序"],
  },
  {
    id: "uus-urp-post-processing-2",
    chapter: "uus-urp-post-processing",
    level: 2,
    question: `Volume 系统的 Global 和 Local Volume 如何混合？`,
    answer: `Global Volume 全局生效，权重始终为 1。Local Volume 在 3D 空间定义碰撞体区域，摄像机进入时权重从 0 渐变到 1（按 Blend Distance），离开时渐变回 0。多个 Volume 按 Priority 排序，高优先级的 Volume Component 覆盖低优先级。最终参数是所有活跃 Volume 的加权混合，实现平滑区域过渡。`,
    tags: ["Volume", "Global", "Local"],
  },
  {
    id: "uus-urp-post-processing-3",
    chapter: "uus-urp-post-processing",
    level: 3,
    question: `为什么 Tone Mapping 必须在 HDR 操作之后？在它前后分别该做什么？`,
    answer: `Tone Mapping 将 HDR（>1.0）压缩到 LDR（0~1），是不可逆操作。Bloom 和 Color Adjustments 需在 HDR 空间操作才能正确处理过曝区域（如太阳高光 >1.0 的泛光扩散），在 Tone Mapping 后操作会丢失 HDR 信息。Tone Mapping 后只能做 LDR 装饰效果（Vignette、Grain、Chromatic Aberration），因为颜色已被压缩到 0~1 范围。正确顺序：HDR 操作（Bloom/调色）→ Tone Mapping → LDR 装饰。`,
    tags: ["Tone Mapping", "HDR", "LDR"],
  },
  {
    id: "uus-urp-post-processing-4",
    chapter: "uus-urp-post-processing",
    level: 4,
    question: `每个后处理效果的带宽开销有多大？移动端应如何精简后处理链？`,
    answer: `每个后处理效果至少一次全屏 Blit（读+写 RT），4K 分辨率下一次 Blit 约 8MB 带宽（读 4MB + 写 4MB），5 个效果约 40MB。移动端精简策略：1) 只保留 Tone Mapping（必须）+ 轻量 Bloom（降分辨率做模糊）；2) 关闭 Depth of Field 和 Motion Blur（需额外 Pass 采样深度/速度）；3) Color Adjustments 用查找表（LUT）一次 Blit 替代多个独立调色效果；4) 降低 Render Scale 进一步减少 Blit 像素数；5) 关闭 Vignette/Grain 等装饰效果。`,
    tags: ["后处理", "带宽", "移动端优化"],
  },
];
