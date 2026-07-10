import type { ReviewQuestion } from "./types";

export const bl3AnimationQuestions: ReviewQuestion[] = [
  {
    id: "bl3-animation-1",
    chapter: "bl3-animation",
    level: 1,
    question: `Blender 中插入关键帧的快捷键是什么？`,
    answer: `按 I 键插入关键帧，在弹出的菜单中选择要记录的属性（Location、Rotation、Scale 或 LocRotScale）。`,
    tags: ["关键帧", "快捷键"],
  },
  {
    id: "bl3-animation-2",
    chapter: "bl3-animation",
    level: 2,
    question: `线性插值和贝塞尔插值在动画效果上有什么区别？`,
    answer: `线性插值速度恒定，运动机械无加减速。贝塞尔插值可以控制缓入缓出——运动开始和结束慢、中间快，符合物理直觉。曲线编辑器中按 T 键切换。`,
    tags: ["插值", "曲线编辑器"],
  },
  {
    id: "bl3-animation-3",
    chapter: "bl3-animation",
    level: 3,
    question: `骨骼绑定中 Weight Paint（权重绘制）解决什么问题？`,
    answer: `权重绘制定义每根骨骼影响哪些顶点及影响强度。旋转手肘骨头时，只有小臂的顶点跟着转，上臂不动。权重不正确会导致变形拉伸、穿模或错误部位跟着运动。`,
    tags: ["权重绘制", "骨骼绑定"],
  },
  {
    id: "bl3-animation-4",
    chapter: "bl3-animation",
    level: 4,
    question: `动画的三大节奏原则各自解决什么问题？为什么缺一不可？`,
    answer: `缓入缓出让运动有加速度变化，避免机械感；预备动作制造期待和蓄力感；余动让动画有惯性和层次感。缺缓入缓出则生硬，缺预备动作则突兀，缺余动则僵硬——三者共同构成有生命力的动画。`,
    tags: ["动画原则", "节奏", "综合"],
  },
];
