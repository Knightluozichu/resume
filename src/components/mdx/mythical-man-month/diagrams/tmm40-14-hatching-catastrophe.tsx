import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-14-hatching-catastrophe",
  title: "第14章：祸起萧墙",
  nodes: ["计划基线", "可验证里程碑", "偏差暴露", "根因升级", "恢复决策"],
  focuses: ["小延误累积", "里程碑定义", "乐观联动", "坏消息", "管理响应"],
} as const;

export function Tmm4014HatchingCatastropheDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4014HatchingCatastropheScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4014HatchingCatastropheEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
