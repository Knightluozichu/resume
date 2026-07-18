import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-14-audio",
  title: "第14章 Audio",
  nodes: [
    "接收音频事件",
    "解析资源与声部",
    "计算空间参数",
    "混音与DSP",
    "缓冲并输出",
  ],
  focuses: ["采样边界", "声部预算", "空间遮挡", "线程隔离", "输出延迟"],
};

export function Gea3Chapter14AudioMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter14AudioExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter14AudioEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
