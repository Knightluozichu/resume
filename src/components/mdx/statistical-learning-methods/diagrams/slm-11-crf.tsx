import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-11-crf",
  "title": "第11章 条件随机场",
  "concepts": [
    "第11章 条件随机场",
    "11.1 概率无向图模型",
    "11.1.1 模型定义",
    "11.1.2 概率无向图模型的因子分解",
    "11.2 条件随机场的定义与形式",
    "11.2.1 条件随机场的定义",
    "11.2.2 条件随机场的参数化形式",
    "11.2.3 条件随机场的简化形式",
    "11.2.4 条件随机场的矩阵形式",
    "11.3 条件随机场的概率计算问题",
    "11.3.1 前向-后向算法",
    "11.3.2 概率计算",
    "11.3.3 期望值的计算",
    "11.4 条件随机场的学习算法",
    "11.4.1 改进的迭代尺度法",
    "11.4.2 拟牛顿法",
    "11.5 条件随机场的预测算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "CRF特征与配分函数台",
    "axisA": {
      "label": "特征权重",
      "levels": [
        "负",
        "零",
        "正"
      ]
    },
    "axisB": {
      "label": "推断任务",
      "levels": [
        "归一化",
        "期望",
        "最优标注"
      ]
    },
    "fault": "把局部归一当全局配分函数，或训练与预测使用不同特征索引",
    "practiceMode": "calculation",
    "metric": "CRF特征与配分函数台命中率",
    "risk": "推断任务偏差风险",
    "invariant": "特征函数、边界状态、配分函数与序列索引必须一致；概率和边缘需归一，训练梯度由经验期望减模型期望核对。",
    "task": "手算11.1 概率无向图模型的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm11CrfMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm11CrfExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm11CrfEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
