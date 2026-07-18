import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-index",
  title: "索引（Index）",
  nodes: [
    "选择核心术语",
    "定位全部出现",
    "比较上下文语义",
    "连接依赖关系",
    "生成调试路线",
  ],
  focuses: ["术语一致", "跨章连接", "语义差异", "查询效率", "调试入口"],
};

export function Gea3IndexMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3IndexExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3IndexEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
