import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "建立连接注册表",
  "驱动Select基线",
  "切换Epoll关注集合",
  "读到EAGAIN",
  "解帧并反序列化",
  "慢连接压力后签发",
] as const;

export function Mga02IoMultiplexingMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第2章 网络IO多路复用"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga02IoMultiplexingExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第2章 网络IO多路复用"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga02IoMultiplexingEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第2章 网络IO多路复用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
