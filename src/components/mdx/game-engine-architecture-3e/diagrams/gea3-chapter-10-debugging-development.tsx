import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-10-debugging-development",
  title: "第10章 Tools for Debugging and Development",
  nodes: [
    "声明观测问题",
    "插入低扰动探针",
    "采集目标机轨迹",
    "关联版本与状态",
    "复现并回归",
  ],
  focuses: ["观测扰动", "因果时间线", "运行时权限", "目标机画像", "内存归因"],
};

export function Gea3Chapter10DebuggingDevelopmentMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter10DebuggingDevelopmentExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter10DebuggingDevelopmentEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
