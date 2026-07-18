import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-22-developer-testing",
  title: "第22章：开发者测试",
  nodes: ["测试目标", "用例设计", "脚手架执行", "覆盖观察", "回归记录"],
  focuses: ["测试角色", "测试优先", "技巧", "典型错误", "工具过程"],
} as const;

export function Cc2e22DeveloperTestingStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e22DeveloperTestingTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e22DeveloperTestingEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
