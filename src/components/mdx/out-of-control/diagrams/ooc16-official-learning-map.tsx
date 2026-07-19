import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-official-learning-map",
  title: "《失控》权威学习地图",
  concepts: [
    "第1章 人造与天生",
    "第2章 蜂群思维",
    "第3章 有心智的机器",
    "第4章 组装复杂性",
    "第5章 共同进化",
    "第6章 自然之流变",
    "第7章 控制的兴起",
    "第8章 封闭系统",
    "第9章 “冒出”的生态圈",
    "第10章 工业生态学",
    "第11章 网络经济学",
    "第12章 电子货币",
    "第13章 上帝的游戏",
    "第14章 在形式的图书馆中",
    "第15章 人工进化",
    "第16章 控制的未来",
    "第17章 开放的宇宙",
    "第18章 有组织的变化之架构",
    "第19章 后达尔文主义",
    "第20章 沉睡的蝴蝶",
    "第21章 水往高处流",
    "第22章 预言机",
    "第23章 整体，空洞，以及空间",
    "第24章 九律",
  ],
  nodes: [
    "核定173节点",
    "建立24章依赖",
    "运行局部实验",
    "比较跨章机制",
    "综合九律边界",
  ],
  focuses: ["完整目录", "系统反馈", "生态网络", "人工进化", "九律综合"],
  model: {
    studio: "四段路线编排台",
    axisA: {
      label: "跨章连线密度",
      levels: ["只读单章", "连接相邻章", "贯通四段"],
    },
    axisB: {
      label: "一次装载节点数",
      levels: ["5个", "12个", "24个"],
    },
    outcomes: {
      success: "路线覆盖率",
      risk: "认知过载率",
      evidence: "证据可追溯度",
    },
    fault: "只看九律结论而跳过逐章证据",
    task: "为一个陌生复杂系统选择首读章节并说明依赖",
    practiceMode: "design",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16OfficialLearningMapMapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16OfficialLearningMapExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16OfficialLearningMapEvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
