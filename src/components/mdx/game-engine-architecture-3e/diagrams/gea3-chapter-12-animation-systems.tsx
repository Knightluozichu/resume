import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-12-animation-systems",
  title: "第12章 Animation Systems",
  nodes: [
    "采样动作片段",
    "混合局部姿态",
    "求值骨架层级",
    "执行约束后处理",
    "生成蒙皮调色板",
  ],
  focuses: ["时间同步", "空间转换", "混合连续", "压缩误差", "求解预算"],
};

export function Gea3Chapter12AnimationSystemsMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter12AnimationSystemsExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter12AnimationSystemsEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
