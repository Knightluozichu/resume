import type { ReviewQuestion } from "./types";

/** 散焦模糊与景深 复习题 */
export const rtwDefocusBlurQuestions: ReviewQuestion[] = [
  {
    id: "rtw-defocus-blur-1",
    chapter: "rtw-defocus-blur",
    level: 1,
    question: `针孔相机和薄透镜相机有什么区别？为什么针孔相机没有景深？`,
    answer: `针孔相机所有光线从同一单点出发，远近物体都一样清晰，没有景深。薄透镜相机有大小为光圈的镜头，光线从镜头各处进入并汇聚，只有对焦距离上的物体落在焦平面上最清晰，前后物体发散成光斑，产生景深/散焦模糊。`,
    tags: ["针孔", "薄透镜"],
  },
  {
    id: "rtw-defocus-blur-2",
    chapter: "rtw-defocus-blur",
    level: 2,
    question: `散焦光线的起点和方向分别怎么确定？为什么焦平面上的物体会清晰？`,
    answer: `起点在相机光圈圆盘内随机取 o'=O+offset；方向指向焦平面上该像素的对焦点 t，即 t−o'。焦平面物体恰在焦距处，不同起点出发的光线都汇聚到同一像素的同一像点，叠加不发散，所以清晰；偏离焦平面的物体则因不同起点光线落点错开而模糊。`,
    tags: ["get_ray", "焦平面"],
  },
  {
    id: "rtw-defocus-blur-3",
    chapter: "rtw-defocus-blur",
    level: 3,
    question: `阅读 get_ray：offset 为什么既加到 origin 又从方向里减去？`,
    answer: `加到 origin 使光线起点在光圈圆盘内游走（产生散焦）；从方向里减去 offset 使方向仍指向焦平面上的同一个对焦点 t（origin+offset 到 t 的向量 = t−origin−offset）。两者配合才能「起点变、对焦点不变」，让焦平面物体汇聚清晰、前后物体发散模糊。`,
    tags: ["读代码", "offset"],
  },
  {
    id: "rtw-defocus-blur-4",
    chapter: "rtw-defocus-blur",
    level: 4,
    question: `光圈半径变大景深如何变化？若视口忘记乘 focus_dist 会出现什么 bug？`,
    answer: `光圈变大，散焦圆盘更大，偏离焦平面的物体散得更开、模糊更强，景深变浅（清晰范围变窄）。若视口（horizontal/vertical/lower_left_corner）忘记乘 focus_dist，对焦点不在焦平面上，所有物体都偏离对焦距离，结果整张图连对焦物体也糊，失去「某距离清晰」的效果。`,
    tags: ["综合", "光圈", "focus_dist"],
  },
];
