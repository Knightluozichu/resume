import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "确定共享体验",
  "识别状态权威",
  "比较Tribes模块",
  "分析帝国时代锁步",
  "选定网络模型",
  "用样本签发",
] as const;

export function Mgp01OverviewNetworkedGamesMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第1章 网络游戏概览（Overview of Networked Games）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp01OverviewNetworkedGamesExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="网络游戏概览" nodes={nodes} mode="experiment" />;
}

export function Mgp01OverviewNetworkedGamesEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="网络游戏概览" nodes={nodes} mode="evidence" />;
}
