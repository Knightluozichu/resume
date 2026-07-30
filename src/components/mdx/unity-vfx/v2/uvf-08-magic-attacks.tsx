"use client";

import {
  UnityVfxEvidenceLab,
  type UnityVfxEvidenceModel,
} from "@/components/mdx/unity-vfx/v2/vfx-budget-evidence-lab";

const model = {
  unitId: "uvf-chapter-08",
  title: "第8章 法术攻击特效案例",
  question: "冰冻、法系旋风与闪电的表面、环流、分支和持续时间怎样证伪？",
  concepts: [
    "第8章 法术攻击特效案例",
    "8.1 实例：冰冻术特效案例讲解",
    "8.2 实例：法系旋风特效案例讲解",
    "8.3 实例：闪电特效案例讲解",
  ],
  invariant: "目标表面、空间、随机种子、分支规则、材质、时序和恢复帧必须可重放",
  fault: "更换目标网格或法线后仍沿用旧遮罩，并把穿插归因于随机种子",
  artifact: "目标网格身份、遮罩、路径与种子表、材质Pass、时序捕获和同输入恢复",
  contracts: [
    {
      phase: "准备与预兆",
      asset:
        "第8章 法术攻击特效案例的源资产、导入设置、Prefab依赖和固定随机种子",
      emitter:
        "发射器尚未进入峰值，先记录Shape、Simulation Space、延迟和触发事件",
      material: "固定渲染管线、Shader、混合、深度、队列、关键字和Pass",
      camera: "固定Game摄像机、投影、位置、分辨率、质量级别和目标平台",
      observation:
        "第8章 法术攻击特效案例的轮廓、方向、遮挡和触发前状态符合预注册参考帧",
    },
    {
      phase: "发射与峰值",
      asset:
        "第8章 法术攻击特效案例只使用冻结的Mesh、纹理、动画、材质和Prefab版本",
      emitter:
        "执行“固定目标网格与技能时序，比较冰冻覆盖、旋风环流和闪电分支，保存遮罩、发射路径、材质与首帧”，记录Rate、Burst、寿命、速度、模块和活动粒子",
      material: "保存Frame Debugger中的事件、材质Pass、透明排序和中间画面",
      camera: "在同一Game摄像机与目标设备上记录覆盖比例、CPU与GPU采样",
      observation:
        "第8章 法术攻击特效案例的首个峰值、持续窗口、屏幕覆盖和性能工件能相互对齐",
    },
    {
      phase: "消散与回收",
      asset:
        "第8章 法术攻击特效案例撤销唯一变量并从相同源资产、Prefab和场景重新实例化",
      emitter: "停止发射，等待现存粒子死亡，检查子发射器、拖尾、碰撞与池对象",
      material: "确认临时材质、关键字、Renderer和后处理状态没有残留",
      camera: "以相同摄像机、目标设备和输入重放参考帧与Profiler区间",
      observation:
        "第8章 法术攻击特效案例重新满足“目标表面、空间、随机种子、分支规则、材质、时序和恢复帧必须可重放”，且场景、池和渲染事件无残留",
    },
  ],
  captures: [
    {
      name: "第8章 法术攻击特效案例参考捕获",
      setup:
        "固定编辑器补丁、渲染管线、目标设备、资产和摄像机后执行：固定目标网格与技能时序，比较冰冻覆盖、旋风环流和闪电分支，保存遮罩、发射路径、材质与首帧",
      prediction:
        "参考帧、Profiler区间和Frame Debugger事件共同支持冰冻表面、法系旋风环流、闪电分支、随机性、材质与时序的当前观察。",
      boundary:
        "这是本站独立实验；公开目录没有提供原书正文、工程文件或性能数据，不能声称复现作者数值。",
    },
    {
      name: "第8章 法术攻击特效案例单一故障捕获",
      setup:
        "保持其余条件不变，只注入“更换目标网格或法线后仍沿用旧遮罩，并把穿插归因于随机种子”",
      prediction:
        "首个画面、状态或测量分岔应能由该变量解释，并交付目标网格身份、遮罩、路径与种子表、材质Pass、时序捕获和同输入恢复。",
      boundary:
        "若多个资产、渲染开关或设备条件同时变化，就保留竞争性解释，不生成风险分或置信度。",
    },
    {
      name: "第8章 法术攻击特效案例同输入恢复捕获",
      setup: "撤销受控变量，清理场景与对象池，从同一资产和项目身份重建",
      prediction:
        "参考画面、渲染事件和目标机测量恢复，并再次满足“目标表面、空间、随机种子、分支规则、材质、时序和恢复帧必须可重放”。",
      boundary:
        "恢复只修生成结果无效；必须回到源资产、导入设置、Prefab或项目配置，并报告所有残留和未知项。",
    },
  ],
  gates: [
    {
      label: "原版、目录与访问门",
      detail:
        "第8章 法术攻击特效案例只用天瓏版本页和公开目录限定2017首版范围；outline-only不支持复制原文、图片、工程或虚构作者判断。",
    },
    {
      label: "编辑器与渲染版本门",
      detail:
        "第8章 法术攻击特效案例记录实际Unity补丁、目标平台、Built-in/URP/HDRP、色彩空间、质量级别和包版本；Unity 6·0手册与Unity 6·3 LTS项目分开标示。",
    },
    {
      label: "资产、Prefab与许可证门",
      detail:
        "第8章 法术攻击特效案例固定源资产哈希、Importer、Prefab依赖、材质和第三方许可证；缺少授权的原书工程、图片或插件不复制。",
    },
    {
      label: "发射器与生命周期门",
      detail:
        "第8章 法术攻击特效案例保存触发、Rate、Burst、寿命、Simulation Space、停止、池化和回收状态，并只改变“更换目标网格或法线后仍沿用旧遮罩，并把穿插归因于随机种子”。",
    },
    {
      label: "摄像机与渲染工件门",
      detail:
        "第8章 法术攻击特效案例固定Game摄像机、分辨率和参考帧，保存Frame Debugger或图形捕获中的Pass、透明叠层和排序。",
    },
    {
      label: "目标机测量与恢复门",
      detail:
        "第8章 法术攻击特效案例把预算公式当估算，以目标设备Profiler为裁决；撤销后用同一输入恢复画面、状态与测量并交付目标网格身份、遮罩、路径与种子表、材质Pass、时序捕获和同输入恢复。",
    },
  ],
} as const satisfies UnityVfxEvidenceModel;

export function Uvf08MagicAttacksEffectContractLab() {
  return <UnityVfxEvidenceLab model={model} view="effect-contract" />;
}

export function Uvf08MagicAttacksBudgetModelLab() {
  return <UnityVfxEvidenceLab model={model} view="budget-model" />;
}

export function Uvf08MagicAttacksCaptureGateLab() {
  return <UnityVfxEvidenceLab model={model} view="capture-gate" />;
}
