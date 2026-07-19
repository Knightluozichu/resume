import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-10-hmm",
  "title": "第10章 隐马尔可夫模型",
  "concepts": [
    "第10章 隐马尔可夫模型",
    "10.1 隐马尔可夫模型的基本概念",
    "10.1.1 隐马尔可夫模型的定义",
    "10.1.2 观测序列的生成过程",
    "10.1.3 隐马尔可夫模型的 3个基本问题",
    "10.2 概率计算算法",
    "10.2.1 直接计算法",
    "10.2.2 前向算法",
    "10.2.3 后向算法",
    "10.2.4 一些概率与期望值的计算",
    "10.3 学习算法",
    "10.3.1 监督学习方法",
    "10.3.2 Baum-Welch算法",
    "10.3.3 Baum-Welch模型参数估计公式",
    "10.4 预测算法",
    "10.4.1 近似算法",
    "10.4.2 维特比算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "HMM三问题动态规划台",
    "axisA": {
      "label": "序列长度",
      "levels": [
        "短",
        "中",
        "长"
      ]
    },
    "axisB": {
      "label": "计算域",
      "levels": [
        "原概率",
        "缩放",
        "对数域"
      ]
    },
    "fault": "长序列直接连乘下溢，或前向、后向和维特比递推索引错一位",
    "practiceMode": "calculation",
    "metric": "HMM三问题动态规划台命中率",
    "risk": "计算域偏差风险",
    "invariant": "状态与观测索引、概率归一、缩放因子和终止约定必须一致；总概率、后验边缘和最优路径是不同对象。",
    "task": "手算10.1 隐马尔可夫模型的基本概念的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm10HmmMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm10HmmExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm10HmmEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
