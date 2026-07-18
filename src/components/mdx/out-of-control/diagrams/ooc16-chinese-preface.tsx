import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chinese-preface",
  title: "致《失控》中文版",
  nodes: [
    "冻结原始主张",
    "标记时间边界",
    "寻找实现证据",
    "登记反例偏差",
    "更新适用范围",
  ],
  focuses: ["版本语境", "预测命中", "事后偏差", "技术迁移", "证据边界"],
} as const;

export function Ooc16ChinesePrefaceMapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16ChinesePrefaceExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16ChinesePrefaceEvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
