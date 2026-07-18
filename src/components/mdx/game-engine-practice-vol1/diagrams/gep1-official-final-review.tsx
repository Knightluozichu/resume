import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-official-final-review",
  title: "《游戏引擎原理与实践·卷1》全书综合复核",
  nodes: [
    "冻结项目与资源",
    "启动基础系统",
    "创建对象资源",
    "更新场景可见性",
    "选择LOD并呈现",
  ],
  focuses: ["整卷迁移", "启动关闭", "对象资源", "场景查询", "LOD证据"],
};

export function Gep1OfficialFinalReviewMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1OfficialFinalReviewExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1OfficialFinalReviewEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
