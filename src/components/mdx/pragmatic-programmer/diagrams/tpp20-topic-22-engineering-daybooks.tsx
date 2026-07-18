import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-22-engineering-daybooks",
  title: "22 工程日记",
  nodes: ["问题", "假设", "操作", "结果", "后续"],
  focuses: ["工程日记", "时间坐标", "决策理由", "实验记录", "追踪项"],
} as const;

export function Tpp20Topic22EngineeringDaybooksSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic22EngineeringDaybooksFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic22EngineeringDaybooksEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
