import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-appendices",
  "title": "附录 最优化与矩阵工具",
  "concepts": [
    "附录 A 梯度下降法",
    "附录 B 牛顿法和拟牛顿法",
    "附录 C 拉格朗日对偶性",
    "附录 D 矩阵的基本子空间",
    "附录 E KL散度的定义和狄利克雷分布的性质"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "优化与矩阵残差台",
    "axisA": {
      "label": "数学工具",
      "levels": [
        "梯度",
        "二阶/对偶",
        "矩阵与散度"
      ]
    },
    "axisB": {
      "label": "检查层级",
      "levels": [
        "形状",
        "数值",
        "最优性残差"
      ]
    },
    "fault": "数值函数返回结果就继续下游，而梯度、正定性、约束或归一残差未通过",
    "practiceMode": "calculation",
    "metric": "优化与矩阵残差台命中率",
    "risk": "检查层级偏差风险",
    "invariant": "向量矩阵形状、约束资格、正定性、线搜索条件和概率归一必须显式；数值残差不通过时不得采信下游模型结果。",
    "task": "手算附录 B 牛顿法和拟牛顿法的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function SlmAppendicesMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function SlmAppendicesExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function SlmAppendicesEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
