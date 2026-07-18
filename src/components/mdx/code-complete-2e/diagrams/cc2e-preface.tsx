import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-preface",
  title: "前言",
  nodes: ["版次变化", "构建范围", "读者对象", "使用方式", "复核边界"],
  focuses: ["第2版", "构建知识", "语言无关", "证据类型", "阅读路线"],
} as const;

export function Cc2ePrefaceStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2ePrefaceTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2ePrefaceEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
