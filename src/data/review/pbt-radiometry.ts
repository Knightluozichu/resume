import type { ReviewQuestion } from "./types";

/** 辐射度量学 复习题 */
export const pbtRadiometryQuestions: ReviewQuestion[] = [
  {
    id: "pbt-radiometry-1",
    chapter: "pbt-radiometry",
    level: 1,
    question: `Radiance 的单位是什么？`,
    answer: `W/(m²·sr)，即瓦特每平方米每球面度。`,
    tags: ["辐射度量学", "单位"],
  },
  {
    id: "pbt-radiometry-2",
    chapter: "pbt-radiometry",
    level: 2,
    question: `为什么说 Radiance 在真空中沿光线方向守恒？这对渲染有什么意义？`,
    answer: `因为在真空中没有吸收、散射等交互，光的能量在传播中不变，而 radiance 定义中面积和立体角的变化恰好抵消。意义是：渲染器只需计算物体表面交点处的 radiance，从物体到相机的路径上无需重新计算，大幅简化了渲染算法。`,
    tags: ["radiance守恒", "渲染原理"],
  },
  {
    id: "pbt-radiometry-3",
    chapter: "pbt-radiometry",
    level: 3,
    question: `写出 Irradiance 与 Radiance 的关系式并解释 cosθ 的来源。`,
    answer: `E = 真实积分号 L(ω)cosθ dω，对半球面积分。cosθ 来自面积投影——光线以角度 θ 斜射时，单位面积实际接收的光束截面为 dA·cosθ，这就是 Lambert 余弦定律的几何根源。`,
    tags: ["irradiance", "积分关系"],
  },
  {
    id: "pbt-radiometry-4",
    chapter: "pbt-radiometry",
    level: 4,
    question: `用辐射度量学的观点解释为什么远处物体看起来更暗（忽略大气影响）。`,
    answer: `从辐射度量学看，radiance 沿光线守恒，所以远处物体的 radiance 本身不变。但远处物体在视网膜/传感器上占据的立体角更小（与距离平方成反比），因此单位像素接收的总通量（即 irradiance）减少，看起来更暗。这解释了为什么「辐亮度守恒」与「远处更暗」不矛盾——变暗的是 irradiance 而非 radiance。`,
    tags: ["综合", "辐照度", "立体角"],
  },
];