import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-17-lsa",
  "title": "第17章 潜在语义分析",
  "concepts": [
    "第17章 潜在语义分析",
    "17.1 单词向量空间与话题向量空间",
    "17.1.1 单词向量空间",
    "17.1.2 话题向量空间",
    "17.2 潜在语义分析算法",
    "17.2.1 矩阵奇异值分解算法",
    "17.2.2 例子",
    "17.3 非负矩阵分解算法",
    "17.3.1 非负矩阵分解",
    "17.3.2 潜在语义分析模型",
    "17.3.3 非负矩阵分解的形式化",
    "17.3.4 算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "词项矩阵与潜在空间台",
    "axisA": {
      "label": "潜在秩",
      "levels": [
        "低",
        "适中",
        "高"
      ]
    },
    "axisB": {
      "label": "词项权重",
      "levels": [
        "计数",
        "TF-IDF",
        "归一化"
      ]
    },
    "fault": "词表或IDF使用测试语料，造成潜在空间信息泄漏",
    "practiceMode": "calculation",
    "metric": "词项矩阵与潜在空间台命中率",
    "risk": "词项权重偏差风险",
    "invariant": "词表、计数或权重、截断秩和归一化只在训练语料确定；SVD符号与NMF置换不影响模型，话题解释需跨种子稳定。",
    "task": "手算17.1 单词向量空间与话题向量空间的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm17LsaMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm17LsaExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm17LsaEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
