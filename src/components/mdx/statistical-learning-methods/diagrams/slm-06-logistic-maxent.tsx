import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-06-logistic-maxent",
  "title": "第6章 逻辑斯谛回归与最大熵模型",
  "concepts": [
    "第6章 逻辑斯谛回归与最大熵模型",
    "6.1 逻辑斯谛回归模型",
    "6.1.1 逻辑斯谛分布",
    "6.1.2 二项逻辑斯谛回归模型",
    "6.1.3 模型参数估计",
    "6.1.4 多项逻辑斯谛回归",
    "6.2 最大熵模型",
    "6.2.1 最大熵原理",
    "6.2.2 最大熵模型的定义",
    "6.2.3 最大熵模型的学习",
    "6.2.4 极大似然估计",
    "6.3 模型学习的最优化算法",
    "6.3.1 改进的迭代尺度法",
    "6.3.2 拟牛顿法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "概率与最大熵约束台",
    "axisA": {
      "label": "线性得分",
      "levels": [
        "负",
        "零",
        "正"
      ]
    },
    "axisB": {
      "label": "优化状态",
      "levels": [
        "初值",
        "迭代",
        "收敛残差"
      ]
    },
    "fault": "直接计算大指数导致溢出，或把最大熵约束与逻辑回归类别编码混为一谈",
    "practiceMode": "calculation",
    "metric": "概率与最大熵约束台命中率",
    "risk": "优化状态偏差风险",
    "invariant": "特征函数、参考类别、概率归一和似然符号必须一致；优化停止以梯度或目标残差为准，概率输出需独立校准。",
    "task": "手算6.1 逻辑斯谛回归模型的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm06LogisticMaxentMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm06LogisticMaxentExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm06LogisticMaxentEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
