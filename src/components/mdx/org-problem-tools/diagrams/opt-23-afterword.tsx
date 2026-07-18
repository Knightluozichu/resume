import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-afterword",
  title: "后记",
  nodes: [
    "选择真实问题",
    "挑选少数工具",
    "在不同场景实践",
    "记录反馈改进",
    "形成个人工具组",
  ],
  focuses: ["五个擅长工具", "跨场景实践", "引导复盘", "方法改造", "持续成长"],
} as const;

export function Opt23AfterwordMapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23AfterwordExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23AfterwordEvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
