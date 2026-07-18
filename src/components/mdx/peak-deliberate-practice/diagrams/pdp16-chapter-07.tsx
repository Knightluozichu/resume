import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-07",
  title: "第7章 成为杰出人物的路线图",
  nodes: ["产生兴趣", "形成习惯", "获得指导", "全力投入", "开拓创新"],
  focuses: ["成长案例", "兴趣阶段", "认真阶段", "投入阶段", "创新阶段"],
} as const;

export function Pdp16Chapter07DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter07FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter07TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
