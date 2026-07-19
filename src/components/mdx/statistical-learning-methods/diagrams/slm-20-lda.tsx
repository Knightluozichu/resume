import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-20-lda",
  "title": "第20章 潜在狄利克雷分配",
  "concepts": [
    "第20章 潜在狄利克雷分配",
    "20.1 狄利克雷分布",
    "20.1.1 分布定义",
    "20.1.2 共轭先验",
    "20.2 潜在狄利克雷分配模型",
    "20.2.1 基本想法",
    "20.2.2 模型定义",
    "20.2.3 概率图模型",
    "20.2.4 随机变量序列的可交换性",
    "20.2.5 概率公式",
    "20.3 LDA的吉布斯抽样算法",
    "20.3.1 基本想法",
    "20.3.2 算法的主要部分",
    "20.3.3 算法的后处理",
    "20.3.4 算法",
    "20.4 LDA的变分 EM算法",
    "20.4.1 变分推理",
    "20.4.2 变分 EM算法",
    "20.4.3 算法推导",
    "20.4.4 算法总结"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "LDA计数与后验推断台",
    "axisA": {
      "label": "超参数浓度",
      "levels": [
        "稀疏",
        "适中",
        "平滑"
      ]
    },
    "axisB": {
      "label": "推断方法",
      "levels": [
        "Gibbs",
        "变分E步",
        "变分M步"
      ]
    },
    "fault": "采样计数未先减当前词，或变分更新复用过期期望",
    "practiceMode": "calculation",
    "metric": "LDA计数与后验推断台命中率",
    "risk": "推断方法偏差风险",
    "invariant": "词表、超参数、计数排除当前词的约定和归一化必须一致；采样检查混合，变分检查ELBO，话题标签允许置换。",
    "task": "手算20.1 狄利克雷分布的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm20LdaMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm20LdaExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm20LdaEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
