import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-21-collaborative-construction",
  title: "第21章：协同构造",
  nodes: ["个人产物", "同伴准备", "协同检查", "缺陷记录", "团队学习"],
  focuses: ["实践组合", "结对", "正式检查", "自尊与安全", "技术比较"],
} as const;

export function Cc2e21CollaborativeConstructionStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e21CollaborativeConstructionTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e21CollaborativeConstructionEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
