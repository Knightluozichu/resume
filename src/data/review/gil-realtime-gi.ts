import type { ReviewQuestion } from "./types";

/** 实时全局光照 复习题 */
export const gilRealtimeGiQuestions: ReviewQuestion[] = [
  {
    id: "gil-realtime-gi-1",
    chapter: "gil-realtime-gi",
    level: 1,
    question: "实时GI与离线GI的核心差异是什么？",
    answer: "实时GI预算仅几毫秒，用大幅近似（RSM烘焙、LPV网格传播、VPL多光源），追求「够用」不追求「正确」。离线GI用蒙特卡洛路径追踪，无采样上限，追求物理正确。技术栈完全不同。",
    tags: ["实时GI", "离线GI"],
  },
  {
    id: "gil-realtime-gi-2",
    chapter: "gil-realtime-gi",
    level: 2,
    question: "RSM的原理和局限是什么？",
    answer: "原理：从光源渲染阴影贴图时额外存储位置/法线/反射通量，渲染时把纹素当次级光源采样。局限：只有一次弹射、需大量采样、不考虑遮挡、只适合漫反射。",
    tags: ["RSM", "局限"],
  },
  {
    id: "gil-realtime-gi-3",
    chapter: "gil-realtime-gi",
    level: 3,
    question: "为什么降噪是现代实时GI的关键组件？",
    answer: "现代实时GI用极低采样(1-4spp)，噪声严重不可用。降噪(如SVGF)用时间累积(历史帧增加有效采样)和空间滤波(邻域平均)把噪声变平滑，让1spp接近16spp视觉质量。没有降噪，低采样实时GI完全不可用。",
    tags: ["降噪", "实时GI"],
  },
  {
    id: "gil-realtime-gi-4",
    chapter: "gil-realtime-gi",
    level: 4,
    question: "设计一个实时GI方案，适用于动态室外场景，分析各组件的取舍。",
    answer: "方案：1)直接光+阴影：级联阴影贴图(CSM)处理太阳光动态阴影。2)天光GI：预计算天光辐照度图(类似IBL)，运行时用方向查询。3)一次弹射间接光：1spp光线追踪(需RTX硬件)或RSM采样，覆盖色渗透和主要间接方向性。4)多次弹射间接光：低分辨率辐照度体(irradiance volume)预计算或LPV近似，提供环境光基底。5)降噪：SVGF时空滤波处理1spp噪声，时间累积增加有效采样。6)AO：GTAO(屏幕空间)补充角落暗化。取舍：1spp光线追踪质量最高但需硬件RTX，RSM更通用但粗糙；辐照度体预计算质量好但不适合动态光照（需每帧更新LPV）；SVGF降噪好但有拖影（需历史拒绝）。整体在毫秒预算内达到「可接受的GI」而非「正确GI」。",
    tags: ["实时GI方案", "综合"],
  },
];