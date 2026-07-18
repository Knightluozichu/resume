import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-14-straight-line-code",
  title: "第14章：组织直线型代码",
  nodes: ["输入准备", "依赖计算", "相关语句", "结果组装", "顺序复核"],
  focuses: ["强制顺序", "无关顺序", "自上而下", "概念聚类", "依赖可见"],
} as const;

export function Cc2e14StraightLineCodeStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e14StraightLineCodeTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e14StraightLineCodeEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
