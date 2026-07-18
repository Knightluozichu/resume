import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-15",
  title: "第15章 人工进化",
  nodes: [
    "建立可复制表示",
    "并行产生变异",
    "执行环境评价",
    "选择并释放资源",
    "审计开放演化",
  ],
  focuses: ["数字生态", "进化搜索", "军备竞赛", "选择压力", "元设计"],
} as const;

export function Ooc16Chapter15MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter15ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter15EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
