import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-08-defensive-programming",
  title: "第8章：防御式编程",
  nodes: ["外部输入", "边界校验", "内部断言", "错误隔离", "安全结果"],
  focuses: ["无效数据", "断言", "错误策略", "异常边界", "开发辅助"],
} as const;

export function Cc2e08DefensiveProgrammingStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e08DefensiveProgrammingTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e08DefensiveProgrammingEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
