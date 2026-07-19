import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-17",
  title: "第17章 开放的宇宙",
  concepts: [
    "第17章 开放的宇宙",
    "17.1 拓展生存的空间",
    "17.2 生成图像的基元组",
    "17.3 无心插柳柳成荫",
    "17.4 打破规则求生存",
    "17.5 掌握进化工具",
    "17.6 从滑翔意外到生命游戏",
    "17.7 生命的动词",
    "17.8 在超生命的国度中安家落户",
  ],
  nodes: [
    "提供生成基元",
    "允许组合变异",
    "保留可生存意外",
    "开放规则修改",
    "治理持续新奇",
  ],
  focuses: ["开放性", "生成基元", "偶然创新", "规则突破", "超生命治理"],
  model: {
    studio: "开放式新奇性孵化器",
    axisA: {
      label: "规则可修改度",
      levels: ["规则固定", "参数可变", "生成规则可变"],
    },
    axisB: {
      label: "生存门槛多样性",
      levels: ["单一目标", "双目标", "多生态位"],
    },
    outcomes: {
      success: "持续新奇性",
      risk: "无界失稳率",
      evidence: "证据可追溯度",
    },
    fault: "把随机噪声误判成可持续创新",
    task: "区分一次偶然新形态与能继续产生后代的新规则",
    practiceMode: "simulation",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter17MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter17ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter17EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
