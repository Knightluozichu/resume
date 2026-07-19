import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-15-svd",
  "title": "第15章 奇异值分解",
  "concepts": [
    "第15章 奇异值分解",
    "15.1 奇异值分解的定义与性质",
    "15.1.1 定义与定理",
    "15.1.2 紧奇异值分解与截断奇异值分解",
    "15.1.3 几何解释",
    "15.1.4 主要性质",
    "15.2 奇异值分解的计算",
    "15.3 奇异值分解与矩阵近似",
    "15.3.1 弗罗贝尼乌斯范数",
    "15.3.2 矩阵的最优近似",
    "15.3.3 矩阵的外积展开式"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "SVD谱与低秩近似台",
    "axisA": {
      "label": "截断秩k",
      "levels": [
        "1",
        "拐点",
        "满秩"
      ]
    },
    "axisB": {
      "label": "矩阵条件",
      "levels": [
        "良好",
        "近重复奇异值",
        "秩亏"
      ]
    },
    "fault": "把奇异向量符号翻转当错误，或用截断结果声称恢复全部信息",
    "practiceMode": "calculation",
    "metric": "SVD谱与低秩近似台命中率",
    "risk": "矩阵条件偏差风险",
    "invariant": "矩阵形状、奇异值排序、正交性和重构残差必须核对；重复奇异值下奇异向量不唯一，符号翻转不构成错误。",
    "task": "手算15.1 奇异值分解的定义与性质的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm15SvdMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm15SvdExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm15SvdEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
