import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第18章 水乳交融的艺术——Alpha混合技术";
const focus = "用源色、目标色和混合因子计算透明结果并解释绘制顺序";
const stages = [
  "准备源色",
  "读取目标色",
  "选择因子",
  "执行混合",
  "验证排序"
];
const nodes = [
  {
    "label": "第18章 水乳交融的艺术——Alpha混合技术",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 第18章 水乳交融的艺术——Alpha混合技术，必须给出可复算中间量，先在纸面预测空间或像素结果，再用源目标 RGBA、混合状态、深度状态、排序键和最终像素查找首个数值分叉。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.1 初识Alpha通道与混合技术",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.1 初识Alpha通道与混合技术，必须给出可复算中间量，先在纸面预测空间或像素结果，再用源目标 RGBA、混合状态、深度状态、排序键和最终像素查找首个数值分叉。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.2 Direct3D中的融合套路——融合因子",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.2 Direct3D中的融合套路——融合因子，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.3 融合运算方式的取法",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，18.3 融合运算方式的取法 限定本章的一个知识坐标；独立解释围绕“按最终色等于源色乘源因子加目标色乘目标因子复算像素”展开，并以“每个透明像素的源、目标、因子和绘制顺序都有记录”结束。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.4 融合因子的取法",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，18.4 融合因子的取法 限定本章的一个知识坐标；独立解释围绕“按最终色等于源色乘源因子加目标色乘目标因子复算像素”展开，并以“每个透明像素的源、目标、因子和绘制顺序都有记录”结束。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.5 Alpha的三处来源",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.5 Alpha的三处来源，必须给出可复算中间量，先在纸面预测空间或像素结果，再用源目标 RGBA、混合状态、深度状态、排序键和最终像素查找首个数值分叉。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.6 Alpha融合使用三步曲",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.6 Alpha融合使用三步曲，必须给出可复算中间量，先在纸面预测空间或像素结果，再用源目标 RGBA、混合状态、深度状态、排序键和最终像素查找首个数值分叉。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.7 示例程序D3Ddemo13",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.7 示例程序D3Ddemo13，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留源目标 RGBA、混合状态、深度状态、排序键和最终像素。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  },
  {
    "label": "18.8 章节小憩",
    "mechanism": "围绕用源色、目标色和混合因子计算透明结果并解释绘制顺序，对 18.8 章节小憩，收尾不是装饰，而是要求用源目标 RGBA、混合状态、深度状态、排序键和最终像素复盘“每个透明像素的源、目标、因子和绘制顺序都有记录”是否在正常和失败路径同时成立。",
    "probe": "记录源目标 RGBA、混合状态、深度状态、排序键和最终像素"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "D3D9 Alpha 状态",
  "modernLabel": "管线混合状态",
  "unit": "颜色差",
  "historicalBase": 22,
  "historicalSlope": 7,
  "modernBase": 11,
  "modernSlope": 1.8,
  "faultPenalty": 29,
  "invariant": "每个透明像素的源、目标、因子和绘制顺序都有记录",
  "fault": "半透明对象开启深度写入或按近到远顺序绘制",
  "evidence": "源目标 RGBA、混合状态、深度状态、排序键和最终像素"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj18AlphaBlendingMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj18AlphaBlendingExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj18AlphaBlendingEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
