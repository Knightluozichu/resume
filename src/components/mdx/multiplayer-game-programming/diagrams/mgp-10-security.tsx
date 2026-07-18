import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "枚举可见资产",
  "最小化封包信息",
  "验证每个输入",
  "权威计算结果",
  "关联作弊证据",
  "加固监控与响应",
] as const;

export function Mgp10SecurityMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第10章 安全（Security）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp10SecurityExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="网络游戏安全" nodes={nodes} mode="experiment" />;
}

export function Mgp10SecurityEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="网络游戏安全" nodes={nodes} mode="evidence" />;
}
