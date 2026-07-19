import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-12-supervised-summary",
  "title": "第12章 监督学习方法总结",
  "concepts": [
    "第12章 监督学习方法总结"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "监督方法选择矩阵",
    "axisA": {
      "label": "输出结构",
      "levels": [
        "标量",
        "类别",
        "序列"
      ]
    },
    "axisB": {
      "label": "模型假设",
      "levels": [
        "生成",
        "判别",
        "非参数"
      ]
    },
    "fault": "只按最高准确率选模型，忽略概率、结构输出、计算和数据规模前提",
    "practiceMode": "design",
    "metric": "监督方法选择矩阵命中率",
    "risk": "模型假设偏差风险",
    "invariant": "比较必须使用同一任务、数据折分、损失和预算，并区分生成与判别、概率与非概率、分类与标注、参数与非参数。",
    "task": "手算第12章 监督学习方法总结的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm12SupervisedSummaryMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm12SupervisedSummaryExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm12SupervisedSummaryEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
