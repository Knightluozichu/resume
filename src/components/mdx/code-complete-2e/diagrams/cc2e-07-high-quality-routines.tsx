import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-07-high-quality-routines",
  title: "第7章：高质量的子程序",
  nodes: ["调用意图", "职责边界", "参数契约", "实现路径", "调用证据"],
  focuses: ["创建理由", "层次设计", "命名", "长度", "参数返回"],
} as const;

export function Cc2e07HighQualityRoutinesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e07HighQualityRoutinesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e07HighQualityRoutinesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
