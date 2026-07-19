import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-14-clustering",
  "title": "第14章 聚类方法",
  "concepts": [
    "第14章 聚类方法",
    "14.1 聚类的基本概念",
    "14.1.1 相似度或距离",
    "14.1.2 类或簇",
    "14.1.3 类与类之间的距离",
    "14.2 层次聚类",
    "14.3 k均值聚类",
    "14.3.1 模型",
    "14.3.2 策略",
    "14.3.3 算法",
    "14.3.4 算法特性"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "聚类距离与中心更新台",
    "axisA": {
      "label": "簇数k",
      "levels": [
        "偏小",
        "候选",
        "偏大"
      ]
    },
    "axisB": {
      "label": "初始化",
      "levels": [
        "固定差",
        "多起点",
        "稳定中心"
      ]
    },
    "fault": "混用不同尺度距离，或把k均值局部最优当唯一全局划分",
    "practiceMode": "calculation",
    "metric": "聚类距离与中心更新台命中率",
    "risk": "初始化偏差风险",
    "invariant": "特征缩放、距离、簇数、初始化和停止规则必须冻结；簇编号无语义，评价需置换不变并报告跨初始化稳定性。",
    "task": "手算14.1 聚类的基本概念的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm14ClusteringMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm14ClusteringExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm14ClusteringEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
