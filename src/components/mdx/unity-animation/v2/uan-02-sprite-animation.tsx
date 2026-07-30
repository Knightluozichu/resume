"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-02",
  title: "Chapter 2. Sprite Animation：导入、图集与帧序列诊断",
  question:
    "怎样从纹理导入设置追到Animation Clip采样，定位播放过快、循环错误或帧顺序颠倒？",
  concepts: [
    "Sprites - importing and configuration；Individual sprites；The sprite atlas",
    "Animation with sprites",
    "Sprite animation is too slow or too fast",
    "Animation shouldn't be looping",
    "Frames play in the wrong order",
  ],
  clips: [
    {
      name: "图集切片",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "待机序列",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "行走序列",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行核对纹理切片和轴心，保存关键帧、参数或空间基准",
    "推进生成帧序列与采样率，记录采样时间、活动状态和属性写入者",
    "完成验证循环顺序和运行引用，交付纹理导入设置、切片矩形、轴心、帧清单、采样率、loopTime、控制器引用、运行录屏和故障对照。",
  ],
  failureTrace: [
    "复用“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：图集切片顺序与剪辑关键帧顺序不一致，预览和运行时出现倒序跳帧",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“切片结果、帧序列、采样率、循环设置与运行时控制器引用同一组版本化资产”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "切片结果、帧序列、采样率、循环设置与运行时控制器引用同一组版本化资产",
  fault: "图集切片顺序与剪辑关键帧顺序不一致，预览和运行时出现倒序跳帧",
  artifact:
    "纹理导入设置、切片矩形、轴心、帧清单、采样率、loopTime、控制器引用、运行录屏和故障对照。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 2. Sprite Animation：导入、图集与帧序列诊断”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan02SpriteAnimationTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan02SpriteAnimationStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan02SpriteAnimationRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
