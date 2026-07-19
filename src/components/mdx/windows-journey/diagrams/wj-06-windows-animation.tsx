import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第6章 光与影的交汇——Windows游戏动画技术";
const focus = "把真实时间、固定更新步长、动画帧索引和发布频率解耦";
const stages = [
  "采样时间",
  "累积差值",
  "固定更新",
  "选择画格",
  "发布帧"
];
const nodes = [
  {
    "label": "第6章 光与影的交汇——Windows游戏动画技术",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 第6章 光与影的交汇——Windows游戏动画技术，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留真实时间、模拟时间、更新次数、丢帧和帧时分位数。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.1 定时器动画显示",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.1 定时器动画显示，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.1.1 创建定时器",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.1.1 创建定时器，重点检查资源生命周期：创建成功只完成一半，失败回滚、逆序释放和同输入重建同样属于通过条件。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.1.2 WM_TIMER消息响应",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.1.2 WM_TIMER消息响应，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.1.3 删除定时器",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，6.1.3 删除定时器 限定本章的一个知识坐标；独立解释围绕“累积真实经过时间，执行零到多次固定步更新，再绘制当前状态”展开，并以“相同真实时长和输入产生相同模拟时间与动画帧序列”结束。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.1.4 示例程序GDIdemo6",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.1.4 示例程序GDIdemo6，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留真实时间、模拟时间、更新次数、丢帧和帧时分位数。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.2 游戏循环动画显示",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.2 游戏循环动画显示，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留真实时间、模拟时间、更新次数、丢帧和帧时分位数。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.3 透明动画",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.3 透明动画，重点检查事件与时间顺序，必须区分采集、状态快照、固定更新和可见发布，不能由最终画面倒推过程正确。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.4 排序贴图",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，6.4 排序贴图 限定本章的一个知识坐标；独立解释围绕“累积真实经过时间，执行零到多次固定步更新，再绘制当前状态”展开，并以“相同真实时长和输入产生相同模拟时间与动画帧序列”结束。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  },
  {
    "label": "6.5 章节小憩",
    "mechanism": "围绕把真实时间、固定更新步长、动画帧索引和发布频率解耦，对 6.5 章节小憩，收尾不是装饰，而是要求用真实时间、模拟时间、更新次数、丢帧和帧时分位数复盘“相同真实时长和输入产生相同模拟时间与动画帧序列”是否在正常和失败路径同时成立。",
    "probe": "记录真实时间、模拟时间、更新次数、丢帧和帧时分位数"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "Sleep 定时循环",
  "modernLabel": "固定步长循环",
  "unit": "ms 偏差",
  "historicalBase": 18,
  "historicalSlope": 5.5,
  "modernBase": 8,
  "modernSlope": 1.2,
  "faultPenalty": 24,
  "invariant": "相同真实时长和输入产生相同模拟时间与动画帧序列",
  "fault": "长帧后无限追赶形成死亡螺旋",
  "evidence": "真实时间、模拟时间、更新次数、丢帧和帧时分位数"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj06WindowsAnimationMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj06WindowsAnimationExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj06WindowsAnimationEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
