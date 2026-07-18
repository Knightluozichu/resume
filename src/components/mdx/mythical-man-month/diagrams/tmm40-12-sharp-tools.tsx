import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-12-sharp-tools",
  title: "第12章：干将莫邪",
  nodes: ["目标环境", "开发环境", "数据服务", "语言工具", "反馈周期"],
  focuses: ["机器资源", "工具共享", "数据管理", "语言抽象", "交互反馈"],
} as const;

export function Tmm4012SharpToolsDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4012SharpToolsScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4012SharpToolsEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
