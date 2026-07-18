import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "分层定位",
  "建立套接字",
  "处理部分收发",
  "接入事件循环",
  "封装RPC",
  "任务循环签发",
] as const;

export function Gnc00QuickstartNetworkGameProgrammingMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第0章 [快速入门]网络游戏编程：网络和游戏编程的技术基础"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc00QuickstartNetworkGameProgrammingExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第0章 [快速入门]网络游戏编程：网络和游戏编程的技术基础"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc00QuickstartNetworkGameProgrammingEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第0章 [快速入门]网络游戏编程：网络和游戏编程的技术基础"
      nodes={nodes}
      mode="evidence"
    />
  );
}
