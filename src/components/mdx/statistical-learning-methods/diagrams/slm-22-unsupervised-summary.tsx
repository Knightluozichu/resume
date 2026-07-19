import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-22-unsupervised-summary",
  "title": "第22章 无监督学习方法总结",
  "concepts": [
    "第22章 无监督学习方法总结",
    "22.1 无监督学习方法的关系和特点",
    "22.1.1 各种方法之间的关系",
    "22.1.2 无监督学习方法",
    "22.1.3 基础机器学习方法",
    "22.2 话题模型之间的关系和特点"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "无监督方法关系矩阵",
    "axisA": {
      "label": "数据对象",
      "levels": [
        "样本",
        "矩阵",
        "图或文本"
      ]
    },
    "axisB": {
      "label": "学习目标",
      "levels": [
        "划分",
        "表示",
        "概率生成"
      ]
    },
    "fault": "用单一内部指标跨目标比较方法，忽略可识别性与下游用途",
    "practiceMode": "design",
    "metric": "无监督方法关系矩阵命中率",
    "risk": "学习目标偏差风险",
    "invariant": "无监督训练目标不能直接充当应用质量；所有方法需说明不变性、不可辨识性、稳定性和独立评价，话题与簇标签允许置换。",
    "task": "手算22.1 无监督学习方法的关系和特点的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm22UnsupervisedSummaryMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm22UnsupervisedSummaryExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm22UnsupervisedSummaryEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
