import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "附录E 精选习题答案",
  label: "附录",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["定位参考条目","写出协议合同","构造最小样本","捕获原始证据","验证反例","清理复盘"],
  concepts: ["附录E 精选习题答案"],
} as const;

export function UnpAppendixESelectedSolutionsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpAppendixESelectedSolutionsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpAppendixESelectedSolutionsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
