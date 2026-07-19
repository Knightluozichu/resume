import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "15. Event Queue";
const focus = "把消息发送时刻与处理时刻分离，并控制队列所有权和反馈环";
const stages = [
  "构造事件",
  "复制入队",
  "等待调度",
  "顺序消费",
  "处理反馈"
];
const nodes = [
  {
    "label": "15. Event Queue",
    "mechanism": "15. Event Queue 聚焦所有权与时序；实现必须在“处理器再次入队同类事件形成无界反馈”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“同步调用会让发送者承担接收者耗时、线程和生命周期”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“同步调用会让发送者承担接收者耗时、线程和生命周期”，并保存不用模式时的失败基线。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "GUI event loops",
    "mechanism": "GUI event loops 把本章机制落到一个具体设计坐标：生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，并以“事件的顺序、寿命和处理所有者都可从队列记录恢复”作为通过条件。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Central event bus",
    "mechanism": "Central event bus 把本章机制落到一个具体设计坐标：生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，并以“事件的顺序、寿命和处理所有者都可从队列记录恢复”作为通过条件。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Say what?",
    "mechanism": "Say what? 是设计分叉题；回答必须说明选择怎样改变生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，以及哪条反例会推翻选择。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“事件的顺序、寿命和处理所有者都可从队列记录恢复”。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“处理器再次入队同类事件形成无界反馈”。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "A central event queue is a global variable",
    "mechanism": "A central event queue is a global variable 聚焦所有权与时序；实现必须在“处理器再次入队同类事件形成无界反馈”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "The state of the world can change under you",
    "mechanism": "The state of the world can change under you 聚焦所有权与时序；实现必须在“处理器再次入队同类事件形成无界反馈”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "You can get stuck in feedback loops",
    "mechanism": "You can get stuck in feedback loops 把本章机制落到一个具体设计坐标：生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，并以“事件的顺序、寿命和处理所有者都可从队列记录恢复”作为通过条件。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "A ring buffer",
    "mechanism": "A ring buffer 聚焦所有权与时序；实现必须在“处理器再次入队同类事件形成无界反馈”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Aggregating requests",
    "mechanism": "Aggregating requests 把本章机制落到一个具体设计坐标：生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，并以“事件的顺序、寿命和处理所有者都可从队列记录恢复”作为通过条件。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Spanning threads",
    "mechanism": "Spanning threads 聚焦所有权与时序；实现必须在“处理器再次入队同类事件形成无界反馈”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以事件ID、入队出队时间、队列深度、丢弃与合并记录复核。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "What goes in the queue?",
    "mechanism": "What goes in the queue? 是设计分叉题；回答必须说明选择怎样改变生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，以及哪条反例会推翻选择。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Who can read from the queue?",
    "mechanism": "Who can read from the queue? 是设计分叉题；回答必须说明选择怎样改变生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，以及哪条反例会推翻选择。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "Who can write to the queue?",
    "mechanism": "Who can write to the queue? 是设计分叉题；回答必须说明选择怎样改变生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，以及哪条反例会推翻选择。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "What is the lifetime of the objects in the queue?",
    "mechanism": "What is the lifetime of the objects in the queue? 是设计分叉题；回答必须说明选择怎样改变生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果，以及哪条反例会推翻选择。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查事件ID、入队出队时间、队列深度、丢弃与合并记录"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "同步广播",
  "candidateLabel": "有界队列",
  "unit": "ms延迟",
  "baselineBase": 10,
  "baselineSlope": 5,
  "candidateBase": 7,
  "candidateSlope": 1.8,
  "faultPenalty": 14,
  "invariant": "事件的顺序、寿命和处理所有者都可从队列记录恢复",
  "fault": "处理器再次入队同类事件形成无界反馈",
  "evidence": "事件ID、入队出队时间、队列深度、丢弃与合并记录"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter15EventQueueMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter15EventQueueExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter15EventQueueEvidenceLab() {
  return <GppFailureLab {...props} />;
}
