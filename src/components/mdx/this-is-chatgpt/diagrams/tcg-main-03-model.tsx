import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["模型","规则","参数","拟合","预测","简化表示"] as const;

export function TcgMain03ModelMapLab() { return <OfficialTcgLab title="什么是模型" concepts={concepts} accent="#4d7c0f" view="map" />; }
export function TcgMain03ModelProbabilityLab() { return <OfficialTcgLab title="什么是模型" concepts={concepts} accent="#4d7c0f" view="probability" />; }
export function TcgMain03ModelEvidenceLab() { return <OfficialTcgLab title="什么是模型" concepts={concepts} accent="#4d7c0f" view="evidence" />; }
