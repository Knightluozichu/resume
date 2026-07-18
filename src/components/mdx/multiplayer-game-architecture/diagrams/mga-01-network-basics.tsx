import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "划分单机与网络职责",
  "解析IP和端点",
  "建立TCP连接",
  "循环处理部分收发",
  "切换非阻塞模式",
  "断线重连后签发",
] as const;

export function Mga01NetworkBasicsMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第1章 网络编程基础"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga01NetworkBasicsExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第1章 网络编程基础"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga01NetworkBasicsEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第1章 网络编程基础"
      nodes={nodes}
      mode="evidence"
    />
  );
}
