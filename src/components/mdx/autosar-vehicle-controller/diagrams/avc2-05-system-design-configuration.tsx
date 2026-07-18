import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-05-system-design-configuration",
  title: "第5章：AUTOSAR系统级设计与配置",
  nodes: ["工程资源", "数据与接口", "SWC组合", "系统配置", "ECU抽取"],
  focuses: [
    "ISOLAR-A入门",
    "类型定义",
    "组件设计",
    "Composition",
    "ECU Extract",
  ],
} as const;

export function Avc205SystemDesignConfigurationArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc205SystemDesignConfigurationConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc205SystemDesignConfigurationEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
