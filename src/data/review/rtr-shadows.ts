import type { ReviewQuestion } from "./types";

export const RtrShadowsQuestions: ReviewQuestion[] = [
  {
    id: "rtr-shadows-1",
    chapter: "rtr-shadows",
    level: 1,
    question: `实时阴影的主流技术是什么？它的基本原理是什么？`,
    answer: `主流是 Shadow Map。从光源渲染深度图，渲染主场景时把像素变换到光源空间与深度图比较，深度更大则被遮挡处于阴影中。`,
    tags: ["Shadow Map", "实时阴影"],
  },
  {
    id: "rtr-shadows-2",
    chapter: "rtr-shadows",
    level: 2,
    question: `阴影痤疮（acne）和 peter-panning 是什么？如何解决？`,
    answer: `阴影痤疮是深度比较精度误差导致阴影区出现条纹状噪点；peter-panning 是为消除痤疮加偏移太大导致物体与阴影脱离（漂浮）。解决：用 front-face culling 渲染阴影图（只存背面深度）或用合理偏移值。`,
    tags: ["阴影痤疮", "peter-panning"],
  },
  {
    id: "rtr-shadows-3",
    chapter: "rtr-shadows",
    level: 3,
    question: `PCF、PCSS、VSM 三种软阴影技术的原理和优劣分别是什么？`,
    answer: `PCF：邻域多点采样取平均，简单但采样数固定。PCSS：根据遮挡距离自适应采样半径，物理正确但开销大。VSM：存深度和深度平方，用切比雪夫不等式估计遮挡比例，可做模糊但精度有限可能漏光。`,
    tags: ["PCF", "PCSS", "VSM"],
  },
  {
    id: "rtr-shadows-4",
    chapter: "rtr-shadows",
    level: 4,
    question: `级联阴影图（CSM）如何分配各级阴影图的分辨率和范围？段间如何过渡？`,
    answer: `按指数级分配范围（近段小而精、远段大而粗），分辨率通常每级相同或递减。段间过渡用 blend region 在两级的交界区同时渲染两个级并按距离插值，避免硬切换跳变。关键是让近处分辨率足够、远处切换不可见。优化包括让 CSM 跟随相机的视锥体对齐。`,
    tags: ["CSM", "级联", "过渡"],
  },
];
