import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_Rag
const officialQualityProps = {
  title: "RAG 检索增强生成",
  stages: [
    "RAG 检索增强生成",
    "闭卷凭记忆瞎说，不如开卷先翻资料再答",
    "为什么要 RAG：把「闭卷」改成「开卷」",
    "Embedding 与向量：把「意思」变成一串数字",
    "Chunk 切分：长文档先切小块，再各自向量化",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevRagMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevRagExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevRagEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
