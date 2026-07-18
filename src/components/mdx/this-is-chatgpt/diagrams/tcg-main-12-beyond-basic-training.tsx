import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["基础模型","指令微调","人类反馈","奖励模型","对齐","行为约束"] as const;

export function TcgMain12BeyondBasicTrainingMapLab() { return <OfficialTcgLab title="超越基础训练" concepts={concepts} accent="#be123c" view="map" />; }
export function TcgMain12BeyondBasicTrainingProbabilityLab() { return <OfficialTcgLab title="超越基础训练" concepts={concepts} accent="#be123c" view="probability" />; }
export function TcgMain12BeyondBasicTrainingEvidenceLab() { return <OfficialTcgLab title="超越基础训练" concepts={concepts} accent="#be123c" view="evidence" />; }
