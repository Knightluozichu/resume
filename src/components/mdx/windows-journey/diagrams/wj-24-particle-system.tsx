import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第24章 让唯美的雪花飘扬——三维粒子系统的实现";
const focus = "管理三维粒子的发射、更新、公告板朝向、透明排序和回收";
const stages = [
  "池中发射",
  "更新寿命",
  "积分位置",
  "相机排序",
  "批量回收"
];
const nodes = [
  {
    "label": "第24章 让唯美的雪花飘扬——三维粒子系统的实现",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，第24章 让唯美的雪花飘扬——三维粒子系统的实现 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.1 对粒子系统的基本认知",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，24.1 对粒子系统的基本认知 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.2 粒子系统的基本原理",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，24.2 粒子系统的基本原理 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.3 雪花粒子系统的设计",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，24.3 雪花粒子系统的设计 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.4 雪花粒子系统的实现",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，24.4 雪花粒子系统的实现 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.5 雪花飞扬粒子类的使用",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，24.5 雪花飞扬粒子类的使用 限定本章的一个知识坐标；独立解释围绕“从池中发射带寿命状态的粒子，固定步长更新，按相机关系构造公告板并批量绘制”展开，并以“活跃数受容量约束，相同种子与时间步产生相同粒子状态”结束。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.6 示例程序D3Ddemo19",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，对 24.6 示例程序D3Ddemo19，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留发射序号、寿命、位置、排序键、池容量和绘制批次。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  },
  {
    "label": "24.7 章节小憩",
    "mechanism": "围绕管理三维粒子的发射、更新、公告板朝向、透明排序和回收，对 24.7 章节小憩，收尾不是装饰，而是要求用发射序号、寿命、位置、排序键、池容量和绘制批次复盘“活跃数受容量约束，相同种子与时间步产生相同粒子状态”是否在正常和失败路径同时成立。",
    "probe": "记录发射序号、寿命、位置、排序键、池容量和绘制批次"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "D3D9 CPU 粒子",
  "modernLabel": "实例化粒子管线",
  "unit": "溢出粒子",
  "historicalBase": 24,
  "historicalSlope": 7,
  "modernBase": 11,
  "modernSlope": 1.6,
  "faultPenalty": 29,
  "invariant": "活跃数受容量约束，相同种子与时间步产生相同粒子状态",
  "fault": "透明粒子近到远绘制或死亡粒子仍留在活动列表",
  "evidence": "发射序号、寿命、位置、排序键、池容量和绘制批次"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj24ParticleSystemMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj24ParticleSystemExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj24ParticleSystemEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
