import type { ReviewQuestion } from "./types";

export const usfLightEffectsQuestions: ReviewQuestion[] = [
  {
    id: "usf-light-effects-1",
    chapter: "usf-light-effects",
    level: 1,
    question: "屏幕空间光照特效有哪些常见类型？",
    answer: "镜头光晕（Lens Flare）、体积光（God Rays/Light Shafts）、屏幕空间反射（SSR）、屏幕空间环境遮蔽（SSAO）、镜头灰尘散射（Dirt Lens）等。这些效果都基于屏幕纹理和深度信息。",
    tags: ["光照特效", "类型"],
  },
  {
    id: "usf-light-effects-2",
    chapter: "usf-light-effects",
    level: 2,
    question: "体积光（God Rays）的径向采样实现原理是什么？",
    answer: "1)以光源在屏幕上的投影位置为中心 2)从每个像素向光源方向做径向步进采样 3)累加采样亮度作为光散射量 4)用衰减函数控制距离衰减 5)将散射光叠加到场景颜色 6)可降分辨率处理提升性能 7)需要光源在屏幕内才有效。",
    tags: ["体积光", "径向采样"],
  },
  {
    id: "usf-light-effects-3",
    chapter: "usf-light-effects",
    level: 3,
    question: "镜头光晕（Lens Flare）如何在屏幕特效中实现？",
    answer: "1)计算光源到屏幕中心的向量 2)沿反方向生成一系列光斑 3)每个光斑用不同大小、颜色和位置的纹理 4)光斑透明度随距离衰减 5)可叠加星芒效果（十字交叉条纹）6)用 Blend Add 叠加到画面 7)可用 Screen 空间位置或世界空间光源位置驱动。",
    tags: ["镜头光晕", "Lens Flare"],
  },
  {
    id: "usf-light-effects-4",
    chapter: "usf-light-effects",
    level: 4,
    question: "如何实现屏幕空间环境遮蔽（SSAO）？",
    answer: "1)在屏幕空间采样每个像素周围的随机半球 2)用深度纹理重建位置 3)比较采样点和当前点的深度差 4.深度差小于半径的采样点贡献遮蔽 5)累加遮蔽值并平滑 6)将遮蔽因子乘到环境光上 7)用法线纹理避免平面内自遮蔽 8)降分辨率计算再双边滤波上采样。",
    tags: ["SSAO", "环境遮蔽", "实践"],
  },
];
