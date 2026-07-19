import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-16-pca",
  "title": "第16章 主成分分析",
  "concepts": [
    "第16章 主成分分析",
    "16.1 总体主成分分析",
    "16.1.1 基本想法",
    "16.1.2 定义和导出",
    "16.1.3 主要性质",
    "16.1.4 主成分的个数",
    "16.1.5 规范化变量的总体主成分",
    "16.2 样本主成分分析",
    "16.2.1 样本主成分的定义和性质",
    "16.2.2 相关矩阵的特征值分解算法",
    "16.2.3 数据矩阵的奇异值分解算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "PCA方差与标准化台",
    "axisA": {
      "label": "主成分数",
      "levels": [
        "少",
        "累计方差阈值",
        "全部"
      ]
    },
    "axisB": {
      "label": "输入尺度",
      "levels": [
        "原量纲",
        "中心化",
        "标准化"
      ]
    },
    "fault": "在全数据上拟合均值方差，或把高方差方向自动解释为高预测价值",
    "practiceMode": "calculation",
    "metric": "PCA方差与标准化台命中率",
    "risk": "输入尺度偏差风险",
    "invariant": "中心化与标准化只用训练数据拟合；协方差PCA和相关矩阵PCA不可混用，维数选择不能查看测试标签。",
    "task": "手算16.1 总体主成分分析的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm16PcaMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm16PcaExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm16PcaEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
