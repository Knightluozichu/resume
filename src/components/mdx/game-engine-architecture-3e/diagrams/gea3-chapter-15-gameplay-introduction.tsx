import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-15-gameplay-introduction",
  title: "第15章 Introduction to Gameplay Systems",
  nodes: [
    "定义世界边界",
    "选择对象模型",
    "声明数据模式",
    "编辑并验证内容",
    "加载到运行时",
  ],
  focuses: ["世界分区", "对象组合", "模式演化", "编辑事务", "运行时一致"],
};

export function Gea3Chapter15GameplayIntroductionMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter15GameplayIntroductionExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter15GameplayIntroductionEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
