import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-13",
  title: "第13章 上帝的游戏",
  concepts: [
    "第13章 上帝的游戏",
    "13.1 电子神格",
    "13.2 有交互界面的理论",
    "13.3 一位造访他用多边形创造出来的天地的神祗",
    "13.4 拟像的传送",
    "13.5 数字之战",
    "13.6 无缝分布的军队",
    "13.7 一个万千碎片的超真实",
    "13.8 两厢情愿的文字超级有机体",
    "13.9 放手则赢",
  ],
  nodes: [
    "编码世界规则",
    "让代理参与",
    "运行反事实",
    "观察涌现社会",
    "回查模型缺口",
  ],
  focuses: ["模拟权力", "交互理论", "具身参与", "分布协同", "有限放权"],
  model: {
    studio: "可运行理论世界",
    axisA: {
      label: "模型规则透明度",
      levels: ["黑箱规则", "可读参数", "可修改并留痕"],
    },
    axisB: {
      label: "参与者自治",
      levels: ["脚本角色", "局部选择", "开放策略"],
    },
    outcomes: {
      success: "反事实探索力",
      risk: "模型盲区",
      evidence: "证据可追溯度",
    },
    fault: "模拟内胜利被直接外推为现实结论",
    task: "改动一条世界规则并记录参与者策略如何重组",
    practiceMode: "simulation",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter13MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter13ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter13EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
