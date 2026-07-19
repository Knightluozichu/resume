import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第13章 迈向三维世界——Direct3D 的四大变换";
const focus = "把模型顶点依次变换到世界、观察、投影和视口坐标";
const stages = [
  "模型空间",
  "世界变换",
  "观察变换",
  "投影裁剪",
  "视口映射"
];
const nodes = [
  {
    "label": "第13章 迈向三维世界——Direct3D 的四大变换",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 第13章 迈向三维世界——Direct3D 的四大变换，API 名称属于具体年代；学习重点是输入、返回值、所有权和失败出口，技术事实以微软文档核对。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.1 四大变换的基本认知",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.1 四大变换的基本认知，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.2 四大变换之一：世界变换",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.2 四大变换之一：世界变换，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.2.1 矩阵的平移",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.2.1 矩阵的平移，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.2.2 矩阵的旋转",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.2.2 矩阵的旋转，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.2.3 矩阵的缩放",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.2.3 矩阵的缩放，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.3 四大变换之二：取景变换",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.3 四大变换之二：取景变换，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.4 四大变换之三：投影变换",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.4 四大变换之三：投影变换，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.5 四大变换之四：视口变换",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.5 四大变换之四：视口变换，必须给出可复算中间量，先在纸面预测空间或像素结果，再用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素查找首个数值分叉。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.6 总结",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.6 总结，收尾不是装饰，而是要求用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素复盘“每个测试顶点在五个坐标空间都有可复算位置”是否在正常和失败路径同时成立。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.7 示例程序D3Ddemo5",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.7 示例程序D3Ddemo5，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  },
  {
    "label": "13.8 章节小憩",
    "mechanism": "围绕把模型顶点依次变换到世界、观察、投影和视口坐标，对 13.8 章节小憩，收尾不是装饰，而是要求用矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素复盘“每个测试顶点在五个坐标空间都有可复算位置”是否在正常和失败路径同时成立。",
    "probe": "记录矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "固定功能变换",
  "modernLabel": "着色器矩阵变换",
  "unit": "像素误差",
  "historicalBase": 24,
  "historicalSlope": 7,
  "modernBase": 12,
  "modernSlope": 1.8,
  "faultPenalty": 30,
  "invariant": "每个测试顶点在五个坐标空间都有可复算位置",
  "fault": "交换世界矩阵与观察矩阵或混用左右手投影",
  "evidence": "矩阵、齐次坐标、裁剪标志、NDC 和屏幕像素"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj13FourTransformsMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj13FourTransformsExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj13FourTransformsEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
