import type { ReviewQuestion } from "./types";

/** Ray Tracing in One Weekend 全书学习地图 复习题 */
export const rtwLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rtw-learning-map-1",
    chapter: "rtw-learning-map",
    level: 1,
    question: `全书分为哪四个阶段？`,
    answer: `基础（射线与相交）、几何（球体与可命中对象）、材质（散射模型）、收尾（景深与最终场景）。`,
    tags: ["全书结构"],
  },
  {
    id: "rtw-learning-map-2",
    chapter: "rtw-learning-map",
    level: 2,
    question: `光线追踪与光栅化在光的传播方向上有什么根本区别？`,
    answer: `光栅化从物体投影到像素（物体→像素），光线追踪从相机发射射线穿过像素去求交（像素→物体）并递归模拟光弹射。代价是每条射线都要做场景求交，计算量大，但能自然得到反射、折射、阴影等全局光照。`,
    tags: ["光线追踪", "光栅化"],
  },
  {
    id: "rtw-learning-map-3",
    chapter: "rtw-learning-map",
    level: 3,
    question: `阅读 ray_color 递归函数，depth<=0 时返回什么？为什么需要这个上限？`,
    answer: `depth<=0 返回 color(0,0,0)（黑色）。它是递归终止条件，防止光线在两面相对的镜面/玻璃之间无限弹射导致栈溢出；同时每弹一次能量衰减，深层贡献本就极小，截断不影响画质。`,
    tags: ["读代码", "递归", "max_depth"],
  },
  {
    id: "rtw-learning-map-4",
    chapter: "rtw-learning-map",
    level: 4,
    question: `把光线弹射深度从 10 调到 50，画面会变清晰还是变暗？为什么？`,
    answer: `整体会略变暗。每次散射都会乘 attenuation 衰减能量，弹射次数越多、能量损失越多；超过一定深度后新贡献趋近于 0，画质几乎不再提升却显著增加耗时。深度主要影响玻璃/镜面间多次反射的细节，需在画质与性能间权衡。`,
    tags: ["综合", "max_depth", "能量衰减"],
  },
];
