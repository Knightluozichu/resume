import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-introduction",
  title: "导论 公司内的讨论流程：成为引导顾问",
  nodes: [
    "澄清讨论目的",
    "诊断群体阶段",
    "选择最小工具",
    "观察并适度介入",
    "把结论转成行动",
  ],
  focuses: ["引导意识", "角色边界", "流程设计", "介入时机", "行动转化"],
} as const;

export function Opt23IntroductionMapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23IntroductionExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23IntroductionEvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
