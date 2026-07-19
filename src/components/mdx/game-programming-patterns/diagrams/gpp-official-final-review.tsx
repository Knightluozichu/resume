import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "《游戏编程模式》全书总复习";
const focus = "用跨模式故障题证明能选择、组合、拒绝并移除模式";
const stages = [
  "抽取节点",
  "重建基线",
  "实现候选",
  "注入故障",
  "答辩去留"
];
const nodes = [
  {
    "label": "Acknowledgements",
    "mechanism": "Acknowledgements 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "I. Introduction",
    "mechanism": "I. Introduction 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "1. Architecture, Performance, and Games",
    "mechanism": "1. Architecture, Performance, and Games 聚焦运行代价，固定场景后用351节点映射、实现差分、故障轨迹与发布清单定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "II. Design Patterns Revisited",
    "mechanism": "II. Design Patterns Revisited 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "2. Command",
    "mechanism": "2. Command 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "3. Flyweight",
    "mechanism": "3. Flyweight 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "4. Observer",
    "mechanism": "4. Observer 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "5. Prototype",
    "mechanism": "5. Prototype 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "6. Singleton",
    "mechanism": "6. Singleton 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "7. State",
    "mechanism": "7. State 聚焦所有权与时序；实现必须在“组合模式后故障所有权落在无人负责的边界”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "III. Sequencing Patterns",
    "mechanism": "III. Sequencing Patterns 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "8. Double Buffer",
    "mechanism": "8. Double Buffer 聚焦所有权与时序；实现必须在“组合模式后故障所有权落在无人负责的边界”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "9. Game Loop",
    "mechanism": "9. Game Loop 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "10. Update Method",
    "mechanism": "10. Update Method 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "IV. Behavioral Patterns",
    "mechanism": "IV. Behavioral Patterns 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "11. Bytecode",
    "mechanism": "11. Bytecode 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "12. Subclass Sandbox",
    "mechanism": "12. Subclass Sandbox 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "13. Type Object",
    "mechanism": "13. Type Object 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "V. Decoupling Patterns",
    "mechanism": "V. Decoupling Patterns 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "14. Component",
    "mechanism": "14. Component 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "15. Event Queue",
    "mechanism": "15. Event Queue 聚焦所有权与时序；实现必须在“组合模式后故障所有权落在无人负责的边界”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "16. Service Locator",
    "mechanism": "16. Service Locator 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "VI. Optimization Patterns",
    "mechanism": "VI. Optimization Patterns 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "17. Data Locality",
    "mechanism": "17. Data Locality 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "18. Dirty Flag",
    "mechanism": "18. Dirty Flag 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "19. Object Pool",
    "mechanism": "19. Object Pool 聚焦所有权与时序；实现必须在“组合模式后故障所有权落在无人负责的边界”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  },
  {
    "label": "20. Spatial Partition",
    "mechanism": "20. Spatial Partition 把本章机制落到一个具体设计坐标：随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定，并以“每个结论都能由另一人按记录复算并得到同一判断”作为通过条件。",
    "probe": "检查351节点映射、实现差分、故障轨迹与发布清单"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "术语背诵",
  "candidateLabel": "故障答辩",
  "unit": "未证结论",
  "baselineBase": 18,
  "baselineSlope": 7,
  "candidateBase": 9,
  "candidateSlope": 1.5,
  "faultPenalty": 16,
  "invariant": "每个结论都能由另一人按记录复算并得到同一判断",
  "fault": "组合模式后故障所有权落在无人负责的边界",
  "evidence": "351节点映射、实现差分、故障轨迹与发布清单"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppOfficialFinalReviewMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppOfficialFinalReviewExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppOfficialFinalReviewEvidenceLab() {
  return <GppFailureLab {...props} />;
}
