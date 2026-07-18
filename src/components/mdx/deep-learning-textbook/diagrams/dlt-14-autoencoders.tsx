"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第14章 自编码器",
  "14.1 欠完备自编码器",
  "14.2 正则自编码器",
  "14.3 表示能力、层大小和深度",
  "14.4 随机编码器和解码器",
  "14.5 去噪自编码器",
  "14.6 使用自编码器学习流形",
  "14.7 收缩自编码器",
] as const;
export function Dlt14AutoencodersMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第14章 自编码器"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlt14AutoencodersExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第14章 自编码器"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlt14AutoencodersEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第14章 自编码器"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
