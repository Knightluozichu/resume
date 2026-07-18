import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-07-while-coding",
  title: "第7章 当你编码时",
  nodes: ["感知阻力", "显化假设", "测量复杂度", "测试重构", "安全表达"],
  focuses: ["蜥蜴脑", "巧合式编程", "算法速度", "重构", "特性测试"],
} as const;

export function Tpp20Chapter07WhileCodingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter07WhileCodingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter07WhileCodingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
