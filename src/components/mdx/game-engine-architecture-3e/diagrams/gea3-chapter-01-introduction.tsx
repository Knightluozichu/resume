import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-01-introduction",
  title: "第1章 Introduction",
  nodes: [
    "冻结游戏约束",
    "画团队交付图",
    "划分运行时层",
    "追踪资产变换",
    "验证类型差异",
  ],
  focuses: ["团队边界", "实时模拟", "复用范围", "层间依赖", "资产可追溯"],
};

export function Gea3Chapter01IntroductionMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter01IntroductionExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter01IntroductionEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
