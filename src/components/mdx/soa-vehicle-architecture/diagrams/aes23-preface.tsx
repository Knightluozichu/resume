import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-preface",
  title: "前言：写作范围与学习方法",
  nodes: ["版次冻结", "目录定位", "对象建模", "边界实验", "独立复核"],
  focuses: ["2023版", "五章结构", "术语定义", "读图方法", "验收合同"],
} as const;

export function Aes23PrefaceTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23PrefaceProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23PrefaceEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
