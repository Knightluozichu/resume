import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "认证玩家身份",
  "创建大厅队伍",
  "执行约束匹配",
  "签发会话凭证",
  "提交权威结果",
  "更新统计成就排行",
] as const;

export function Mgp12GamerServicesMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第12章 玩家服务（Gamer Services）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp12GamerServicesExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="玩家服务" nodes={nodes} mode="experiment" />;
}

export function Mgp12GamerServicesEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="玩家服务" nodes={nodes} mode="evidence" />;
}
