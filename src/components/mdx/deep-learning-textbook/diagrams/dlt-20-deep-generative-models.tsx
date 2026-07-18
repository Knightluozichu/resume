"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第20章 深度生成模型",
  "20.1 玻尔兹曼机",
  "20.2 受限玻尔兹曼机",
  "20.3 深度信念网络",
  "20.4 深度玻尔兹曼机",
  "20.5 实值数据上的玻尔兹曼机",
  "20.6 卷积玻尔兹曼机",
  "20.7 结构化或序列输出的玻尔兹曼机",
] as const;
export function Dlt20DeepGenerativeModelsMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第20章 深度生成模型"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlt20DeepGenerativeModelsExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第20章 深度生成模型"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlt20DeepGenerativeModelsEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第20章 深度生成模型"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
