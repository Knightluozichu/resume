import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-checklist-index",
  title: "核对表目录",
  nodes: ["任务类型", "核对表定位", "逐项检查", "证据链接", "遗漏回归"],
  focuses: ["索引覆盖", "适用时机", "条目证据", "拒绝条件", "维护"],
} as const;

export function Cc2eChecklistIndexStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eChecklistIndexTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eChecklistIndexEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
