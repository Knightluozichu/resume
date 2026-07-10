import type { ReviewQuestion } from "./types";

export const Cgp3dGraphicsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-3d-graphics-1",
    chapter: "cgp-3d-graphics",
    level: 1,
    question: `3D 图形中透视投影和平行投影的区别是什么？`,
    answer: `透视投影：投影中心在有限远处，近大远小，符合人眼视觉。平行投影（正交）：投影中心在无穷远，投影线平行，无近大远小，适合工程制图（CAD）保持尺寸比例。`,
    tags: ["透视投影", "平行投影"],
  },
  {
    id: "cgp-3d-graphics-2",
    chapter: "cgp-3d-graphics",
    level: 2,
    question: `3D 变换的完整管线是什么？每步做什么？`,
    answer: `局部空间→模型变换→世界空间→视图变换→观察空间→投影变换→裁剪空间→透视除法→NDC→视口变换→屏幕空间。模型变换放物体到世界，视图变换把相机移到原点，投影变换加透视效果，视口变换映射到屏幕像素。`,
    tags: ["变换管线", "空间"],
  },
  {
    id: "cgp-3d-graphics-3",
    chapter: "cgp-3d-graphics",
    level: 3,
    question: `深度缓冲（Z-buffer）的工作原理是什么？它解决了什么问题？`,
    answer: `Z-buffer 存每个像素最近表面的深度。渲染时对每个片元比较其深度与缓冲中的深度，更近则写入颜色和深度。解决了隐藏面消除问题——不用预先排序物体，任意顺序渲染都能得到正确可见性，是实时渲染的基石。`,
    tags: ["Z-buffer", "深度缓冲", "隐藏面"],
  },
  {
    id: "cgp-3d-graphics-4",
    chapter: "cgp-3d-graphics",
    level: 4,
    question: `透视投影的深度缓冲为什么是非线性的？这带来什么问题？如何解决？`,
    answer: `透视投影后深度 z 与原始 z 成反比（1/z），近处精度高远处精度低。问题：远处深度精度差导致 z-fighting（两个面深度相同闪烁）。解决：用反向 Z（near=0.1, far=10000，让远处的浮点精度更高）或对数深度缓冲。这是为什么现代引擎用反向 Z 的原因。`,
    tags: ["深度缓冲", "非线性", "z-fighting"],
  },
];
