"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《Unity Animation Essentials》34组目录学习地图",
  question:
    "怎样让2015年的Unity 4/5工作流保持可辨认，同时用Unity 6资料验证稳定机制和迁移点？",
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
      name: "全书时间轴",
      duration: "1.2 s",
      property: "Transform / Sprite / BlendShape",
      from: "基线属性",
      to: "下一关键状态",
      clock: "Animation Clip time",
    },
    {
      name: "状态图总览",
      duration: "1.8 s",
      property: "Animator parameter / state weight",
      from: "上游已验证状态",
      to: "下一关键状态",
      clock: "Animator normalized time",
    },
    {
      name: "运行迁移轨",
      duration: "2.4 s",
      property: "Particle / IK / video output",
      from: "上游已验证状态",
      to: "运行输出与证据",
      clock: "runtime or media clock",
    },
  ],
  normalTrace: [
    "为“《Unity Animation Essentials》34组目录学习地图”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态",
    "执行锁定目录与引擎时代，保存关键帧、参数或空间基准",
    "推进贯通剪辑状态与空间，记录采样时间、活动状态和属性写入者",
    "完成登记运行证据和迁移，交付34组条目映射、Unity时代标签、资产依赖、时间采样、状态轨迹、空间基准、运行截图、迁移表和回退说明。",
  ],
  failureTrace: [
    "复用“《Unity Animation Essentials》34组目录学习地图”相同的Unity版本、场景、资产、输入和初始状态",
    "只注入动画故障：把当前编辑器截图和VideoPlayer等现行接口直接写成2015年原书步骤",
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    "依据“七章目录各有唯一归属，时间、属性、状态、空间与输出都可重放，现代接口不倒填为原书内容”拒绝资产并恢复已知场景快照",
  ],
  invariant:
    "七章目录各有唯一归属，时间、属性、状态、空间与输出都可重放，现代接口不倒填为原书内容",
  fault: "把当前编辑器截图和VideoPlayer等现行接口直接写成2015年原书步骤",
  artifact:
    "34组条目映射、Unity时代标签、资产依赖、时间采样、状态轨迹、空间基准、运行截图、迁移表和回退说明。",
  gates: [
    {
      label: "资产绑定",
      detail:
        "“《Unity Animation Essentials》34组目录学习地图”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。",
    },
    {
      label: "时钟一致",
      detail:
        "“《Unity Animation Essentials》34组目录学习地图”明确使用Clip、Animator、deltaTime、物理或媒体时钟。",
    },
    {
      label: "权威写入",
      detail:
        "“《Unity Animation Essentials》34组目录学习地图”的每个属性只有一个权威驱动者，脚本与Animator不双写。",
    },
    {
      label: "平台验证",
      detail:
        "“《Unity Animation Essentials》34组目录学习地图”经过冷启动、边界输入、不同帧率和目标构建复核。",
    },
  ],
} satisfies UnityAnimationEvidenceModel;

export function UanOfficialLearningMapTimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function UanOfficialLearningMapStateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function UanOfficialLearningMapRuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
}
