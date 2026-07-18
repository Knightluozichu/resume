import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["嵌入","特征空间","距离","相似性","降维","语义方向"] as const;

export function TcgMain09EmbeddingsMapLab() { return <OfficialTcgLab title="嵌入的概念" concepts={concepts} accent="#0f766e" view="map" />; }
export function TcgMain09EmbeddingsProbabilityLab() { return <OfficialTcgLab title="嵌入的概念" concepts={concepts} accent="#0f766e" view="probability" />; }
export function TcgMain09EmbeddingsEvidenceLab() { return <OfficialTcgLab title="嵌入的概念" concepts={concepts} accent="#0f766e" view="evidence" />; }
