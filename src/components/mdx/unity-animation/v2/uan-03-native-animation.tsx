"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-03",
  title: "Chapter 3. Native Animation：Animation 窗口与粒子系统",
  question:
    "怎样区分单层级Animation Clip、多对象编排和事件副作用，并让粒子发射与渲染结果可复核？",
  concepts: [
    "The Animation window - creating a fly-through",
    "Animating multiple objects together；Invoking functions from animations",
    "Particle Systems；Starting a firefly particle system",
    "The Particle System's global properties；Emitter shape and emission rate",
    "Particle Renderer；Particle velocity；Particle color and disappearance",
  ],
  clips: [
    {
      name: "飞行镜头",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "事件轨",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "萤火粒子",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 3. Native Animation：Animation 窗口与粒子系统”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行录制多属性关键帧，保存关键帧、参数或空间基准",
    "推进绑定可追踪动画事件，记录采样时间、活动状态和属性写入者",
    "完成验证粒子发射渲染与消亡，交付层级与绑定路径、关键帧、曲线、事件时间与调用ID、粒子模块快照、边界、渲染结果和重放日志。",
  ],
  failureTrace: [
    "复用“Chapter 3. Native Animation：Animation 窗口与粒子系统”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：动画事件在循环剪辑中重复触发非幂等逻辑，粒子实例和游戏状态持续累积",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“剪辑只驱动声明属性，事件函数幂等且可追踪，粒子生命周期与发射模块拥有明确基线”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "剪辑只驱动声明属性，事件函数幂等且可追踪，粒子生命周期与发射模块拥有明确基线",
  fault: "动画事件在循环剪辑中重复触发非幂等逻辑，粒子实例和游戏状态持续累积",
  artifact:
    "层级与绑定路径、关键帧、曲线、事件时间与调用ID、粒子模块快照、边界、渲染结果和重放日志。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 3. Native Animation：Animation 窗口与粒子系统”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 3. Native Animation：Animation 窗口与粒子系统”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 3. Native Animation：Animation 窗口与粒子系统”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 3. Native Animation：Animation 窗口与粒子系统”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan03NativeAnimationTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan03NativeAnimationStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan03NativeAnimationRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
