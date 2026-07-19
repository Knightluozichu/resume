import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-05-decision-tree",
  "title": "第5章 决策树",
  "concepts": [
    "第5章 决策树",
    "5.1 决策树模型与学习",
    "5.1.1 决策树模型",
    "5.1.2 决策树与 if-then规则",
    "5.1.3 决策树与条件概率分布",
    "5.1.4 决策树学习",
    "5.2 特征选择",
    "5.2.1 特征选择问题",
    "5.2.2 信息增益",
    "5.2.3 信息增益比",
    "5.3 决策树的生成",
    "5.3.1 ID3算法",
    "5.3.2 C4.5的生成算法",
    "5.4 决策树的剪枝",
    "5.5 CART算法",
    "5.5.1 CART生成",
    "5.5.2 CART剪枝"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "划分与剪枝台",
    "axisA": {
      "label": "树深",
      "levels": [
        "浅",
        "验证最优",
        "完全生长"
      ]
    },
    "axisB": {
      "label": "选择准则",
      "levels": [
        "信息增益",
        "增益比",
        "基尼指数"
      ]
    },
    "fault": "连续阈值或剪枝参数窥见测试集，或默认叶在并列时不稳定",
    "practiceMode": "calculation",
    "metric": "划分与剪枝台命中率",
    "risk": "选择准则偏差风险",
    "invariant": "候选划分使用同一节点样本与权重，连续阈值和剪枝参数只能从训练与验证产生；并列规则与默认叶必须固定。",
    "task": "手算5.1 决策树模型与学习的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm05DecisionTreeMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm05DecisionTreeExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm05DecisionTreeEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
