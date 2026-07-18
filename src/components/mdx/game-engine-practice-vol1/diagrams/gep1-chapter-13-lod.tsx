import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-13-lod",
  title: "第13章 LOD",
  nodes: [
    "估计屏幕误差",
    "选择LOD表示",
    "加入滞回约束",
    "处理地形边界",
    "测量画质与成本",
  ],
  focuses: ["屏幕误差", "切换抖动", "拓扑连续", "地形裂缝", "流送预算"],
};

export function Gep1Chapter13LodMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter13LodExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter13LodEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
