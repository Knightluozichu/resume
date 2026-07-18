import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-preface",
  title: "前言（Preface）",
  nodes: [
    "确认版次",
    "识别五部",
    "建立系统边界",
    "约定实验记录",
    "规划迁移项目",
  ],
  focuses: ["版次合同", "工业语境", "跨层依赖", "证据记录", "迁移路线"],
};

export function Gea3PrefaceMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3PrefaceExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3PrefaceEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
