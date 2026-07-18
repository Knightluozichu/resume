import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "读取并校验地图配置",
  "定位World与代理",
  "目标预留位置",
  "源World冻结快照",
  "目标接管并提交",
  "客户端重连恢复签发",
] as const;

export function Mga11DistributedWorldTransferMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第11章 分布式跳转方案"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga11DistributedWorldTransferExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第11章 分布式跳转方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga11DistributedWorldTransferEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第11章 分布式跳转方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
