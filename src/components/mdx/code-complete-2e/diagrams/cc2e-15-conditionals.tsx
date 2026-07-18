import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-15-conditionals",
  title: "第15章：使用条件语句",
  nodes: ["条件输入", "正常分支", "替代分支", "默认拒绝", "分支覆盖"],
  focuses: ["简单if", "条件串", "case排序", "默认分支", "覆盖测试"],
} as const;

export function Cc2e15ConditionalsStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e15ConditionalsTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e15ConditionalsEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
