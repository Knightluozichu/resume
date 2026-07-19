import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-19-mcmc",
  "title": "第19章 马尔可夫链蒙特卡罗法",
  "concepts": [
    "第19章 马尔可夫链蒙特卡罗法",
    "19.1 蒙特卡罗法",
    "19.1.1 随机抽样",
    "19.1.2 数学期望估计",
    "19.1.3 积分计算",
    "19.2 马尔可夫链",
    "19.2.1 基本定义",
    "19.2.2 离散状态马尔可夫链",
    "19.2.3 连续状态马尔可夫链",
    "19.2.4 马尔可夫链的性质",
    "19.3 马尔可夫链蒙特卡罗法",
    "19.3.1 基本想法",
    "19.3.2 基本步骤",
    "19.3.3 马尔可夫链蒙特卡罗法与统计学习",
    "19.4 Metropolis-Hastings算法",
    "19.4.1 基本原理",
    "19.4.2 Metropolis-Hastings算法",
    "19.4.3 单分量 Metropolis-Hastings算法",
    "19.5 吉布斯抽样",
    "19.5.1 基本原理",
    "19.5.2 吉布斯抽样算法",
    "19.5.3 抽样计算"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "MCMC混合与有效样本台",
    "axisA": {
      "label": "提议尺度",
      "levels": [
        "太小",
        "适中",
        "太大"
      ]
    },
    "axisB": {
      "label": "链阶段",
      "levels": [
        "烧入",
        "稳定",
        "相关样本"
      ]
    },
    "fault": "把相关样本按iid计算误差，或未混合就报告后验期望",
    "practiceMode": "calculation",
    "metric": "MCMC混合与有效样本台命中率",
    "risk": "链阶段偏差风险",
    "invariant": "目标分布、提议分布、接受率、烧入期和链状态必须保存；相关样本不能按iid计算误差，未混合链不得用于结论。",
    "task": "手算19.1 蒙特卡罗法的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm19McmcMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm19McmcExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm19McmcEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
