import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["逐token生成","概率模型","神经网络","嵌入","语义规律","计算知识增强"] as const;

export function TcgOfficialLearningMapMapLab() { return <OfficialTcgLab title="《这就是ChatGPT》权威学习地图" concepts={concepts} accent="#0f766e" view="map" />; }
export function TcgOfficialLearningMapProbabilityLab() { return <OfficialTcgLab title="《这就是ChatGPT》权威学习地图" concepts={concepts} accent="#0f766e" view="probability" />; }
export function TcgOfficialLearningMapEvidenceLab() { return <OfficialTcgLab title="《这就是ChatGPT》权威学习地图" concepts={concepts} accent="#0f766e" view="evidence" />; }
