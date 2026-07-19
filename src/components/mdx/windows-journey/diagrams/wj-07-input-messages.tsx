import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第7章 做游戏的主人——Windows游戏输入消息处理";
const focus = "区分离散按键消息、连续按住状态、鼠标坐标和输入焦点";
const stages = [
  "接收消息",
  "换算坐标",
  "更新快照",
  "消费动作",
  "焦点复位"
];
const nodes = [
  {
    "label": "第7章 做游戏的主人——Windows游戏输入消息处理",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 第7章 做游戏的主人——Windows游戏输入消息处理，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留消息时间戳、动作快照、坐标换算和焦点转换。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.1 Windows键盘消息处理",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.1 Windows键盘消息处理，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.1.1 虚拟键码与键盘消息",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.1.1 虚拟键码与键盘消息，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.1.2 键盘消息处理",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.1.2 键盘消息处理，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.1.3 示例程序GDIdemo10",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.1.3 示例程序GDIdemo10，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留消息时间戳、动作快照、坐标换算和焦点转换。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.2 Windows鼠标消息处理",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.2 Windows鼠标消息处理，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.2.1 鼠标消息的处理方式",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.2.1 鼠标消息的处理方式，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.2.2 鼠标相关常用函数讲解",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.2.2 鼠标相关常用函数讲解，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  },
  {
    "label": "7.3 章节小憩",
    "mechanism": "围绕区分离散按键消息、连续按住状态、鼠标坐标和输入焦点，对 7.3 章节小憩，收尾不是装饰，而是要求用消息时间戳、动作快照、坐标换算和焦点转换复盘“同一输入记录与窗口尺寸产生相同动作序列”是否在正常和失败路径同时成立。",
    "probe": "记录消息时间戳、动作快照、坐标换算和焦点转换"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "Win32 输入消息",
  "modernLabel": "动作映射层",
  "unit": "丢失动作",
  "historicalBase": 11,
  "historicalSlope": 4.2,
  "modernBase": 6,
  "modernSlope": 1.3,
  "faultPenalty": 15,
  "invariant": "同一输入记录与窗口尺寸产生相同动作序列",
  "fault": "窗口失焦后按键状态未清零导致角色持续移动",
  "evidence": "消息时间戳、动作快照、坐标换算和焦点转换"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj07InputMessagesMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj07InputMessagesExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj07InputMessagesEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
