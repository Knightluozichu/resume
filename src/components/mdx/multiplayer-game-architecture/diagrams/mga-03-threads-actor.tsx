import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "测量现有瓶颈",
  "划分进程线程职责",
  "建立固定主循环",
  "创建Actor与邮箱",
  "串行处理跨Actor消息",
  "过载迁移后签发",
] as const;

export function Mga03ThreadsActorMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第3章 线程、进程以及Actor模型"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga03ThreadsActorExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第3章 线程、进程以及Actor模型"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga03ThreadsActorEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第3章 线程、进程以及Actor模型"
      nodes={nodes}
      mode="evidence"
    />
  );
}
