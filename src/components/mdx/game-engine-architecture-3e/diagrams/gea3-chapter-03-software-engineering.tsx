import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-03-software-engineering",
  title: "第3章 Fundamentals of Software Engineering for Games",
  nodes: [
    "声明所有权",
    "固定错误语义",
    "测量数据访问",
    "映射硬件层级",
    "验证布局收益",
  ],
  focuses: ["生命周期", "错误隔离", "缓存局部性", "硬件并行", "内存带宽"],
};

export function Gea3Chapter03SoftwareEngineeringMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter03SoftwareEngineeringExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter03SoftwareEngineeringEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
