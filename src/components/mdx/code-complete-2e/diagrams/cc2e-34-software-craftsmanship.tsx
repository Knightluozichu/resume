import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-34-software-craftsmanship",
  title: "第34章：软件开发艺术的有关问题",
  nodes: ["复杂问题", "原则选择", "问题域抽象", "反复试验", "折中判断"],
  concepts: [
    "第34章 软件开发艺术的有关问题",
    "34.1 克服复杂性",
    "34.2 精选编程过程",
    "34.3 为人写程序，其次才是为机器",
    "34.4 以所用语言编程，但思路不受其约束",
    "34.5 借助规范集中注意力",
    "34.6 基于问题域编程",
    "将程序划分为不同层次的抽象",
    "34.7 “当心落石”",
    "34.8 反复，再反复",
    "34.9 不要顽固不化",
    "判断",
    "折中主义",
    "试验",
    "关键点",
  ],
  mechanism:
    "软件工艺通过分层抽象控制复杂度，以问题域语言表达意图，借规范腾出注意力，并用反复试验和折中判断适配情境",
  success: "第34章：软件开发艺术的有关问题 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第34章：软件开发艺术的有关问题 在“顽固执行单一规则，遇到反例只增加例外而不重审模型”处拒绝",
  model: {
    primaryLabel: "复杂性",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.6,
    secondaryLabel: "过程",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 9,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 19,
    limit: 60,
    metricLabel: "人类读者压力",
  },
} as const;

export function Cc2e34SoftwareCraftsmanshipMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
