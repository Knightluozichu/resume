import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-15-other-face",
  title: "第15章：另外一面",
  nodes: ["读者任务", "目的约束", "接口说明", "代码结构", "维护验证"],
  focuses: [
    "受众分层",
    "为何而非只写如何",
    "流程图边界",
    "自说明代码",
    "文档同步",
  ],
} as const;

export function Tmm4015OtherFaceDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4015OtherFaceScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4015OtherFaceEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
