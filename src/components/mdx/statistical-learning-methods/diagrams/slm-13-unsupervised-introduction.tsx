import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-13-unsupervised-introduction",
  "title": "第13章 无监督学习概论",
  "concepts": [
    "第2篇 无监督学习",
    "第13章 无监督学习概论",
    "13.1 无监督学习基本原理",
    "13.2 基本问题",
    "13.3 机器学习三要素",
    "13.4 无监督学习方法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "无监督目标—证据台",
    "axisA": {
      "label": "目标类型",
      "levels": [
        "距离",
        "重构",
        "似然"
      ]
    },
    "axisB": {
      "label": "独立评价",
      "levels": [
        "稳定性",
        "留出数据",
        "下游任务"
      ]
    },
    "fault": "没有标签就不设评价门，事后只挑最好看的二维图",
    "practiceMode": "design",
    "metric": "无监督目标—证据台命中率",
    "risk": "独立评价偏差风险",
    "invariant": "没有标签不等于没有假设；相似度、潜变量、重构或似然目标必须与用途对应，并用稳定性、留出似然或下游任务独立评价。",
    "task": "手算第13章 无监督学习概论的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm13UnsupervisedIntroductionMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm13UnsupervisedIntroductionExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm13UnsupervisedIntroductionEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
