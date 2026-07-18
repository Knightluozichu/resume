import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-part-07-software-craftsmanship",
  title: "第7部分：软件工艺",
  nodes: ["代码布局", "说明意图", "个人习惯", "工艺判断", "持续学习"],
  focuses: ["风格", "文档", "品格", "工艺", "资料"],
} as const;

export function Cc2ePart07SoftwareCraftsmanshipStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePart07SoftwareCraftsmanshipTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePart07SoftwareCraftsmanshipEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
