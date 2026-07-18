import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-02",
  title: "第2章 大脑的适应能力",
  nodes: ["施加负荷", "产生扰动", "恢复适应", "测量变化", "检查边界"],
  focuses: ["空间导航", "适应机制", "舒适区", "结构变化", "潜能构筑"],
} as const;

export function Pdp16Chapter02DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter02FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter02TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
