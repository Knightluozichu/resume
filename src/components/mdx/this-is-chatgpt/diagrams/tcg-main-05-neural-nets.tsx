import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["人工神经元","权重","偏置","激活函数","层","前向传播"] as const;

export function TcgMain05NeuralNetsMapLab() { return <OfficialTcgLab title="神经网络" concepts={concepts} accent="#b45309" view="map" />; }
export function TcgMain05NeuralNetsProbabilityLab() { return <OfficialTcgLab title="神经网络" concepts={concepts} accent="#b45309" view="probability" />; }
export function TcgMain05NeuralNetsEvidenceLab() { return <OfficialTcgLab title="神经网络" concepts={concepts} accent="#b45309" view="evidence" />; }
