import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第15章 做游戏的主人——输出控制利器DirectInput";
const focus = "理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复";
const stages = [
  "枚举设备",
  "设置格式",
  "设置协作",
  "轮询状态",
  "丢失重获"
];
const nodes = [
  {
    "label": "第15章 做游戏的主人——输出控制利器DirectInput",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 第15章 做游戏的主人——输出控制利器DirectInput，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、获取状态、原始输入、动作边沿和焦点轨迹。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.1 引言",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.1 引言 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.2 DirectInput接口概述",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.2 DirectInput接口概述，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3 DirectInput使用步骤详解",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.3 DirectInput使用步骤详解，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.1 头文件和库文件的包含",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.1 头文件和库文件的包含 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.2 创建DirectInput接口和设备",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.3.2 创建DirectInput接口和设备，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.3 设置数据格式",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.3 设置数据格式 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.4 设置协作级别",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.4 设置协作级别 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.5 设置特殊属性",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.5 设置特殊属性 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.6 获取和轮询设备",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.6 获取和轮询设备 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.3.7 读取设备信息",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，15.3.7 读取设备信息 限定本章的一个知识坐标；独立解释围绕“创建并配置设备，Acquire 后读取状态，失败时重新获取并归一化为动作”展开，并以“设备丢失和重新获取不会制造卡键或重复动作”结束。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.4 精炼：DirectInput使用五步曲",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.4 精炼：DirectInput使用五步曲，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.5 DirectInput键盘按键键值总结",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.5 DirectInput键盘按键键值总结，收尾不是装饰，而是要求用HRESULT、获取状态、原始输入、动作边沿和焦点轨迹复盘“设备丢失和重新获取不会制造卡键或重复动作”是否在正常和失败路径同时成立。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.6 DirectInput鼠标按键键值总结",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.6 DirectInput鼠标按键键值总结，收尾不是装饰，而是要求用HRESULT、获取状态、原始输入、动作边沿和焦点轨迹复盘“设备丢失和重新获取不会制造卡键或重复动作”是否在正常和失败路径同时成立。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.7 示例程序D3Ddemo8",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.7 示例程序D3Ddemo8，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、获取状态、原始输入、动作边沿和焦点轨迹。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.8 手把手封装DirectInput到类中",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.8 手把手封装DirectInput到类中，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.9 封装好的DirectInput类的使用",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.9 封装好的DirectInput类的使用，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.10 示例程序D3Ddemo9",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.10 示例程序D3Ddemo9，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留HRESULT、获取状态、原始输入、动作边沿和焦点轨迹。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  },
  {
    "label": "15.11 章节小憩",
    "mechanism": "围绕理解 DirectInput 设备创建、数据格式、协作级别、获取与丢失恢复，对 15.11 章节小憩，收尾不是装饰，而是要求用HRESULT、获取状态、原始输入、动作边沿和焦点轨迹复盘“设备丢失和重新获取不会制造卡键或重复动作”是否在正常和失败路径同时成立。",
    "probe": "记录HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "DirectInput 轮询",
  "modernLabel": "消息/XInput 动作层",
  "unit": "卡住动作",
  "historicalBase": 15,
  "historicalSlope": 5,
  "modernBase": 7,
  "modernSlope": 1.4,
  "faultPenalty": 25,
  "invariant": "设备丢失和重新获取不会制造卡键或重复动作",
  "fault": "DIERR_INPUTLOST 后继续消费旧缓冲状态",
  "evidence": "HRESULT、获取状态、原始输入、动作边沿和焦点轨迹"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj15DirectinputMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj15DirectinputExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj15DirectinputEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
