import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-04",
  title: "第4章 黄金标准",
  nodes: [
    "选择成熟领域",
    "参照专家表现",
    "设计专项任务",
    "导师反馈",
    "累计适应",
  ],
  focuses: ["音乐研究", "练习时长", "定义边界", "原则迁移", "万时误读"],
} as const;

export function Pdp16Chapter04DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter04FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter04TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
