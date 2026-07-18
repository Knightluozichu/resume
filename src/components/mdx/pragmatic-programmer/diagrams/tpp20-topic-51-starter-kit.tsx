import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-51-starter-kit",
  title: "51 务实的入门套件",
  nodes: ["提交", "构建", "测试", "发布", "监测"],
  focuses: ["入门套件", "持续集成", "自动测试", "变异测试", "状态覆盖"],
} as const;

export function Tpp20Topic51StarterKitSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic51StarterKitFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic51StarterKitEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
