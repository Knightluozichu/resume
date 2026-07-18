import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "建立实体代际",
  "注册组件存储",
  "按查询驱动System",
  "抽取libserver",
  "装配login与robots",
  "配置日志回归签发",
] as const;

export function Mga06EcsFrameworkMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第6章 搭建ECS框架"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga06EcsFrameworkExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第6章 搭建ECS框架"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga06EcsFrameworkEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第6章 搭建ECS框架"
      nodes={nodes}
      mode="evidence"
    />
  );
}
