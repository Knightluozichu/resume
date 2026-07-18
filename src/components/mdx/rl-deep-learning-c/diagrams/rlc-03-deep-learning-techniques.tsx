"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "第3章 深度学习技术",
  "人工神经元",
  "分层网络",
  "反向传播",
  "多输出网络",
  "卷积核",
  "特征图",
  "实现深度学习的技术",
] as const;
export function Rlc03DeepLearningTechniquesMapLab() {
  return (
    <OfficialRlcLab
      title="第3章 深度学习技术"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Rlc03DeepLearningTechniquesExperimentLab() {
  return (
    <OfficialRlcLab
      title="第3章 深度学习技术"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Rlc03DeepLearningTechniquesEvidenceLab() {
  return (
    <OfficialRlcLab
      title="第3章 深度学习技术"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
