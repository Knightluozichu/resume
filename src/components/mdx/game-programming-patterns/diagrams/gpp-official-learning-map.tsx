import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "《游戏编程模式》权威学习地图";
const focus = "从问题证据进入模式族，并保留拒绝或移除模式的出口";
const stages = [
  "记录问题",
  "定位变化轴",
  "选择候选",
  "注入反例",
  "决定去留"
];
const nodes = [
  {
    "label": "《游戏编程模式》权威学习地图",
    "mechanism": "《游戏编程模式》权威学习地图 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "Acknowledgements",
    "mechanism": "Acknowledgements 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "I. Introduction",
    "mechanism": "I. Introduction 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "1. Architecture, Performance, and Games",
    "mechanism": "1. Architecture, Performance, and Games 聚焦运行代价，固定场景后用改动传播、帧轨迹、依赖图与移除触发器定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "II. Design Patterns Revisited",
    "mechanism": "II. Design Patterns Revisited 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "2. Command",
    "mechanism": "2. Command 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "3. Flyweight",
    "mechanism": "3. Flyweight 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "4. Observer",
    "mechanism": "4. Observer 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "5. Prototype",
    "mechanism": "5. Prototype 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "6. Singleton",
    "mechanism": "6. Singleton 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "7. State",
    "mechanism": "7. State 聚焦所有权与时序；实现必须在“候选模式降低代码行数却扩大隐藏依赖”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "III. Sequencing Patterns",
    "mechanism": "III. Sequencing Patterns 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "8. Double Buffer",
    "mechanism": "8. Double Buffer 聚焦所有权与时序；实现必须在“候选模式降低代码行数却扩大隐藏依赖”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "9. Game Loop",
    "mechanism": "9. Game Loop 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "10. Update Method",
    "mechanism": "10. Update Method 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "IV. Behavioral Patterns",
    "mechanism": "IV. Behavioral Patterns 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "11. Bytecode",
    "mechanism": "11. Bytecode 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "12. Subclass Sandbox",
    "mechanism": "12. Subclass Sandbox 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "13. Type Object",
    "mechanism": "13. Type Object 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "V. Decoupling Patterns",
    "mechanism": "V. Decoupling Patterns 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "14. Component",
    "mechanism": "14. Component 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "15. Event Queue",
    "mechanism": "15. Event Queue 聚焦所有权与时序；实现必须在“候选模式降低代码行数却扩大隐藏依赖”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "16. Service Locator",
    "mechanism": "16. Service Locator 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "VI. Optimization Patterns",
    "mechanism": "VI. Optimization Patterns 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "17. Data Locality",
    "mechanism": "17. Data Locality 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "18. Dirty Flag",
    "mechanism": "18. Dirty Flag 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "19. Object Pool",
    "mechanism": "19. Object Pool 聚焦所有权与时序；实现必须在“候选模式降低代码行数却扩大隐藏依赖”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  },
  {
    "label": "20. Spatial Partition",
    "mechanism": "20. Spatial Partition 把本章机制落到一个具体设计坐标：把问题、变化轴、候选方案、反例和复核时间连成可撤销决策，并以“每个模式选择都能回到一个可重放的问题基线”作为通过条件。",
    "probe": "检查改动传播、帧轨迹、依赖图与移除触发器"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "按名称套模式",
  "candidateLabel": "按证据选方案",
  "unit": "改动点",
  "baselineBase": 8,
  "baselineSlope": 5,
  "candidateBase": 5,
  "candidateSlope": 1.4,
  "faultPenalty": 8,
  "invariant": "每个模式选择都能回到一个可重放的问题基线",
  "fault": "候选模式降低代码行数却扩大隐藏依赖",
  "evidence": "改动传播、帧轨迹、依赖图与移除触发器"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppOfficialLearningMapMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppOfficialLearningMapExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppOfficialLearningMapEvidenceLab() {
  return <GppFailureLab {...props} />;
}
