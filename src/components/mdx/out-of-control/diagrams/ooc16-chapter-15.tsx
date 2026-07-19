import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-15",
  title: "第15章 人工进化",
  concepts: [
    "第15章 人工进化",
    "15.1 汤姆·雷的电进化机",
    "15.2 你力所不逮的，进化能行",
    "15.3 并行实施的盲目行为",
    "15.4 计算中的军备竞赛",
    "15.5 驾驭野性的进化",
    "15.6 进化聪明分子的愚钝科学家",
    "15.7 死亡是最好的老师",
    "15.8 蚂蚁的算法天赋",
    "15.9 工程霸权的终结",
  ],
  nodes: [
    "建立可复制表示",
    "并行产生变异",
    "执行环境评价",
    "选择并释放资源",
    "审计开放演化",
  ],
  focuses: ["数字生态", "进化搜索", "军备竞赛", "选择压力", "元设计"],
  model: {
    studio: "数字进化种群",
    axisA: {
      label: "变异供给",
      levels: ["几乎不变", "局部变异", "高变异"],
    },
    axisB: {
      label: "死亡选择压力",
      levels: ["不淘汰", "资源竞争", "强淘汰"],
    },
    outcomes: {
      success: "搜索改进幅度",
      risk: "目标投机率",
      evidence: "证据可追溯度",
    },
    fault: "种群利用评分漏洞而非解决任务",
    task: "设计一个包含表示、变异、评价和释放资源的进化回合",
    practiceMode: "simulation",
    riskEffects: [1, 1],
  },
} as const;

export function Ooc16Chapter15MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter15ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter15EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
