import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-23",
  title: "第23章 整体，空洞，以及空间",
  nodes: [
    "绘制知识节点",
    "标出断裂接口",
    "建立可追踪链接",
    "允许多路径阅读",
    "保留来源责任",
  ],
  focuses: ["控制论遗产", "知识缺口", "日常反馈", "超文本", "网络认识论"],
} as const;

export function Ooc16Chapter23MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter23ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter23EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
