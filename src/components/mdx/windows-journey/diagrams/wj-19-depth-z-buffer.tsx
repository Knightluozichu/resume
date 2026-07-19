import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第19章 横看成岭侧成峰——深度测试与Z缓存";
const focus = "用深度测试函数、写入开关和近远平面解释遮挡与精度";
const stages = [
  "清除深度",
  "生成深度",
  "执行比较",
  "更新像素",
  "检查精度"
];
const nodes = [
  {
    "label": "第19章 横看成岭侧成峰——深度测试与Z缓存",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 第19章 横看成岭侧成峰——深度测试与Z缓存，必须给出可复算中间量，先在纸面预测空间或像素结果，再用深度值、比较函数、写掩码、清除值和投影参数查找首个数值分叉。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  },
  {
    "label": "19.1 形象化理解深度测试",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 19.1 形象化理解深度测试，必须给出可复算中间量，先在纸面预测空间或像素结果，再用深度值、比较函数、写掩码、清除值和投影参数查找首个数值分叉。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  },
  {
    "label": "19.2 深度测试相关概念讲解",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 19.2 深度测试相关概念讲解，必须给出可复算中间量，先在纸面预测空间或像素结果，再用深度值、比较函数、写掩码、清除值和投影参数查找首个数值分叉。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  },
  {
    "label": "19.3 深度测试使用四步曲",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 19.3 深度测试使用四步曲，必须给出可复算中间量，先在纸面预测空间或像素结果，再用深度值、比较函数、写掩码、清除值和投影参数查找首个数值分叉。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  },
  {
    "label": "19.4 示例程序D3Ddemo14",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 19.4 示例程序D3Ddemo14，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留深度值、比较函数、写掩码、清除值和投影参数。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  },
  {
    "label": "19.5 章节小憩",
    "mechanism": "围绕用深度测试函数、写入开关和近远平面解释遮挡与精度，对 19.5 章节小憩，收尾不是装饰，而是要求用深度值、比较函数、写掩码、清除值和投影参数复盘“每个争议像素的候选深度、旧深度、比较结果和写入结果可复算”是否在正常和失败路径同时成立。",
    "probe": "记录深度值、比较函数、写掩码、清除值和投影参数"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "D3D9 深度状态",
  "modernLabel": "现代深度附件",
  "unit": "遮挡错误",
  "historicalBase": 18,
  "historicalSlope": 6,
  "modernBase": 9,
  "modernSlope": 1.6,
  "faultPenalty": 25,
  "invariant": "每个争议像素的候选深度、旧深度、比较结果和写入结果可复算",
  "fault": "每帧未清深度或近远平面比过大造成 Z fighting",
  "evidence": "深度值、比较函数、写掩码、清除值和投影参数"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj19DepthZBufferMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj19DepthZBufferExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj19DepthZBufferEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
