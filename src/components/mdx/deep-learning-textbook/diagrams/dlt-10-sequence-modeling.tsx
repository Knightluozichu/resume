"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第10章 序列建模：循环和递归网络",
  "10.1 展开计算图",
  "10.2 循环神经网络",
  "10.3 双向RNN",
  "10.4 编码器-解码器序列到序列架构",
  "10.5 深度循环网络",
  "10.6 递归神经网络",
  "10.7 长期依赖的挑战",
] as const;
export function Dlt10SequenceModelingMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第10章 序列建模：循环和递归网络"
      concepts={concepts}
      accent="#7c3aed"
      view="map"
    />
  );
}
export function Dlt10SequenceModelingExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第10章 序列建模：循环和递归网络"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Dlt10SequenceModelingEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第10章 序列建模：循环和递归网络"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
