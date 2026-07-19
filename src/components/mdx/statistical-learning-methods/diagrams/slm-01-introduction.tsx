import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-01-introduction",
  "title": "第1章 统计学习及监督学习概论",
  "concepts": [
    "第1篇 监督学习",
    "第1章 统计学习及监督学习概论",
    "1.1 统计学习",
    "1.2 统计学习的分类",
    "1.2.1 基本分类",
    "1.2.2 按模型分类",
    "1.2.3 按算法分类",
    "1.2.4 按技巧分类",
    "1.3 统计学习方法三要素",
    "1.3.1 模型",
    "1.3.2 策略",
    "1.3.3 算法",
    "1.4 模型评估与模型选择",
    "1.4.1 训练误差与测试误差",
    "1.4.2 过拟合与模型选择",
    "1.5 正则化与交叉验证",
    "1.5.1 正则化",
    "1.5.2 交叉验证",
    "1.6 泛化能力",
    "1.6.1 泛化误差",
    "1.6.2 泛化误差上界",
    "1.7 生成模型与判别模型",
    "1.8 监督学习应用",
    "1.8.1 分类问题",
    "1.8.2 标注问题",
    "1.8.3 回归问题"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "风险与数据折分台",
    "axisA": {
      "label": "模型容量",
      "levels": [
        "受限",
        "适中",
        "过大"
      ]
    },
    "axisB": {
      "label": "评价数据",
      "levels": [
        "训练集",
        "验证集",
        "冻结测试集"
      ]
    },
    "fault": "用测试集反复选择模型，得到乐观而不可复现的泛化估计",
    "practiceMode": "calculation",
    "metric": "风险与数据折分台命中率",
    "risk": "评价数据偏差风险",
    "invariant": "输入输出空间、联合分布假设、假设空间、损失函数和数据折分必须先固定；训练误差不能代替测试误差。",
    "task": "手算第1章 统计学习及监督学习概论的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm01IntroductionMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm01IntroductionExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm01IntroductionEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
