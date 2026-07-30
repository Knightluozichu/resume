"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "uan-07",
  title: "Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链",
  question:
    "怎样让形变、IK和视频各自使用正确资产与更新阶段，并明确MovieTexture的现代替代路径？",
  concepts: ["Blend Shapes", "Inverse Kinematics", "Movie textures"],
  clips: [
    {
      name: "面部权重",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "手部IK",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "视频输出",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行验证形变网格与权重，保存关键帧、参数或空间基准",
    "推进配置Avatar IK目标和回调，记录采样时间、活动状态和属性写入者",
    "完成迁移视频源播放器与输出，交付Blend Shape名称索引与权重、Avatar、IK Pass、目标与权重、VideoClip或URL、VideoPlayer输出、平台测试和迁移说明。",
  ],
  failureTrace: [
    "复用“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：把2015年的MovieTexture代码直接用于Unity 6，既没有VideoPlayer迁移也没有平台格式验证",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“Blend Shape索引与网格匹配，IK在有效Avatar和IK Pass下运行，视频源与输出目标可追溯”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "Blend Shape索引与网格匹配，IK在有效Avatar和IK Pass下运行，视频源与输出目标可追溯",
  fault:
    "把2015年的MovieTexture代码直接用于Unity 6，既没有VideoPlayer迁移也没有平台格式验证",
  artifact:
    "Blend Shape名称索引与权重、Avatar、IK Pass、目标与权重、VideoClip或URL、VideoPlayer输出、平台测试和迁移说明。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“Chapter 7. Blend Shapes, IK, and Movie Textures：三条高级表现链”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function Uan07BlendShapesIkMovieTexturesTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function Uan07BlendShapesIkMovieTexturesStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function Uan07BlendShapesIkMovieTexturesRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
