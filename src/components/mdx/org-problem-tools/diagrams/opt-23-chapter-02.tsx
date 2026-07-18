import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-chapter-02",
  title: "第2章 初级套装：让思考更简单的13个工具",
  nodes: [
    "外化当前状态",
    "区分边界差距",
    "展开多角度信息",
    "按证据筛选重点",
    "回顾并更新行动",
  ],
  focuses: ["状态可视", "控制边界", "流程瓶颈", "优先筛选", "团队回顾"],
} as const;

export function Opt23Chapter02MapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23Chapter02ExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23Chapter02EvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
