import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "分配网络ID",
  "发送创建描述",
  "建立远端代理",
  "传播脏字段",
  "排序RPC",
  "确认销毁与回收",
] as const;

export function Mgp05ObjectReplicationMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第5章 对象复制（Object Replication）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp05ObjectReplicationExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="对象复制" nodes={nodes} mode="experiment" />;
}

export function Mgp05ObjectReplicationEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="对象复制" nodes={nodes} mode="evidence" />;
}
