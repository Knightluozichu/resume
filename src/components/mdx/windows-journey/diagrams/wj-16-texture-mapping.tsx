import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第16章 起舞不落幕——与纹理映射的华丽邂逅";
const focus = "从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源";
const stages = [
  "载入资源",
  "绑定纹理",
  "插值 UV",
  "寻址采样",
  "组合输出"
];
const nodes = [
  {
    "label": "第16章 起舞不落幕——与纹理映射的华丽邂逅",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 第16章 起舞不落幕——与纹理映射的华丽邂逅，必须给出可复算中间量，先在纸面预测空间或像素结果，再用UV、采样坐标、过滤模式、阶段状态和像素颜色查找首个数值分叉。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.1 纹理映射的概念",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.1 纹理映射的概念，必须给出可复算中间量，先在纸面预测空间或像素结果，再用UV、采样坐标、过滤模式、阶段状态和像素颜色查找首个数值分叉。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.2 纹理映射使用四步曲",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.2 纹理映射使用四步曲，必须给出可复算中间量，先在纸面预测空间或像素结果，再用UV、采样坐标、过滤模式、阶段状态和像素颜色查找首个数值分叉。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.3 总结与升华",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.3 总结与升华，收尾不是装饰，而是要求用UV、采样坐标、过滤模式、阶段状态和像素颜色复盘“选定像素的 UV、采样 texel 和组合颜色可以追溯”是否在正常和失败路径同时成立。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.4 示例程序D3Ddemo10",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.4 示例程序D3Ddemo10，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留UV、采样坐标、过滤模式、阶段状态和像素颜色。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.5 四大纹理过滤方式精讲",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.5 四大纹理过滤方式精讲，必须给出可复算中间量，先在纸面预测空间或像素结果，再用UV、采样坐标、过滤模式、阶段状态和像素颜色查找首个数值分叉。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.6 四大纹理寻址方式精讲",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.6 四大纹理寻址方式精讲，必须给出可复算中间量，先在纸面预测空间或像素结果，再用UV、采样坐标、过滤模式、阶段状态和像素颜色查找首个数值分叉。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.7 纹理映射知识总结",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.7 纹理映射知识总结，收尾不是装饰，而是要求用UV、采样坐标、过滤模式、阶段状态和像素颜色复盘“选定像素的 UV、采样 texel 和组合颜色可以追溯”是否在正常和失败路径同时成立。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.8 示例程序D3Ddemo11",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.8 示例程序D3Ddemo11，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留UV、采样坐标、过滤模式、阶段状态和像素颜色。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  },
  {
    "label": "16.9 章节小憩",
    "mechanism": "围绕从 UV 坐标、采样寻址、过滤到纹理阶段状态解释像素来源，对 16.9 章节小憩，收尾不是装饰，而是要求用UV、采样坐标、过滤模式、阶段状态和像素颜色复盘“选定像素的 UV、采样 texel 和组合颜色可以追溯”是否在正常和失败路径同时成立。",
    "probe": "记录UV、采样坐标、过滤模式、阶段状态和像素颜色"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "D3D9 纹理阶段",
  "modernLabel": "采样器/着色器",
  "unit": "错误采样",
  "historicalBase": 18,
  "historicalSlope": 5.5,
  "modernBase": 9,
  "modernSlope": 1.5,
  "faultPenalty": 22,
  "invariant": "选定像素的 UV、采样 texel 和组合颜色可以追溯",
  "fault": "UV 超界但寻址模式错误，或纹理状态泄漏到下一物体",
  "evidence": "UV、采样坐标、过滤模式、阶段状态和像素颜色"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj16TextureMappingMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj16TextureMappingExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj16TextureMappingEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
