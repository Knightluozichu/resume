import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-05-design-in-construction",
  title: "第5章：软件构建中的设计",
  nodes: ["需求场景", "复杂度分解", "抽象边界", "设计试验", "代码验证"],
  focuses: ["设计挑战", "层次", "启发式", "迭代实践", "记录成果"],
} as const;

export function Cc2e05DesignInConstructionStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e05DesignInConstructionTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e05DesignInConstructionEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
