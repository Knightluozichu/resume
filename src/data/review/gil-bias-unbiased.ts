import type { ReviewQuestion } from "./types";

/** 有偏与无偏估计 复习题 */
export const gilBiasUnbiasedQuestions: ReviewQuestion[] = [
  {
    id: "gil-bias-unbiased-1",
    chapter: "gil-bias-unbiased",
    level: 1,
    question: `无偏估计和一致估计的区别是什么？`,
    answer: `无偏：E[F_N]=I，任何N期望都等于真实值。一致：N→∞时F_N收敛到I。无偏一定一致，但一致不一定无偏（有限N时有偏差但偏差→0）。`,
    tags: ["无偏", "一致"],
  },
  {
    id: "gil-bias-unbiased-2",
    chapter: "gil-bias-unbiased",
    level: 2,
    question: `光子映射为什么是有偏但一致的？`,
    answer: `密度估计用有限半径圆盘近似点密度，引入系统性模糊（偏差）。但光子数增加且半径减小时偏差→0，收敛到正确值，所以一致。有偏但一致在实践中可接受。`,
    tags: ["光子映射", "偏差"],
  },
  {
    id: "gil-bias-unbiased-3",
    chapter: "gil-bias-unbiased",
    level: 3,
    question: `为什么无偏不等于高质量？`,
    answer: `无偏只保证期望正确，不保证单个估计质量。64spp无偏路径追踪可能噪声严重（方差大），而64光子有偏光子映射可能更平滑（偏差小+方差低）。视觉效果取决于偏差和方差的总和，不仅看是否有偏。`,
    tags: ["无偏", "质量"],
  },
  {
    id: "gil-bias-unbiased-4",
    chapter: "gil-bias-unbiased",
    level: 4,
    question: `分析在实时GI场景中为什么几乎所有方法都是有偏的，以及降噪器在其中的角色。`,
    answer: `实时GI时间预算仅几毫秒，无法做足够多蒙特卡洛采样保证无偏收敛。所有实时GI方法都用近似：RSM将有偏的反射光烘焙到纹理，LPV在低精度3D网格中传播有精度损失，VPL用虚拟点光源近似有偏差。这些方法都有偏但快。降噪器(SVGF等)的角色是：对低采样有噪声的GI结果做时空滤波，本质是「有偏降噪」——用邻域信息平滑噪声，引入轻微偏差换取无噪声视觉。整个pipeline：有偏GI(低精度快速) -> 有偏降噪(平滑噪声) -> 视觉可接受结果。所有环节都有偏，但组合后在实时预算内达到接近离线的视觉质量。`,
    tags: ["实时GI", "有偏", "降噪", "综合"],
  },
];