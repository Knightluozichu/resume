import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-07-svm",
  "title": "第7章 支持向量机",
  "concepts": [
    "第7章 支持向量机",
    "7.1 线性可分支持向量机与硬间隔最大化",
    "7.1.1 线性可分支持向量机",
    "7.1.2 函数间隔和几何间隔",
    "7.1.3 间隔最大化",
    "7.1.4 学习的对偶算法",
    "7.2 线性支持向量机与软间隔最大化",
    "7.2.1 线性支持向量机",
    "7.2.2 学习的对偶算法",
    "7.2.3 支持向量",
    "7.2.4 合页损失函数",
    "7.3 非线性支持向量机与核函数",
    "7.3.1 核技巧",
    "7.3.2 正定核",
    "7.3.3 常用核函数",
    "7.3.4 非线性支持向量分类机",
    "7.4 序列最小最优化算法",
    "7.4.1 两个变量二次规划的求解方法",
    "7.4.2 变量的选择方法",
    "7.4.3 SMO算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "间隔、核与KKT台",
    "axisA": {
      "label": "惩罚C",
      "levels": [
        "小",
        "适中",
        "大"
      ]
    },
    "axisB": {
      "label": "核尺度",
      "levels": [
        "宽",
        "适中",
        "窄"
      ]
    },
    "fault": "Gram矩阵非半正定，或SMO停止时仍违反KKT与等式约束",
    "practiceMode": "calculation",
    "metric": "间隔、核与KKT台命中率",
    "risk": "核尺度偏差风险",
    "invariant": "缩放、核、C和容差必须在训练与验证内确定；解同时满足原始可行、对偶可行、等式约束和互补松弛残差。",
    "task": "手算7.1 线性可分支持向量机与硬间隔最大化的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm07SvmMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm07SvmExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm07SvmEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
