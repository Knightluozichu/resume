"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《Unity Animation Essentials》综合复核：时间、状态、空间与输出",
  question:
    "怎样证明七章动画资产在编辑器预览与运行构建中共享一致的时间、状态、空间和输出合同？",
  concepts: [
    "Chapter 1. Animation Fundamentals：变化、时间与代码动画",
    "Chapter 2. Sprite Animation：导入、图集与帧序列诊断",
    "Chapter 3. Native Animation：Animation 窗口与粒子系统",
    "Chapter 4. Noncharacter Animation with Mecanim：门与按钮状态图",
    "Chapter 5. Character Animation Fundamentals：骨骼、Avatar 与根运动",
    "Chapter 6. Advanced Character Animation：可控角色与 Blend Tree",
    "Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链",
  ],
  clips: [
    {
      name: "场景主时间轴",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "角色状态轨",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "表现输出轨",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行锁定资产时钟与空间基准，保存关键帧、参数或空间基准",
    "推进运行状态角色和表现链，记录采样时间、活动状态和属性写入者",
    "完成跨帧率平台复核并回退，交付34组条目检查、资产依赖、关键帧、参数日志、状态轨、Avatar与根轨迹、粒子形变IK视频结果和跨平台测试。",
  ],
  failureTrace: [
    "复用“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：演示只录制一次编辑器成功画面，没有低高帧率、冷启动、状态中断或目标平台验证",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“资产版本、绑定路径、时钟、参数、状态、Avatar、根运动和平台输出形成可重放证据链”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "资产版本、绑定路径、时钟、参数、状态、Avatar、根运动和平台输出形成可重放证据链",
  fault:
    "演示只录制一次编辑器成功画面，没有低高帧率、冷启动、状态中断或目标平台验证",
  artifact:
    "34组条目检查、资产依赖、关键帧、参数日志、状态轨、Avatar与根轨迹、粒子形变IK视频结果和跨平台测试。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“《Unity Animation Essentials》综合复核：时间、状态、空间与输出”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function UanOfficialFinalReviewTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function UanOfficialFinalReviewStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function UanOfficialFinalReviewRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
