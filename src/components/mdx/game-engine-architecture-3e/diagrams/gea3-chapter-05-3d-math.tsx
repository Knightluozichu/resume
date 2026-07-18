import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-05-3d-math",
  title: "第5章 3D Math for Games",
  nodes: ["声明坐标空间", "选择表示", "组合变换", "检查数值误差", "跨系统复算"],
  focuses: ["空间语义", "旋转表示", "变换顺序", "数值稳定", "随机可复现"],
};

export function Gea3Chapter053dMathMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter053dMathExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter053dMathEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
