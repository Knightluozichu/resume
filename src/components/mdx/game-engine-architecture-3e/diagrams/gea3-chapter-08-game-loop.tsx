import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-08-game-loop",
  title: "第8章 The Game Loop and Real-Time Simulation",
  nodes: [
    "采样单调时钟",
    "累积固定步",
    "并行系统更新",
    "提交渲染",
    "测量帧尾等待",
  ],
  focuses: ["帧预算", "时间域", "固定步", "CPU/GPU重叠", "输入延迟"],
};

export function Gea3Chapter08GameLoopMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter08GameLoopExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter08GameLoopEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
