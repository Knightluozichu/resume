import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "建立长连接",
  "协商协议",
  "验证包头",
  "排队处理",
  "检测断线",
  "重连追帧",
] as const;

export function Gsa09RealtimeInteractionMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第9章 实时交互服务器"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa09RealtimeInteractionExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第9章 实时交互服务器"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa09RealtimeInteractionEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第9章 实时交互服务器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
