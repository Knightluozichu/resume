import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-01-tar-pit",
  title: "第1章：焦油坑",
  nodes: ["个人程序", "产品化", "系统化", "集成交付", "持续维护"],
  focuses: ["九倍成本模型", "接口契约", "用户范围", "验证负担", "职业张力"],
} as const;

export function Tmm4001TarPitDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4001TarPitScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4001TarPitEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
