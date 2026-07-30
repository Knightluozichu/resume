"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-05",
  title: "Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动",
  question:
    "怎样证明同一人形剪辑在两个Avatar上保持语义，并让根运动与角色控制器不重复位移？",
  concepts: [
    "Creating rigged characters；Importing rigged characters",
    "Avatars and retargeting",
    "Retargeting animations",
    "Root motion",
    "Fixing motion offsets",
  ],
  clips: [
    {
      name: "源角色行走",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "目标角色重定向",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "根轨迹",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行验证骨骼Avatar与姿势，保存关键帧、参数或空间基准",
    "推进重定向并采样接触点，记录采样时间、活动状态和属性写入者",
    "完成选择根运动权威和修正偏移，交付骨骼映射、Avatar验证、源目标姿势、剪辑设置、根曲线、Apply Root Motion、控制器轨迹和偏移修正。",
  ],
  failureTrace: [
    "复用“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：Animator应用Root Motion，角色控制脚本又积分速度，角色每帧发生双倍位移",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“骨骼映射有效，Avatar姿势可核对，根位移只有一个权威来源，偏移修正有前后轨迹”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "骨骼映射有效，Avatar姿势可核对，根位移只有一个权威来源，偏移修正有前后轨迹",
  fault:
    "Animator应用Root Motion，角色控制脚本又积分速度，角色每帧发生双倍位移",
  artifact:
    "骨骼映射、Avatar验证、源目标姿势、剪辑设置、根曲线、Apply Root Motion、控制器轨迹和偏移修正。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan05CharacterAnimationFundamentalsTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan05CharacterAnimationFundamentalsStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan05CharacterAnimationFundamentalsRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
