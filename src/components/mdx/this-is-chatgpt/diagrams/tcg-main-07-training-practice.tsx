import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["超参数","初始化","学习率","批量","经验法则","复现实验"] as const;

export function TcgMain07TrainingPracticeMapLab() { return <OfficialTcgLab title="神经网络训练的实践与经验" concepts={concepts} accent="#be123c" view="map" />; }
export function TcgMain07TrainingPracticeProbabilityLab() { return <OfficialTcgLab title="神经网络训练的实践与经验" concepts={concepts} accent="#be123c" view="probability" />; }
export function TcgMain07TrainingPracticeEvidenceLab() { return <OfficialTcgLab title="神经网络训练的实践与经验" concepts={concepts} accent="#be123c" view="evidence" />; }
