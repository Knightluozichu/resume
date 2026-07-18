import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "记录单向时序",
  "计算延迟分布",
  "测量到达抖动",
  "跟踪序号缺口",
  "选择消息可靠性",
  "仿真并重放签发",
] as const;

export function Mgp07LatencyJitterReliabilityMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp07LatencyJitterReliabilityExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="延迟、抖动与可靠性" nodes={nodes} mode="experiment" />;
}

export function Mgp07LatencyJitterReliabilityEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="延迟、抖动与可靠性" nodes={nodes} mode="evidence" />;
}
