import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "认证并创建会话代际",
  "加载版本化大厅快照",
  "创建或匹配席位",
  "签发一次性入房令牌",
  "确认游戏服接管",
  "超时重连与崩溃复验",
] as const;

export function Gsp06GameLobbyDesignMapLab() {
  return <ServerBookEvidenceLab title="第6章 游戏大厅的设计与实现" label="第6章" nodes={nodes} mode="map" />;
}

export function Gsp06GameLobbyDesignExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第6章" nodes={nodes} mode="experiment" />;
}

export function Gsp06GameLobbyDesignEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第6章" nodes={nodes} mode="evidence" />;
}
