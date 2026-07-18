import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-official-final-review",
  title: "《游戏引擎架构》第3版全书综合复核",
  nodes: [
    "冻结目标约束",
    "画运行时依赖",
    "注入预算压力",
    "追踪跨帧因果",
    "独立复核证据",
  ],
  focuses: ["整机视角", "关键路径", "生命周期", "失败注入", "迁移能力"],
};

export function Gea3OfficialFinalReviewMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3OfficialFinalReviewExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3OfficialFinalReviewEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
