import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-translator-postscript",
  title: "译后记：“失控”的协作与进化",
  concepts: ["译后记：“失控”的协作与进化"],
  nodes: [
    "识别翻译节点",
    "记录术语分歧",
    "并行校对版本",
    "合并反馈修正",
    "保留来源责任",
  ],
  focuses: ["协作翻译", "术语边界", "版本演化", "分布校对", "责任链"],
  model: {
    studio: "协作翻译版本网",
    axisA: {
      label: "术语分歧可见度",
      levels: ["覆盖分歧", "保留批注", "分歧与决策并存"],
    },
    axisB: {
      label: "版本责任链",
      levels: ["匿名合并", "记录贡献", "修改可回溯到来源"],
    },
    outcomes: {
      success: "协作校对质量",
      risk: "语义漂移",
      evidence: "证据可追溯度",
    },
    fault: "多数意见抹去关键少数译法",
    task: "对一个核心术语保留候选译法、选择理由和回退版本",
    practiceMode: "design",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16TranslatorPostscriptMapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16TranslatorPostscriptExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16TranslatorPostscriptEvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
