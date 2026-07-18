import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-01-construction-world",
  title: "第1章：欢迎进入软件构建的世界",
  nodes: ["问题定义", "架构边界", "详细设计", "可运行代码", "构建证据"],
  focuses: ["构建范围", "活动占比", "质量杠杆", "读者路径", "完成定义"],
} as const;

export function Cc2e01ConstructionWorldStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e01ConstructionWorldTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e01ConstructionWorldEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
