"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤6 神经网络",
  "6.1 PyTorch和梯度法",
  "6.1.1 PyTorch的安装",
  "6.1.2 张量的计算",
  "6.1.3 梯度法",
  "6.2 线性回归",
  "6.2.1 玩具数据集",
  "6.2.2 线性回归的理论知识",
] as const;
export function Dlg06NeuralNetworkMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤6 神经网络"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function Dlg06NeuralNetworkExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤6 神经网络"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Dlg06NeuralNetworkEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤6 神经网络"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
