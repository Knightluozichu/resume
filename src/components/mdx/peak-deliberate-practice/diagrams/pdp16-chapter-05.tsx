import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-05",
  title: "第5章 在工作中运用刻意练习原则",
  nodes: ["抽取关键情境", "模拟任务", "即时决策", "复盘偏差", "重演验证"],
  focuses: ["王牌训练", "日常嵌入", "医学模拟", "知识教学", "技能改进"],
} as const;

export function Pdp16Chapter05DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter05FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter05TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
