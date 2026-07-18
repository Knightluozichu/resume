import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-34-software-craftsmanship",
  title: "第34章：软件开发艺术的有关问题",
  nodes: ["复杂问题", "原则选择", "问题域抽象", "反复试验", "折中判断"],
  focuses: ["复杂性", "过程", "人类读者", "规范", "迭代折中"],
} as const;

export function Cc2e34SoftwareCraftsmanshipStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e34SoftwareCraftsmanshipTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e34SoftwareCraftsmanshipEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
