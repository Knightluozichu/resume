"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-01",
  title: "Chapter 1. Animation Fundamentals：变化、时间与代码动画",
  question:
    "怎样证明代码动画在不同帧率下保持相同速度，并让曲线、旋转、材质与相机效果共享明确时钟？",
  concepts: [
    "Understanding animation；Frames；Key frames",
    "Rigid body animation；Rigged or bone-based animation；Sprite animation；Physics-based animation",
    "Morph animation；Video animation；Particle animation；Programmatic animation",
    "Animating through code - making things move；Consistent animation - speed, time, and deltaTime",
    "Movement in a direction；Coding tweens with animation curves；Rotating towards objects - animation with coroutines",
    "Material and mapping animation；Camera shaking - animation effects",
  ],
  clips: [
    {
      name: "位置曲线",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "朝向协程",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "材质与相机",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 1. Animation Fundamentals：变化、时间与代码动画”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行声明属性端点与时钟，保存关键帧、参数或空间基准",
    "推进采样曲线和代码更新，记录采样时间、活动状态和属性写入者",
    "完成比较帧率与恢复状态，交付属性清单、坐标系、关键帧、曲线、deltaTime积分、协程生命周期、两档帧率轨迹和重置快照。",
  ],
  failureTrace: [
    "复用“Chapter 1. Animation Fundamentals：变化、时间与代码动画”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：每帧累加固定距离而忽略deltaTime，导致高帧率设备移动更快",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“位移按经过时间积分，端点与坐标系明确，协程和曲线不重复推进同一属性”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "位移按经过时间积分，端点与坐标系明确，协程和曲线不重复推进同一属性",
  fault: "每帧累加固定距离而忽略deltaTime，导致高帧率设备移动更快",
  artifact:
    "属性清单、坐标系、关键帧、曲线、deltaTime积分、协程生命周期、两档帧率轨迹和重置快照。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 1. Animation Fundamentals：变化、时间与代码动画”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 1. Animation Fundamentals：变化、时间与代码动画”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 1. Animation Fundamentals：变化、时间与代码动画”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 1. Animation Fundamentals：变化、时间与代码动画”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan01AnimationFundamentalsTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan01AnimationFundamentalsStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan01AnimationFundamentalsRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
