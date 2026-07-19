import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-08-boosting",
  "title": "第8章 提升方法",
  "concepts": [
    "第8章 提升方法",
    "8.1 提升方法 AdaBoost算法",
    "8.1.1 提升方法的基本思路",
    "8.1.2 AdaBoost算法",
    "8.1.3 AdaBoost的例子",
    "8.2 AdaBoost算法的训练误差分析",
    "8.3 AdaBoost算法的解释",
    "8.3.1 前向分步算法",
    "8.3.2 前向分步算法与 AdaBoost",
    "8.4 提升树",
    "8.4.1 提升树模型",
    "8.4.2 提升树算法",
    "8.4.3 梯度提升"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "样本权重与加法模型台",
    "axisA": {
      "label": "弱学习器轮数",
      "levels": [
        "少",
        "验证最优",
        "过多"
      ]
    },
    "axisB": {
      "label": "错分权重",
      "levels": [
        "均匀",
        "重加权",
        "极端集中"
      ]
    },
    "fault": "归一化或分类器系数符号错误，使错分样本权重反而下降",
    "practiceMode": "calculation",
    "metric": "样本权重与加法模型台命中率",
    "risk": "错分权重偏差风险",
    "invariant": "每轮样本分布、基学习器错误率、alpha与归一化因子必须留存；弱学习器不优于随机时停止，验证集不参与重加权。",
    "task": "手算8.1 提升方法 AdaBoost算法的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm08BoostingMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm08BoostingExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm08BoostingEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
