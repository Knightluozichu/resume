import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "锁定书名作者ISBN",
  "映射12章82节",
  "完成网络与Actor基础",
  "搭建ECS和数据层",
  "贯通多进程分布式流程",
  "断线动态加载后签发",
] as const;

export function MgaOfficialLearningMapMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function MgaOfficialLearningMapExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function MgaOfficialLearningMapEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
