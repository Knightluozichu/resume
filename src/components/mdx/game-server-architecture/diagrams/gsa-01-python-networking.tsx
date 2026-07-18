import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "确定端点",
  "建立连接",
  "累积部分读",
  "排队部分写",
  "接入Reactor",
  "背压签发",
] as const;

export function Gsa01PythonNetworkingMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第1章 Python网络编程模块"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa01PythonNetworkingExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第1章 Python网络编程模块"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa01PythonNetworkingEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第1章 Python网络编程模块"
      nodes={nodes}
      mode="evidence"
    />
  );
}
