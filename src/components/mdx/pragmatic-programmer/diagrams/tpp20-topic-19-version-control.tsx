import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-19-version-control",
  title: "19 版本控制",
  nodes: ["变更", "提交", "审查", "标记", "恢复"],
  focuses: ["版本控制", "原子提交", "可追溯性", "发布标签", "灾难恢复"],
} as const;

export function Tpp20Topic19VersionControlSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic19VersionControlFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic19VersionControlEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
