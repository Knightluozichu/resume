import type { ReviewQuestion } from "./types";

export const uusUrpShadowsQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-shadows-1",
    chapter: "uus-urp-shadows",
    level: 1,
    question: "Shadow Map 的工作原理是什么？",
    answer: "从光源视角渲染场景深度到纹理（Shadow Map）。渲染物体时，将像素位置变换到光源空间，采样 Shadow Map 中的深度值与当前像素深度比较——如果 Shadow Map 中的深度更近，说明该像素被其他物体遮挡（在阴影中）。最终用阴影衰减值（0=全阴影 1=无阴影）调制光照结果。",
    tags: ["Shadow Map", "阴影原理"],
  },
  {
    id: "uus-urp-shadows-2",
    chapter: "uus-urp-shadows",
    level: 2,
    question: "CSM（级联阴影）解决什么问题？如何分级？",
    answer: "CSM 解决大场景中单一 Shadow Map 精度不足的问题——近处需要高精度阴影但远处也需要覆盖范围，单一分辨率无法兼顾。CSM 将视锥体分为多级（最多 4 级 Cascade），近处用高分辨率 Shadow Map（如 2048）保证精度，远处用低分辨率覆盖更大范围。渲染时根据像素到相机的距离选择对应级联的 Shadow Map 采样。",
    tags: ["CSM", "级联阴影", "精度"],
  },
  {
    id: "uus-urp-shadows-3",
    chapter: "uus-urp-shadows",
    level: 3,
    question: "Shadow Acne 和 Peter Panning 分别是什么？如何平衡 Bias？",
    answer: "Shadow Acne 是阴影表面的条纹状自阴影伪影——Shadow Map 分辨率有限，斜面像素深度比较产生精度误差，部分像素误判为在阴影中。Peter Panning 是阴影脱离物体底部——Bias 过大导致阴影偏移过多，物体看起来「漂浮」。平衡方法：先用较小 Depth Bias 消除大部分 Acne，再用 Normal Bias 沿法线收缩解决斜面 Acne，最后检查底部是否有 Peter Panning。两者互为权衡。",
    tags: ["Shadow Acne", "Peter Panning", "Bias"],
  },
  {
    id: "uus-urp-shadows-4",
    chapter: "uus-urp-shadows",
    level: 4,
    question: "PCF 柔化的原理是什么？采样核大小如何影响性能和质量？移动端应如何配置？",
    answer: "PCF（Percentage Closer Filtering）在 Shadow Map 采样点周围取多个采样点，分别比较深度后取平均值，使阴影边缘从硬边变为软边。采样核越大（2x2=4 次 / 3x3=9 次 / 5x5=25 次）阴影越柔但采样开销越大。移动端配置建议：用 2x2 PCF（4 次采样）平衡质量和性能，CSM 2 级 + 1024 分辨率，关闭 PCSS 等高级柔化。PC 端可用 3x3 或 5x5 + 4 级 CSM 追求质量。",
    tags: ["PCF", "柔化", "移动端配置"],
  },
];
