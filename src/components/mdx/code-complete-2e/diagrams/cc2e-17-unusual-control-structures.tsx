import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-17-unusual-control-structures",
  title: "第17章：不常见的控制结构",
  nodes: ["控制目标", "候选结构", "路径展开", "退出清理", "复杂度复核"],
  focuses: ["多个返回", "递归", "goto争论", "错误处理", "使用原则"],
} as const;

export function Cc2e17UnusualControlStructuresStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e17UnusualControlStructuresTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e17UnusualControlStructuresEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
