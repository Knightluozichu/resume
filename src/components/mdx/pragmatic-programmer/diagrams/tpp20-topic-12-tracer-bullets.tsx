import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-12-tracer-bullets",
  title: "12 曳光弹",
  nodes: ["目标", "最细纵切", "真实边界", "反馈", "扩展"],
  focuses: ["曳光弹", "端到端切片", "真实集成", "着弹点", "迭代方向"],
} as const;

export function Tpp20Topic12TracerBulletsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic12TracerBulletsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic12TracerBulletsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
