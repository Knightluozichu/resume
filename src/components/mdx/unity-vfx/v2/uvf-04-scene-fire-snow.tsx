"use client";

import {
  UnityVfxEvidenceLab,
  type UnityVfxEvidenceModel,
} from "@/components/mdx/unity-vfx/v2/vfx-budget-evidence-lab";

const model = {
  unitId: "uvf-chapter-04",
  title: "第4章 Unity3D场景特效分析与讲解",
  question:
    "火焰与雪花的连续发射、空间分布、透明混合和摄像机覆盖怎样分别验证？",
  concepts: [
    "第4章 Unity3D场景特效分析与讲解",
    "4.1 实例：火焰特效案例讲解",
    "4.2 实例：雪花飞舞特效案例讲解",
  ],
  invariant:
    "火焰与雪花必须各自绑定发射空间、生命周期、材质、摄像机覆盖和同输入恢复",
  fault: "扩大雪花发射盒和火焰Quad尺寸，却继续使用旧的覆盖比例与GPU捕获",
  artifact:
    "发射器参数、生命周期曲线、覆盖帧、片元估算、Profiler与Frame Debugger捕获",
  contracts: [
    {
      phase: "准备与预兆",
      asset:
        "第4章 Unity3D场景特效分析与讲解的源资产、导入设置、Prefab依赖和固定随机种子",
      emitter:
        "发射器尚未进入峰值，先记录Shape、Simulation Space、延迟和触发事件",
      material: "固定渲染管线、Shader、混合、深度、队列、关键字和Pass",
      camera: "固定Game摄像机、投影、位置、分辨率、质量级别和目标平台",
      observation:
        "第4章 Unity3D场景特效分析与讲解的轮廓、方向、遮挡和触发前状态符合预注册参考帧",
    },
    {
      phase: "发射与峰值",
      asset:
        "第4章 Unity3D场景特效分析与讲解只使用冻结的Mesh、纹理、动画、材质和Prefab版本",
      emitter:
        "执行“在固定摄像机中比较火焰连续发射与雪花场发射，记录寿命、速度、形状、屏幕覆盖、透明叠层和材质Pass”，记录Rate、Burst、寿命、速度、模块和活动粒子",
      material: "保存Frame Debugger中的事件、材质Pass、透明排序和中间画面",
      camera: "在同一Game摄像机与目标设备上记录覆盖比例、CPU与GPU采样",
      observation:
        "第4章 Unity3D场景特效分析与讲解的首个峰值、持续窗口、屏幕覆盖和性能工件能相互对齐",
    },
    {
      phase: "消散与回收",
      asset:
        "第4章 Unity3D场景特效分析与讲解撤销唯一变量并从相同源资产、Prefab和场景重新实例化",
      emitter: "停止发射，等待现存粒子死亡，检查子发射器、拖尾、碰撞与池对象",
      material: "确认临时材质、关键字、Renderer和后处理状态没有残留",
      camera: "以相同摄像机、目标设备和输入重放参考帧与Profiler区间",
      observation:
        "第4章 Unity3D场景特效分析与讲解重新满足“火焰与雪花必须各自绑定发射空间、生命周期、材质、摄像机覆盖和同输入恢复”，且场景、池和渲染事件无残留",
    },
  ],
  captures: [
    {
      name: "第4章 Unity3D场景特效分析与讲解参考捕获",
      setup:
        "固定编辑器补丁、渲染管线、目标设备、资产和摄像机后执行：在固定摄像机中比较火焰连续发射与雪花场发射，记录寿命、速度、形状、屏幕覆盖、透明叠层和材质Pass",
      prediction:
        "参考帧、Profiler区间和Frame Debugger事件共同支持火焰连续发射、雪花场发射、透明混合、空间和摄像机覆盖的当前观察。",
      boundary:
        "这是本站独立实验；公开目录没有提供原书正文、工程文件或性能数据，不能声称复现作者数值。",
    },
    {
      name: "第4章 Unity3D场景特效分析与讲解单一故障捕获",
      setup:
        "保持其余条件不变，只注入“扩大雪花发射盒和火焰Quad尺寸，却继续使用旧的覆盖比例与GPU捕获”",
      prediction:
        "首个画面、状态或测量分岔应能由该变量解释，并交付发射器参数、生命周期曲线、覆盖帧、片元估算、Profiler与Frame Debugger捕获。",
      boundary:
        "若多个资产、渲染开关或设备条件同时变化，就保留竞争性解释，不生成风险分或置信度。",
    },
    {
      name: "第4章 Unity3D场景特效分析与讲解同输入恢复捕获",
      setup: "撤销受控变量，清理场景与对象池，从同一资产和项目身份重建",
      prediction:
        "参考画面、渲染事件和目标机测量恢复，并再次满足“火焰与雪花必须各自绑定发射空间、生命周期、材质、摄像机覆盖和同输入恢复”。",
      boundary:
        "恢复只修生成结果无效；必须回到源资产、导入设置、Prefab或项目配置，并报告所有残留和未知项。",
    },
  ],
  gates: [
    {
      label: "原版、目录与访问门",
      detail:
        "第4章 Unity3D场景特效分析与讲解只用天瓏版本页和公开目录限定2017首版范围；outline-only不支持复制原文、图片、工程或虚构作者判断。",
    },
    {
      label: "编辑器与渲染版本门",
      detail:
        "第4章 Unity3D场景特效分析与讲解记录实际Unity补丁、目标平台、Built-in/URP/HDRP、色彩空间、质量级别和包版本；Unity 6·0手册与Unity 6·3 LTS项目分开标示。",
    },
    {
      label: "资产、Prefab与许可证门",
      detail:
        "第4章 Unity3D场景特效分析与讲解固定源资产哈希、Importer、Prefab依赖、材质和第三方许可证；缺少授权的原书工程、图片或插件不复制。",
    },
    {
      label: "发射器与生命周期门",
      detail:
        "第4章 Unity3D场景特效分析与讲解保存触发、Rate、Burst、寿命、Simulation Space、停止、池化和回收状态，并只改变“扩大雪花发射盒和火焰Quad尺寸，却继续使用旧的覆盖比例与GPU捕获”。",
    },
    {
      label: "摄像机与渲染工件门",
      detail:
        "第4章 Unity3D场景特效分析与讲解固定Game摄像机、分辨率和参考帧，保存Frame Debugger或图形捕获中的Pass、透明叠层和排序。",
    },
    {
      label: "目标机测量与恢复门",
      detail:
        "第4章 Unity3D场景特效分析与讲解把预算公式当估算，以目标设备Profiler为裁决；撤销后用同一输入恢复画面、状态与测量并交付发射器参数、生命周期曲线、覆盖帧、片元估算、Profiler与Frame Debugger捕获。",
    },
  ],
} as const satisfies UnityVfxEvidenceModel;

export function Uvf04SceneFireSnowEffectContractLab() {
  return <UnityVfxEvidenceLab model={model} view="effect-contract" />;
}

export function Uvf04SceneFireSnowBudgetModelLab() {
  return <UnityVfxEvidenceLab model={model} view="budget-model" />;
}

export function Uvf04SceneFireSnowCaptureGateLab() {
  return <UnityVfxEvidenceLab model={model} view="capture-gate" />;
}
