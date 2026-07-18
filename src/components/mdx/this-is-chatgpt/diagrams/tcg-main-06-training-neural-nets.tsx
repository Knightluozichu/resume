import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["训练样本","损失","梯度","反向传播","批次","优化"] as const;

export function TcgMain06TrainingNeuralNetsMapLab() { return <OfficialTcgLab title="机器学习和神经网络训练" concepts={concepts} accent="#1d4ed8" view="map" />; }
export function TcgMain06TrainingNeuralNetsProbabilityLab() { return <OfficialTcgLab title="机器学习和神经网络训练" concepts={concepts} accent="#1d4ed8" view="probability" />; }
export function TcgMain06TrainingNeuralNetsEvidenceLab() { return <OfficialTcgLab title="机器学习和神经网络训练" concepts={concepts} accent="#1d4ed8" view="evidence" />; }
