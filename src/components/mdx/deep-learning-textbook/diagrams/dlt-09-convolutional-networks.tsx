"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第9章 卷积网络",
  "9.1 卷积运算",
  "9.2 动机",
  "9.3 池化",
  "9.4 作为无限强先验的卷积与池化",
  "9.5 基本卷积函数的变体",
  "9.6 结构化输出",
  "9.7 数据类型",
] as const;
export function Dlt09ConvolutionalNetworksMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第9章 卷积网络"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlt09ConvolutionalNetworksExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第9章 卷积网络"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlt09ConvolutionalNetworksEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第9章 卷积网络"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
