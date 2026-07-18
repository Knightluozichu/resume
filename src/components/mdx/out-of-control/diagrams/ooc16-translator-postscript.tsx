import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-translator-postscript",
  title: "译后记：“失控”的协作与进化",
  nodes: [
    "识别翻译节点",
    "记录术语分歧",
    "并行校对版本",
    "合并反馈修正",
    "保留来源责任",
  ],
  focuses: ["协作翻译", "术语边界", "版本演化", "分布校对", "责任链"],
} as const;

export function Ooc16TranslatorPostscriptMapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16TranslatorPostscriptExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16TranslatorPostscriptEvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
