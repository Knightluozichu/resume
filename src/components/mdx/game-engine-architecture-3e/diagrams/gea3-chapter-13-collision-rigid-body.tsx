import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-13-collision-rigid-body",
  title: "第13章 Collision and Rigid Body Dynamics",
  nodes: [
    "同步碰撞形状",
    "生成候选对",
    "计算接触",
    "求解约束",
    "回写变换与事件",
  ],
  focuses: ["形状近似", "宽窄相", "积分稳定", "约束收敛", "双向同步"],
};

export function Gea3Chapter13CollisionRigidBodyMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter13CollisionRigidBodyExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter13CollisionRigidBodyEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
