import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第10章 快到碗里来——DirectX大局观认知";
const focus = "辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口";
const stages = [
  "识别组件",
  "核对版本",
  "建立接口",
  "验证能力",
  "登记替代"
];
const nodes = [
  {
    "label": "第10章 快到碗里来——DirectX大局观认知",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 第10章 快到碗里来——DirectX大局观认知，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1 对DirectX的认知",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1 对DirectX的认知，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.1 DirectX的目前地位",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1.1 DirectX的目前地位，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.2 DirectX的两种不同含义",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1.2 DirectX的两种不同含义，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.3 DirectX的几套开发方案",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1.3 DirectX的几套开发方案，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.4 图形API体系认知",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1.4 图形API体系认知，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.5 微软的宠儿——DirectX",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.1.5 微软的宠儿——DirectX，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.1.6 不甘做备胎——OpenGL",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，10.1.6 不甘做备胎——OpenGL 限定本章的一个知识坐标；独立解释围绕“按输入输出、对象生命周期和平台支持把组件映射到子系统边界”展开，并以“每个组件选择都标明版本、责任、资源寿命和现代替代坐标”结束。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.2 宿敌的世纪之斗：DirectX与OpenGL的博弈",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.2 宿敌的世纪之斗：DirectX与OpenGL的博弈，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.3 DirectX开发环境的配置",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.3 DirectX开发环境的配置，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.4 新版DirectXSDK的组件介绍",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.4 新版DirectXSDK的组件介绍，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.4.1 新版DirectXSDK中现存的组件",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.4.1 新版DirectXSDK中现存的组件，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.4.2 新版DirectXSDK中被移除的组件",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.4.2 新版DirectXSDK中被移除的组件，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.4.3 关于当前2D游戏开发可用的图形API",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.4.3 关于当前2D游戏开发可用的图形API，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留组件矩阵、接口版本、支持状态和迁移决策。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.5 对DirectXSDK文件组成的剖析",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.5 对DirectXSDK文件组成的剖析，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.6 让DirectXSDK物尽其用",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.6 让DirectXSDK物尽其用，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.7 选择我们的DirectX学习版本",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.7 选择我们的DirectX学习版本，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.7.1 DirectX的几套版本简介",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.7.1 DirectX的几套版本简介，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.7.2 DirectX11 vs DirectX9，现阶段学哪个好",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.7.2 DirectX11 vs DirectX9，现阶段学哪个好，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.8 当前Direct3D中的两套渲染体系",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.8 当前Direct3D中的两套渲染体系，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.9 Direct3D程序的体系结构",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.9 Direct3D程序的体系结构，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留组件矩阵、接口版本、支持状态和迁移决策。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.10 学习DirectX的两个技巧",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.10 学习DirectX的两个技巧，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  },
  {
    "label": "10.11 章节小憩",
    "mechanism": "围绕辨认 DirectX 组件、COM 接口、Direct3D 9 年代边界和替代接口，对 10.11 章节小憩，收尾不是装饰，而是要求用组件矩阵、接口版本、支持状态和迁移决策复盘“每个组件选择都标明版本、责任、资源寿命和现代替代坐标”是否在正常和失败路径同时成立。",
    "probe": "记录组件矩阵、接口版本、支持状态和迁移决策"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "DirectX 9 SDK",
  "modernLabel": "现代平台组件",
  "unit": "版本误配",
  "historicalBase": 14,
  "historicalSlope": 4.5,
  "modernBase": 7,
  "modernSlope": 1.4,
  "faultPenalty": 18,
  "invariant": "每个组件选择都标明版本、责任、资源寿命和现代替代坐标",
  "fault": "把废弃 D3DX 或 DirectInput 示例当作当前新项目默认方案",
  "evidence": "组件矩阵、接口版本、支持状态和迁移决策"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj10DirectxOverviewMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj10DirectxOverviewExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj10DirectxOverviewEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
