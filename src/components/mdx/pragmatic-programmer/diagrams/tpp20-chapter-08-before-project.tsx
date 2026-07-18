import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-08-before-project",
  title: "第8章 项目启动之前",
  nodes: ["目标探索", "约束识别", "共同工作", "小步反馈", "适应调整"],
  focuses: ["需求反馈", "真实约束", "结对协作", "敏捷", "项目术语"],
} as const;

export function Tpp20Chapter08BeforeProjectSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter08BeforeProjectFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter08BeforeProjectEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
