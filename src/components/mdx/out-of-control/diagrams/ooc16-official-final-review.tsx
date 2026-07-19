import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-official-final-review",
  title: "《失控》全书综合复核",
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
    "冻结陌生案例",
    "定位局部规则",
    "测量整体涌现",
    "注入失效条件",
    "独立复核边界",
  ],
  focuses: ["跨章迁移", "机制辨析", "反例注入", "证据复算", "责任治理"],
  model: {
    studio: "九律反证答辩台",
    axisA: {
      label: "跨章证据覆盖",
      levels: ["只报结论", "引用相邻章", "贯通24章"],
    },
    axisB: {
      label: "失效注入强度",
      levels: ["不做反例", "边界扰动", "故障与迁移双测"],
    },
    outcomes: {
      success: "机制迁移可信度",
      risk: "口号化风险",
      evidence: "证据可追溯度",
    },
    fault: "九律全部勾选但没有任何可重放轨迹",
    task: "为一个陌生系统提交局部规则、涌现、故障和责任四份证据",
    practiceMode: "diagnosis",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16OfficialFinalReviewMapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16OfficialFinalReviewExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16OfficialFinalReviewEvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
