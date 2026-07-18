import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "初始化平台API",
  "创建套接字",
  "绑定或连接地址",
  "循环处理部分I/O",
  "解释错误与就绪",
  "关闭并回收资源",
] as const;

export function Mgp03BerkeleySocketsMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第3章 Berkeley套接字（Berkeley Sockets）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp03BerkeleySocketsExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="Berkeley套接字" nodes={nodes} mode="experiment" />;
}

export function Mgp03BerkeleySocketsEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="Berkeley套接字" nodes={nodes} mode="evidence" />;
}
