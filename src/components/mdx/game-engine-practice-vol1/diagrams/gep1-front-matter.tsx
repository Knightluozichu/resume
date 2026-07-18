import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-front-matter",
  title: "书前资料：版权、提要、推荐序、前言与资源",
  nodes: ["核定版次", "读取范围", "检查先修", "绑定配套资源", "建立复现环境"],
  focuses: ["版次一致", "卷册边界", "先修能力", "资源完整", "环境可复现"],
};

export function Gep1FrontMatterMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1FrontMatterExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1FrontMatterEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
