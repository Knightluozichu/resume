import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-02-perceptron",
  "title": "第2章 感知机",
  "concepts": [
    "第2章 感知机",
    "2.1 感知机模型",
    "2.2 感知机学习策略",
    "2.2.1 数据集的线性可分性",
    "2.2.2 感知机学习策略",
    "2.3 感知机学习算法",
    "2.3.1 感知机学习算法的原始形式",
    "2.3.2 算法的收敛性",
    "2.3.3 感知机学习算法的对偶形式"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "感知机错分更新台",
    "axisA": {
      "label": "样本间隔",
      "levels": [
        "正确",
        "边界",
        "错分"
      ]
    },
    "axisB": {
      "label": "表示形式",
      "levels": [
        "原始",
        "对偶",
        "Gram矩阵"
      ]
    },
    "fault": "对不可分数据继续声称有限步收敛，或更新符号与标签编码相反",
    "practiceMode": "calculation",
    "metric": "感知机错分更新台命中率",
    "risk": "表示形式偏差风险",
    "invariant": "收敛保证只适用于线性可分数据；更新符号、误分类判据、样本顺序和初值必须记录，非可分数据需要停止或改用软约束。",
    "task": "手算2.1 感知机模型的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm02PerceptronMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm02PerceptronExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm02PerceptronEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
