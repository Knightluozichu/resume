"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-04",
  title: "Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图",
  question:
    "怎样让门只在合法参数变化时从关闭过渡到开启，并防止重复输入、过渡中断或双重驱动？",
  concepts: [
    "Preparing a scene with the prototyping assets",
    "Creating animations for the button and door",
    "Getting started with Mecanim",
    "Mecanim transitions and parameters",
    "Creating a door-open Mecanim graph；Creating scene interactions",
  ],
  clips: [
    {
      name: "按钮按下",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "门开启",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "门关闭",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行创建按钮与门剪辑，保存关键帧、参数或空间基准",
    "推进组装参数化状态图，记录采样时间、活动状态和属性写入者",
    "完成执行交互并检查中断，交付场景对象、剪辑、控制器、状态、参数、过渡条件、退出时间、中断设置、写入者和运行状态日志。",
  ],
  failureTrace: [
    "复用“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：脚本和Animator同时写门的Transform，导致过渡末端抖动且无法确定权威状态",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“一个权威状态机驱动门属性，参数变化可追溯，过渡条件、时长与中断策略显式”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "一个权威状态机驱动门属性，参数变化可追溯，过渡条件、时长与中断策略显式",
  fault:
    "脚本和Animator同时写门的Transform，导致过渡末端抖动且无法确定权威状态",
  artifact:
    "场景对象、剪辑、控制器、状态、参数、过渡条件、退出时间、中断设置、写入者和运行状态日志。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan04NoncharacterAnimationMecanimTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan04NoncharacterAnimationMecanimStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan04NoncharacterAnimationMecanimRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
