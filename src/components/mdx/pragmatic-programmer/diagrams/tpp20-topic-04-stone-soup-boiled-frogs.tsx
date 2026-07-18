import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-04-stone-soup-boiled-frogs",
  title: "4 石头做的汤和煮熟的青蛙",
  nodes: ["愿景", "最小展示", "参与", "增量", "全景复核"],
  focuses: ["催化剂", "参与成本", "范围漂移", "全景指标", "停止条件"],
} as const;

export function Tpp20Topic04StoneSoupBoiledFrogsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic04StoneSoupBoiledFrogsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic04StoneSoupBoiledFrogsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
