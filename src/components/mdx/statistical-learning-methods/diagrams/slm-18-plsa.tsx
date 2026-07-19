import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-18-plsa",
  "title": "第18章 概率潜在语义分析",
  "concepts": [
    "第18章 概率潜在语义分析",
    "18.1 概率潜在语义分析模型",
    "18.1.1 基本想法",
    "18.1.2 生成模型",
    "18.1.3 共现模型",
    "18.1.4 模型性质",
    "18.2 概率潜在语义分析的算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "PLSA话题责任度台",
    "axisA": {
      "label": "话题数",
      "levels": [
        "少",
        "候选",
        "多"
      ]
    },
    "axisB": {
      "label": "EM状态",
      "levels": [
        "责任度",
        "词分布",
        "文档分布"
      ]
    },
    "fault": "概率表未归一或零概率锁死，使EM似然和话题解释失真",
    "practiceMode": "calculation",
    "metric": "PLSA话题责任度台命中率",
    "risk": "EM状态偏差风险",
    "invariant": "条件概率、共现计数和责任度必须归一；E步用旧参数、M步用期望计数，文档参数随训练文档增长的边界需明确。",
    "task": "手算18.1 概率潜在语义分析模型的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm18PlsaMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm18PlsaExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm18PlsaEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
