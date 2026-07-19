import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "19. Object Pool";
const focus = "预分配固定槽位并复用短命对象，控制碎片和运行时分配";
const stages = [
  "预分配",
  "取得槽位",
  "完整初始化",
  "使用对象",
  "清理归还"
];
const nodes = [
  {
    "label": "19. Object Pool",
    "mechanism": "19. Object Pool 聚焦所有权与时序；实现必须在“复用粒子保留上一代速度或回调”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“粒子等对象频繁分配释放会产生碎片、停顿和不可预测失败”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“粒子等对象频繁分配释放会产生碎片、停顿和不可预测失败”，并保存不用模式时的失败基线。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "The curse of fragmentation",
    "mechanism": "The curse of fragmentation 聚焦运行代价，固定场景后用槽位代际、活跃计数、获取失败、清理字段与分配轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "The best of both worlds",
    "mechanism": "The best of both worlds 把本章机制落到一个具体设计坐标：池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态，并以“任一槽位只属于一个活跃对象且复用后没有残留状态”作为通过条件。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“任一槽位只属于一个活跃对象且复用后没有残留状态”。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“复用粒子保留上一代速度或回调”。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "The pool may waste memory on unneeded objects",
    "mechanism": "The pool may waste memory on unneeded objects 聚焦运行代价，固定场景后用槽位代际、活跃计数、获取失败、清理字段与分配轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Only a fixed number of objects can be active at any one time",
    "mechanism": "Only a fixed number of objects can be active at any one time 把本章机制落到一个具体设计坐标：池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态，并以“任一槽位只属于一个活跃对象且复用后没有残留状态”作为通过条件。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Memory size for each object is fixed",
    "mechanism": "Memory size for each object is fixed 聚焦运行代价，固定场景后用槽位代际、活跃计数、获取失败、清理字段与分配轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Reused objects aren’t automatically cleared",
    "mechanism": "Reused objects aren’t automatically cleared 把本章机制落到一个具体设计坐标：池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态，并以“任一槽位只属于一个活跃对象且复用后没有残留状态”作为通过条件。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Unused objects will remain in memory",
    "mechanism": "Unused objects will remain in memory 聚焦运行代价，固定场景后用槽位代际、活跃计数、获取失败、清理字段与分配轨迹定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "A free list",
    "mechanism": "A free list 聚焦所有权与时序；实现必须在“复用粒子保留上一代速度或回调”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以槽位代际、活跃计数、获取失败、清理字段与分配轨迹复核。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "Are objects coupled to the pool?",
    "mechanism": "Are objects coupled to the pool? 是设计分叉题；回答必须说明选择怎样改变池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态，以及哪条反例会推翻选择。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "What is responsible for initializing the reused objects?",
    "mechanism": "What is responsible for initializing the reused objects? 是设计分叉题；回答必须说明选择怎样改变池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态，以及哪条反例会推翻选择。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "逐次分配",
  "candidateLabel": "固定对象池",
  "unit": "分配次数",
  "baselineBase": 17,
  "baselineSlope": 7.5,
  "candidateBase": 10,
  "candidateSlope": 1.2,
  "faultPenalty": 16,
  "invariant": "任一槽位只属于一个活跃对象且复用后没有残留状态",
  "fault": "复用粒子保留上一代速度或回调",
  "evidence": "槽位代际、活跃计数、获取失败、清理字段与分配轨迹"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter19ObjectPoolMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter19ObjectPoolExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter19ObjectPoolEvidenceLab() {
  return <GppFailureLab {...props} />;
}
