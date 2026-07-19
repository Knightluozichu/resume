import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-04-naive-bayes",
  "title": "第4章 朴素贝叶斯法",
  "concepts": [
    "第4章 朴素贝叶斯法",
    "4.1 朴素贝叶斯法的学习与分类",
    "4.1.1 基本方法",
    "4.1.2 后验概率最大化的含义",
    "4.2 朴素贝叶斯法的参数估计",
    "4.2.1 极大似然估计",
    "4.2.2 学习与分类算法",
    "4.2.3 贝叶斯估计"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "朴素贝叶斯后验台",
    "axisA": {
      "label": "平滑强度",
      "levels": [
        "零",
        "适中",
        "过强"
      ]
    },
    "axisB": {
      "label": "特征证据",
      "levels": [
        "单特征",
        "多特征",
        "未见取值"
      ]
    },
    "fault": "未见取值使条件概率为零，整类后验被错误清空",
    "practiceMode": "calculation",
    "metric": "朴素贝叶斯后验台命中率",
    "risk": "特征证据偏差风险",
    "invariant": "先验、条件独立、取值空间和平滑常数必须显式；所有概率在训练折估计并用对数域计算，测试频率不能回流。",
    "task": "手算4.1 朴素贝叶斯法的学习与分类的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm04NaiveBayesMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm04NaiveBayesExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm04NaiveBayesEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
