import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-32-self-documenting-code",
  title: "第32章：自说明代码",
  nodes: ["读者任务", "清晰代码", "必要注释", "外部文档", "同步验证"],
  focuses: ["外部文档", "风格", "是否注释", "注释质量", "标准"],
} as const;

export function Cc2e32SelfDocumentingCodeStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e32SelfDocumentingCodeTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e32SelfDocumentingCodeEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
