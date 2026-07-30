"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-06",
  title: "Chapter 6. Advanced Character Animation：可控角色与 Blend Tree",
  question:
    "怎样把输入速度和方向映射到Blend Tree坐标，并证明阈值、阻尼和剪辑速度不会造成跳变？",
  concepts: [
    "Creating a controllable character；Blend Trees",
    "Dimensions",
    "Mapping floats",
    "Preparing to script with Blend Tree animations",
    "Scripting with Mecanim Blend Trees；Testing Mecanim Blend Trees",
  ],
  clips: [
    {
      name: "待机行走跑",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "方向二维树",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "脚本输入轨",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行选择维度剪辑与阈值，保存关键帧、参数或空间基准",
    "推进映射脚本浮点和阻尼，记录采样时间、活动状态和属性写入者",
    "完成采样边界与过渡结果，交付剪辑速度、Blend Type、参数单位、阈值、二维坐标、阻尼、输入样本、权重结果、根速度和边界测试。",
  ],
  failureTrace: [
    "复用“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：脚本传入世界速度而Blend Tree按归一化局部速度设阈值，权重长期饱和",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“参数单位与范围固定，1D或2D维度选择有依据，输入到权重和最终运动的映射可采样”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "参数单位与范围固定，1D或2D维度选择有依据，输入到权重和最终运动的映射可采样",
  fault: "脚本传入世界速度而Blend Tree按归一化局部速度设阈值，权重长期饱和",
  artifact:
    "剪辑速度、Blend Type、参数单位、阈值、二维坐标、阻尼、输入样本、权重结果、根速度和边界测试。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 6. Advanced Character Animation：可控角色与 Blend Tree”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan06AdvancedCharacterAnimationTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan06AdvancedCharacterAnimationStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan06AdvancedCharacterAnimationRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
