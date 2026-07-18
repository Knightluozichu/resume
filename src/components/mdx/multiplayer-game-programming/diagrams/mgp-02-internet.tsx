import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "应用形成消息",
  "传输层分段",
  "网络层寻址",
  "链路逐跳交付",
  "NAT改写映射",
  "端点解封装验证",
] as const;

export function Mgp02InternetMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第2章 互联网（The Internet）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp02InternetExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="互联网分层与NAT" nodes={nodes} mode="experiment" />;
}

export function Mgp02InternetEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="互联网分层与NAT" nodes={nodes} mode="evidence" />;
}
