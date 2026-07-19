import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-official-final-review",
  "title": "《统计学习方法（第2版）》全书总复习",
  "concepts": [
    "监督学习三要素",
    "概率与隐变量",
    "几何间隔与核",
    "矩阵分解与表示",
    "采样与话题模型",
    "图随机游走与独立评价"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "全书模型答辩台",
    "axisA": {
      "label": "故障来源",
      "levels": [
        "概率",
        "几何/矩阵",
        "优化/采样"
      ]
    },
    "axisB": {
      "label": "验证层级",
      "levels": [
        "定义",
        "极小手算",
        "独立风险与反例"
      ]
    },
    "fault": "只展示最终分数，无法回退到第一条错误中间量",
    "practiceMode": "diagnosis",
    "metric": "全书模型答辩台命中率",
    "risk": "验证层级偏差风险",
    "invariant": "最终答案必须区分模型、策略和算法，区分训练目标与应用质量，并能从任何异常结果回退到第一条概率、几何、矩阵、优化或采样证据。",
    "task": "手算概率与隐变量的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function SlmOfficialFinalReviewMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function SlmOfficialFinalReviewExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function SlmOfficialFinalReviewEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
