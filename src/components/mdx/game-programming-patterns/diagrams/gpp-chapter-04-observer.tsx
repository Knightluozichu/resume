import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "4. Observer";
const focus = "让主体同步通知订阅者，同时显式管理顺序、重入和生命周期";
const stages = [
  "订阅",
  "产生事件",
  "同步通知",
  "处理重入",
  "解除订阅"
];
const nodes = [
  {
    "label": "4. Observer",
    "mechanism": "4. Observer 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Achievement Unlocked",
    "mechanism": "Achievement Unlocked 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "How it Works",
    "mechanism": "How it Works 是设计分叉题；回答必须说明选择怎样改变主体维护观察者集合，在事件点同步遍历并交付明确载荷，以及哪条反例会推翻选择。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "The observer",
    "mechanism": "The observer 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "The subject",
    "mechanism": "The subject 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Observable physics",
    "mechanism": "Observable physics 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "It’s Too Slow",
    "mechanism": "It’s Too Slow 聚焦运行代价，固定场景后用订阅表、通知序号、回调耗时与销毁轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "It’s too fast?",
    "mechanism": "It’s too fast? 是设计分叉题；回答必须说明选择怎样改变主体维护观察者集合，在事件点同步遍历并交付明确载荷，以及哪条反例会推翻选择。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "It Does Too Much Dynamic Allocation",
    "mechanism": "It Does Too Much Dynamic Allocation 聚焦运行代价，固定场景后用订阅表、通知序号、回调耗时与销毁轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Linked observers",
    "mechanism": "Linked observers 聚焦所有权与时序；实现必须在“观察者在回调中注销自身导致遍历失效”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "A pool of list nodes",
    "mechanism": "A pool of list nodes 聚焦所有权与时序；实现必须在“观察者在回调中注销自身导致遍历失效”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Remaining Problems",
    "mechanism": "Remaining Problems 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Destroying subjects and observers",
    "mechanism": "Destroying subjects and observers 聚焦所有权与时序；实现必须在“观察者在回调中注销自身导致遍历失效”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Don’t worry, I’ve got a GC",
    "mechanism": "Don’t worry, I’ve got a GC 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "What’s going on?",
    "mechanism": "What’s going on? 是设计分叉题；回答必须说明选择怎样改变主体维护观察者集合，在事件点同步遍历并交付明确载荷，以及哪条反例会推翻选择。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Observers Today",
    "mechanism": "Observers Today 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  },
  {
    "label": "Observers Tomorrow",
    "mechanism": "Observers Tomorrow 把本章机制落到一个具体设计坐标：主体维护观察者集合，在事件点同步遍历并交付明确载荷，并以“已注销或已销毁观察者绝不会再收到通知”作为通过条件。",
    "probe": "检查订阅表、通知序号、回调耗时与销毁轨迹"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "直接依赖",
  "candidateLabel": "观察者列表",
  "unit": "耦合边",
  "baselineBase": 11,
  "baselineSlope": 4.8,
  "candidateBase": 6,
  "candidateSlope": 1.7,
  "faultPenalty": 11,
  "invariant": "已注销或已销毁观察者绝不会再收到通知",
  "fault": "观察者在回调中注销自身导致遍历失效",
  "evidence": "订阅表、通知序号、回调耗时与销毁轨迹"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter04ObserverMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter04ObserverExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter04ObserverEvidenceLab() {
  return <GppFailureLab {...props} />;
}
