import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "列出威胁",
  "验证证书",
  "协商密钥",
  "认证加密",
  "拒绝重放",
  "轮换恢复",
] as const;

export function Gsa02CommunicationEncryptionMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第2章 通信加密"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa02CommunicationEncryptionExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第2章 通信加密"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa02CommunicationEncryptionEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第2章 通信加密"
      nodes={nodes}
      mode="evidence"
    />
  );
}
