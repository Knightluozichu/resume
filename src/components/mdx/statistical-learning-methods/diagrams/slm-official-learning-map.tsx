import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-official-learning-map",
  "title": "《统计学习方法（第2版）》权威学习地图",
  "concepts": [
    "第1章 统计学习及监督学习概论",
    "第2章 感知机",
    "第3章 k近邻法",
    "第4章 朴素贝叶斯法",
    "第5章 决策树",
    "第6章 逻辑斯谛回归与最大熵模型",
    "第7章 支持向量机",
    "第8章 提升方法",
    "第9章 EM算法及其推广",
    "第10章 隐马尔可夫模型",
    "第11章 条件随机场",
    "第12章 监督学习方法总结",
    "第13章 无监督学习概论",
    "第14章 聚类方法",
    "第15章 奇异值分解",
    "第16章 主成分分析",
    "第17章 潜在语义分析",
    "第18章 概率潜在语义分析",
    "第19章 马尔可夫链蒙特卡罗法",
    "第20章 潜在狄利克雷分配",
    "第21章 PageRank算法",
    "第22章 无监督学习方法总结",
    "附录 最优化与矩阵工具"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "285节点学习路线台",
    "axisA": {
      "label": "学习阶段",
      "levels": [
        "模型",
        "策略",
        "算法"
      ]
    },
    "axisB": {
      "label": "证据层级",
      "levels": [
        "定义",
        "手算",
        "反例与独立评价"
      ]
    },
    "fault": "只按算法名称导航，跳过目标、成立前提和评价边界",
    "practiceMode": "design",
    "metric": "285节点学习路线台命中率",
    "risk": "证据层级偏差风险",
    "invariant": "2篇、22章、256个编号节/小节和5个附录必须全部可导航；每种方法都有定义、目标、算法、中间证据、独立评价和失败边界。",
    "task": "手算第2章 感知机的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function SlmOfficialLearningMapMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function SlmOfficialLearningMapExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function SlmOfficialLearningMapEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
