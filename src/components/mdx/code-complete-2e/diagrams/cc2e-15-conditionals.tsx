import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-15-conditionals",
  title: "第15章：使用条件语句",
  nodes: ["条件输入", "正常分支", "替代分支", "默认拒绝", "分支覆盖"],
  concepts: [
    "第15章 使用条件语句",
    "15.1 if语句",
    "简单if-then语句",
    "if-then-else语句串",
    "15.2 case语句",
    "为case选择最有效的排序",
    "使用case语句的提示",
    "关键点",
  ],
  mechanism:
    "条件语句优先展示正常路径，互斥分支完整覆盖输入域，复杂条件命名，默认分支明确接受、拒绝或不可达",
  success: "第15章：使用条件语句 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第15章：使用条件语句 在“条件重叠、遗漏边界或空默认分支，使输入落入错误路径”处拒绝",
  model: {
    primaryLabel: "简单if",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 2.1,
    secondaryLabel: "条件串",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 9,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "case排序压力",
  },
} as const;

export function Cc2e15ConditionalsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
