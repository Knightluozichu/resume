import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_Memory
const officialQualityProps = {
  title: "记忆系统 Memory",
  stages: [
    "记忆系统 Memory",
    "小特聊久了会忘事，得有个本子记下来",
    "两种记忆：脑子里的当下，本子里的长期",
    "记忆怎么用起来：写入、检索、遗忘三个操作",
    "检索的灵魂：按「意思」找回，不是按关键词",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevMemoryMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevMemoryExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevMemoryEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
