import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "量化玩法约束",
  "选择权威位置",
  "实现客户端—服务器",
  "实现点对点",
  "注入主机离开",
  "比较证据签发",
] as const;

export function Mgp06NetworkTopologiesMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp06NetworkTopologiesExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="网络拓扑与样例" nodes={nodes} mode="experiment" />;
}

export function Mgp06NetworkTopologiesEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="网络拓扑与样例" nodes={nodes} mode="evidence" />;
}
