import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "预测地区需求",
  "准备版本镜像",
  "扩展虚拟机池",
  "启动健康进程",
  "放置比赛会话",
  "排空回收并核账",
] as const;

export function Mgp13CloudDedicatedServersMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp13CloudDedicatedServersExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="云端专用服务器" nodes={nodes} mode="experiment" />;
}

export function Mgp13CloudDedicatedServersEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="云端专用服务器" nodes={nodes} mode="evidence" />;
}
