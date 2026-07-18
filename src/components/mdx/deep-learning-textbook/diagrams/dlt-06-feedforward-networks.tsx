"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第2部分 深度网络：现代实践",
  "第6章 深度前馈网络",
  "6.1 示例：学习XOR",
  "6.2 基于梯度的学习",
  "6.3 隐藏单元",
  "6.4 架构设计",
  "6.5 反向传播和其他微分算法",
  "6.6 历史小记",
] as const;
export function Dlt06FeedforwardNetworksMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第6章 深度前馈网络"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function Dlt06FeedforwardNetworksExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第6章 深度前馈网络"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Dlt06FeedforwardNetworksEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第6章 深度前馈网络"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
