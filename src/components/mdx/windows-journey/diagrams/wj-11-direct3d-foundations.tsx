import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第11章 三维内功心法——Direct3D编程基础";
const focus = "从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期";
const stages = [
  "创建 D3D",
  "选择设备",
  "配置呈现",
  "提交场景",
  "检测丢失"
];
const nodes = [
  {
    "label": "第11章 三维内功心法——Direct3D编程基础",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 第11章 三维内功心法——Direct3D编程基础，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.1 典型Direct3D程序流程分析",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.1 典型Direct3D程序流程分析，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.2 对COM接口对象的一些介绍",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.2 对COM接口对象的一些介绍，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.3 写一个DirectX程序通用框架",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.3 写一个DirectX程序通用框架，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4 化腐朽为神奇——Direct3D初始化四步曲",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4 化腐朽为神奇——Direct3D初始化四步曲，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.1 Direct3D初始化四步曲概述",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.1 Direct3D初始化四步曲概述，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.2 Direct3D初始化四步曲之一：创接口",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.2 Direct3D初始化四步曲之一：创接口，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.3 Direct3D初始化四步曲之二：取信息",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.3 Direct3D初始化四步曲之二：取信息，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.4 Direct3D初始化四步曲之三：填内容",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.4 Direct3D初始化四步曲之三：填内容，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.5 Direct3D初始化四步曲之四：创设备",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.5 Direct3D初始化四步曲之四：创设备，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.6 Direct3D初始化四步曲代码赏析",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.6 Direct3D初始化四步曲代码赏析，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.4.7 示例程序D3Ddemo1",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.4.7 示例程序D3Ddemo1，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.5 深入理解Direct3D动画显示技术——交换链",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.5 深入理解Direct3D动画显示技术——交换链，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.6 对固定功能渲染流水线体系的理解",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.6 对固定功能渲染流水线体系的理解 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.7 Direct3D中的“绘制金钥匙”—— Direct3D设备接口",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.7 Direct3D中的“绘制金钥匙”—— Direct3D设备接口，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.8 Direct3D中二维文本的绘制",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.8 Direct3D中二维文本的绘制，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.8.1 D3DXCreateFont函数",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.8.1 D3DXCreateFont函数，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.8.2 DrawText函数",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.8.2 DrawText函数，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9 起承转合的艺术：Direct3D渲染五步曲",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.9 起承转合的艺术：Direct3D渲染五步曲，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.1 Direct3D渲染五步曲概述",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.9.1 Direct3D渲染五步曲概述，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.2 五步曲之一：清屏操作",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.9.2 五步曲之一：清屏操作 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.3 五步曲之二：开始绘制",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.9.3 五步曲之二：开始绘制 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.4 五步曲之三：正式绘制",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.9.4 五步曲之三：正式绘制 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.5 五步曲之四：结束绘制",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.9.5 五步曲之四：结束绘制 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.6 五步曲之五：翻转显示",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，11.9.6 五步曲之五：翻转显示 限定本章的一个知识坐标；独立解释围绕“枚举能力并创建设备，按 Clear、BeginScene、绘制、EndScene、Present 发布一帧”展开，并以“设备状态、场景配对和资源释放在成功与失败路径都完整”结束。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.7 Direct3D渲染五步曲代码整体赏析",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.9.7 Direct3D渲染五步曲代码整体赏析，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.9.8 示例程序D3Ddemo2",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.9.8 示例程序D3Ddemo2，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  },
  {
    "label": "11.10 章节小憩",
    "mechanism": "围绕从 IDirect3D9 到设备、交换链、后备缓冲和 Present 建立帧生命周期，对 11.10 章节小憩，收尾不是装饰，而是要求用HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹复盘“设备状态、场景配对和资源释放在成功与失败路径都完整”是否在正常和失败路径同时成立。",
    "probe": "记录HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "Direct3D 9 设备",
  "modernLabel": "显式资源设备",
  "unit": "失败调用",
  "historicalBase": 13,
  "historicalSlope": 4.8,
  "modernBase": 7,
  "modernSlope": 1.5,
  "faultPenalty": 24,
  "invariant": "设备状态、场景配对和资源释放在成功与失败路径都完整",
  "fault": "全屏焦点切换后忽略 D3DERR_DEVICELOST",
  "evidence": "HRESULT、呈现参数、设备状态、COM 引用和恢复轨迹"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj11Direct3dFoundationsMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj11Direct3dFoundationsExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj11Direct3dFoundationsEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
