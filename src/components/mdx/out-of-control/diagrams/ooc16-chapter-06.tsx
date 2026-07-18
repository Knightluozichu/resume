import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-06",
  title: "第6章 自然之流变",
  nodes: [
    "输入自由能",
    "生成局部差异",
    "多样路径竞争",
    "输出熵与废物",
    "反馈重写身份",
  ],
  focuses: ["非均衡", "稳定多样性", "生态身份", "变异来源", "生成循环"],
} as const;

export function Ooc16Chapter06MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter06ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter06EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
