import type { ReviewQuestion } from "./types";

export const bl3GameExportQuestions: ReviewQuestion[] = [
  {
    id: "bl3-game-export-1",
    chapter: "bl3-game-export",
    level: 1,
    question: `Blender 导出到 Unity 最常用的格式是什么？`,
    answer: `FBX 格式，它支持网格、材质、骨骼动画和 blendshape，Unity 原生支持最好。`,
    tags: ["FBX", "导出格式"],
  },
  {
    id: "bl3-game-export-2",
    chapter: "bl3-game-export",
    level: 2,
    question: `模型导入 Unity 后大小不对（大 100 倍），原因和解决方法是什么？`,
    answer: `Blender 默认单位是米，FBX 导出的缩放因子和 Unity 的 Scale Factor 不匹配。解决：Blender 中 Ctrl+A 应用缩放；导出时 Apply Scalings 选 FBX All；Unity 导入设置调整 Scale Factor。`,
    tags: ["缩放", "Unity 导入"],
  },
  {
    id: "bl3-game-export-3",
    chapter: "bl3-game-export",
    level: 3,
    question: `导出 FBX 时为什么要勾选 Tangent Space（切线空间）？`,
    answer: `切线空间数据是法线贴图正确渲染的基础——法线贴图存储的是切线空间下的凹凸方向。不导出切线空间，引擎无法正确解算法线贴图，导致凹凸反转或全平。`,
    tags: ["切线空间", "法线贴图", "导出设置"],
  },
  {
    id: "bl3-game-export-4",
    chapter: "bl3-game-export",
    level: 4,
    question: `为什么说导出是「翻译」而非「保存」？这个认知如何指导实际工作？`,
    answer: `保存是同格式存储，翻译是跨格式转换——Blender 的坐标系、单位、材质系统都与引擎不同，导出需要做坐标系转换、缩放应用、修改器烘焙、材质映射。这指导我们：导出前检查源数据，导出后在引擎逐项验证，建立导出检查清单。`,
    tags: ["导出", "翻译", "美术管线", "综合"],
  },
];
