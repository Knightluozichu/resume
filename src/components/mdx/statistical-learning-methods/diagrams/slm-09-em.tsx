import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-09-em",
  "title": "第9章 EM算法及其推广",
  "concepts": [
    "第9章 EM算法及其推广",
    "9.1 EM算法的引入",
    "9.1.1 EM算法",
    "9.1.2 EM算法的导出",
    "9.1.3 EM算法在无监督学习中的应用",
    "9.2 EM算法的收敛性",
    "9.3 EM算法在高斯混合模型学习中的应用",
    "9.3.1 高斯混合模型",
    "9.3.2 高斯混合模型参数估计的 EM算法",
    "9.4 EM算法的推广",
    "9.4.1 F函数的极大-极大算法",
    "9.4.2 GEM算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "EM责任度与似然台",
    "axisA": {
      "label": "初始化",
      "levels": [
        "对称",
        "分散",
        "多起点"
      ]
    },
    "axisB": {
      "label": "迭代阶段",
      "levels": [
        "旧参数E步",
        "新参数M步",
        "似然复核"
      ]
    },
    "fault": "E步偷用新参数或责任度未归一，观测对数似然出现非数值下降",
    "practiceMode": "calculation",
    "metric": "EM责任度与似然台命中率",
    "risk": "迭代阶段偏差风险",
    "invariant": "E步使用旧参数，M步产生新参数；每轮观测对数似然不得下降，责任度归一，初始化与局部最优必须报告。",
    "task": "手算9.1 EM算法的引入的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm09EmMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm09EmExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm09EmEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
