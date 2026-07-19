import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-21",
  title: "第21章 水往高处流",
  concepts: [
    "第21章 水往高处流",
    "21.1 40亿年的庞氏骗局",
    "21.2 进化的目的是什么",
    "21.3 超进化的7个趋势",
    "21.4 土狼般的自我进化",
  ],
  nodes: [
    "收集长时序记录",
    "区分局部与全局",
    "提出趋势指标",
    "寻找逆向反例",
    "限制目的论表述",
  ],
  focuses: ["复杂性累积", "方向性", "超进化趋势", "自我修改", "历史偏差"],
  model: {
    studio: "长时序趋势审计器",
    axisA: {
      label: "观察时间跨度",
      levels: ["短窗口", "多阶段", "跨世代"],
    },
    axisB: {
      label: "逆向反例权重",
      levels: ["忽略", "同权", "主动放大"],
    },
    outcomes: {
      success: "趋势可信度",
      risk: "目的论偏差",
      evidence: "证据可追溯度",
    },
    fault: "只保留复杂性上升的谱系",
    task: "对七个趋势各找一条逆向记录并限制结论范围",
    practiceMode: "diagnosis",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter21MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter21ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter21EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
