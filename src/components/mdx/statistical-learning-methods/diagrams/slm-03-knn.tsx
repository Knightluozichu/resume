import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-03-knn",
  "title": "第3章 k近邻法",
  "concepts": [
    "第3章 k近邻法",
    "3.1 k近邻算法",
    "3.2 k近邻模型",
    "3.2.1 模型",
    "3.2.2 距离度量",
    "3.2.3 k值的选择",
    "3.2.4 分类决策规则",
    "3.3 k近邻法的实现：kd树",
    "3.3.1 构造 kd树",
    "3.3.2 搜索 kd树"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "k近邻与kd树搜索台",
    "axisA": {
      "label": "邻居数k",
      "levels": [
        "1",
        "适中",
        "接近样本数"
      ]
    },
    "axisB": {
      "label": "距离尺度",
      "levels": [
        "未缩放",
        "统一缩放",
        "加权距离"
      ]
    },
    "fault": "训练折分外计算缩放统计，或kd树回溯漏掉可能更近的另一分支",
    "practiceMode": "calculation",
    "metric": "k近邻与kd树搜索台命中率",
    "risk": "距离尺度偏差风险",
    "invariant": "特征尺度、距离、k值和并列规则必须由训练与验证确定；kd树剪枝必须证明未访问区域不可能含更近点。",
    "task": "手算3.1 k近邻算法的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm03KnnMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm03KnnExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm03KnnEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
