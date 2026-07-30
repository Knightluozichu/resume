"use client";

import {
  UnityVfxEvidenceLab,
  type UnityVfxEvidenceModel,
} from "@/components/mdx/unity-vfx/v2/vfx-budget-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图",
  question: "怎样把9章75个正式坐标组织成版本、资产、渲染、预算与复现地图？",
  concepts: [
    "第1章 Unity3D游戏引擎概述",
    "1.1 初识Unity3D",
    "1.2 了解Unity3D发展",
    "1.3 Unity游戏概说",
    "1.3.1 网页游戏概述",
    "1.3.2 手机游戏概述",
    "1.4 Unity3D学习技巧",
    "1.5 如何安装Unity3D",
    "第2章 游戏特效基础知识",
    "2.1 游戏特效概述",
    "2.1.1 什么是游戏特效",
    "2.1.2 游戏特效的重要性",
    "2.1.3 游戏特效的自然性",
    "2.2 游戏特效的类型",
    "2.2.1 粒子动画特效",
    "2.2.2 模型动画特效",
    "2.2.3 贴图动画特效",
    "2.2.4 混合特效",
    "2.3 游戏特效的基本点",
    "2.4 游戏特效分析",
    "2.5 游戏制作规范概述",
    "2.5.1 手机游戏特效规范",
    "2.5.2 手机游戏特效图片大小要求",
    "2.5.3 手机游戏特效贴图的格式要求",
    "2.6 游戏特效贴图设计",
    "2.7 游戏特效的色彩感",
    "2.7.1 色彩基础概述",
    "2.7.2 认识色彩的情感",
    "2.8 游戏特效的情感设计",
    "2.9 游戏特效制作常用软件",
    "第3章 Unity3D基础知识入门",
    "3.1 Unity3D界面介绍",
    "3.2 如何建立项目工程",
    "3.3 了解Importing Assets（导入资源）",
    "3.3.1 Max模型导出设置",
    "3.3.2 Max模型导入Unity",
    "3.3.3 Max动画导出设置",
    "3.3.4 Max动画导入Unity",
    "3.4 认识Unity3D粒子系统",
    "3.4.1 粒子系统的建立",
    "3.4.2 Particle Properties（粒子属性）",
    "3.4.3 粒子的扩展属性（拾取外部模型发射）",
    "3.4.4 粒子的碰撞",
    "3.5 Unity3D资源管理",
    "3.5.1 Creating Prefab（创建预制体）",
    "3.5.2 Output Prefab（输出预制体）",
    "3.5.3 Imported Prefab（导入预制体）",
    "3.6 Materials and Shaders（材质与着色器）",
    "3.7 Lights（光源）",
    "3.8 Cameras（摄像机）介绍",
    "3.8.1 了解Cameras（摄像机）",
    "3.8.2 Cameras（摄像机）定位",
    "3.9 Unity3D插件介绍",
    "第4章 Unity3D场景特效分析与讲解",
    "4.1 实例：火焰特效案例讲解",
    "4.2 实例：雪花飞舞特效案例讲解",
    "第5章 Unity3D与MAX的基本配合",
    "5.1 实例：武器特效案例讲解",
    "5.2 实例：BUFF特效案例讲解",
    "5.3 实例：刀光特效案例讲解",
    "第6章 深入学习粒子系统",
    "6.1 实例：受击特效案例讲解",
    "6.2 实例：飞行弹道特效案例讲解",
    "6.3 实例：UI特效案例讲解",
    "第7章 物理攻击特效案例",
    "7.1 实例：旋风斩特效案例讲解",
    "7.2 实例：3连击特效案例讲解",
    "第8章 法术攻击特效案例",
    "8.1 实例：冰冻术特效案例讲解",
    "8.2 实例：法系旋风特效案例讲解",
    "8.3 实例：闪电特效案例讲解",
    "第9章 通用类技能特效案例",
    "9.1 实例：加血特效案例讲解",
    "9.2 实例：传送门特效案例讲解",
    "9.3 实例：升级特效案例讲解",
  ],
  invariant:
    "75个正式坐标都必须绑定来源边界、时代轨、可观察合同、单变量故障、目标机捕获和恢复条件",
  fault: "把公开目录当成原书正文，或把Unity 6·3 LTS能力静默倒灌到2017首版",
  artifact: "75坐标覆盖表、九章依赖图、首版与当前迁移矩阵、预算与证据索引",
  contracts: [
    {
      phase: "准备与预兆",
      asset:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图的源资产、导入设置、Prefab依赖和固定随机种子",
      emitter:
        "发射器尚未进入峰值，先记录Shape、Simulation Space、延迟和触发事件",
      material: "固定渲染管线、Shader、混合、深度、队列、关键字和Pass",
      camera: "固定Game摄像机、投影、位置、分辨率、质量级别和目标平台",
      observation:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图的轮廓、方向、遮挡和触发前状态符合预注册参考帧",
    },
    {
      phase: "发射与峰值",
      asset:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图只使用冻结的Mesh、纹理、动画、材质和Prefab版本",
      emitter:
        "执行“选择一个正式坐标，沿版本身份、资源输入、特效阶段、渲染状态、目标机观察和同输入恢复定位前置条件”，记录Rate、Burst、寿命、速度、模块和活动粒子",
      material: "保存Frame Debugger中的事件、材质Pass、透明排序和中间画面",
      camera: "在同一Game摄像机与目标设备上记录覆盖比例、CPU与GPU采样",
      observation:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图的首个峰值、持续窗口、屏幕覆盖和性能工件能相互对齐",
    },
    {
      phase: "消散与回收",
      asset:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图撤销唯一变量并从相同源资产、Prefab和场景重新实例化",
      emitter: "停止发射，等待现存粒子死亡，检查子发射器、拖尾、碰撞与池对象",
      material: "确认临时材质、关键字、Renderer和后处理状态没有残留",
      camera: "以相同摄像机、目标设备和输入重放参考帧与Profiler区间",
      observation:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图重新满足“75个正式坐标都必须绑定来源边界、时代轨、可观察合同、单变量故障、目标机捕获和恢复条件”，且场景、池和渲染事件无残留",
    },
  ],
  captures: [
    {
      name: "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图参考捕获",
      setup:
        "固定编辑器补丁、渲染管线、目标设备、资产和摄像机后执行：选择一个正式坐标，沿版本身份、资源输入、特效阶段、渲染状态、目标机观察和同输入恢复定位前置条件",
      prediction:
        "参考帧、Profiler区间和Frame Debugger事件共同支持9个章根坐标与66个公开编号主题的全书路线的当前观察。",
      boundary:
        "这是本站独立实验；公开目录没有提供原书正文、工程文件或性能数据，不能声称复现作者数值。",
    },
    {
      name: "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图单一故障捕获",
      setup:
        "保持其余条件不变，只注入“把公开目录当成原书正文，或把Unity 6·3 LTS能力静默倒灌到2017首版”",
      prediction:
        "首个画面、状态或测量分岔应能由该变量解释，并交付75坐标覆盖表、九章依赖图、首版与当前迁移矩阵、预算与证据索引。",
      boundary:
        "若多个资产、渲染开关或设备条件同时变化，就保留竞争性解释，不生成风险分或置信度。",
    },
    {
      name: "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图同输入恢复捕获",
      setup: "撤销受控变量，清理场景与对象池，从同一资产和项目身份重建",
      prediction:
        "参考画面、渲染事件和目标机测量恢复，并再次满足“75个正式坐标都必须绑定来源边界、时代轨、可观察合同、单变量故障、目标机捕获和恢复条件”。",
      boundary:
        "恢复只修生成结果无效；必须回到源资产、导入设置、Prefab或项目配置，并报告所有残留和未知项。",
    },
  ],
  gates: [
    {
      label: "原版、目录与访问门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图只用天瓏版本页和公开目录限定2017首版范围；outline-only不支持复制原文、图片、工程或虚构作者判断。",
    },
    {
      label: "编辑器与渲染版本门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图记录实际Unity补丁、目标平台、Built-in/URP/HDRP、色彩空间、质量级别和包版本；Unity 6·0手册与Unity 6·3 LTS项目分开标示。",
    },
    {
      label: "资产、Prefab与许可证门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图固定源资产哈希、Importer、Prefab依赖、材质和第三方许可证；缺少授权的原书工程、图片或插件不复制。",
    },
    {
      label: "发射器与生命周期门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图保存触发、Rate、Burst、寿命、Simulation Space、停止、池化和回收状态，并只改变“把公开目录当成原书正文，或把Unity 6·3 LTS能力静默倒灌到2017首版”。",
    },
    {
      label: "摄像机与渲染工件门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图固定Game摄像机、分辨率和参考帧，保存Frame Debugger或图形捕获中的Pass、透明叠层和排序。",
    },
    {
      label: "目标机测量与恢复门",
      detail:
        "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图把预算公式当估算，以目标设备Profiler为裁决；撤销后用同一输入恢复画面、状态与测量并交付75坐标覆盖表、九章依赖图、首版与当前迁移矩阵、预算与证据索引。",
    },
  ],
} as const satisfies UnityVfxEvidenceModel;

export function UvfOfficialLearningMapEffectContractLab() {
  return <UnityVfxEvidenceLab model={model} view="effect-contract" />;
}

export function UvfOfficialLearningMapBudgetModelLab() {
  return <UnityVfxEvidenceLab model={model} view="budget-model" />;
}

export function UvfOfficialLearningMapCaptureGateLab() {
  return <UnityVfxEvidenceLab model={model} view="capture-gate" />;
}
