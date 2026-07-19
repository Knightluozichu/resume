import { OfficialStatisticalLearningLab } from "./official-statistical-learning-lab";

const props = {
  "unitId": "slm-21-pagerank",
  "title": "第21章 PageRank算法",
  "concepts": [
    "第21章 PageRank算法",
    "21.1 PageRank的定义",
    "21.1.1 基本想法",
    "21.1.2 有向图和随机游走模型",
    "21.1.3 PageRank的基本定义",
    "21.1.4 PageRank的一般定义",
    "21.2 PageRank的计算",
    "21.2.1 迭代算法",
    "21.2.2 幂法",
    "21.2.3 代数算法"
  ],
  "chain": [
    "冻结数据与符号",
    "写出模型",
    "核对目标",
    "执行一步算法",
    "独立评价与反例"
  ],
  "model": {
    "studio": "PageRank随机游走台",
    "axisA": {
      "label": "阻尼系数",
      "levels": [
        "低",
        "0.85",
        "接近1"
      ]
    },
    "axisB": {
      "label": "图缺陷",
      "levels": [
        "完整",
        "悬挂节点",
        "不连通"
      ]
    },
    "fault": "行列归一约定混用，使迭代向量不归一或固定点残差不收敛",
    "practiceMode": "calculation",
    "metric": "PageRank随机游走台命中率",
    "risk": "图缺陷偏差风险",
    "invariant": "转移矩阵方向、列或行归一约定、悬挂节点修复和阻尼系数必须一致；最终向量非负、归一且满足固定点残差。",
    "task": "手算21.1 PageRank的定义的关键量，并保存基线、边界、修复与复位证据。"
  }
} as const;

export function Slm21PageRankMapLab() { return <OfficialStatisticalLearningLab {...props} view="map" />; }
export function Slm21PageRankExperimentLab() { return <OfficialStatisticalLearningLab {...props} view="experiment" />; }
export function Slm21PageRankEvidenceLab() { return <OfficialStatisticalLearningLab {...props} view="evidence" />; }
