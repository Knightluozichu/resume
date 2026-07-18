import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "分类断线来源",
  "保留或回收玩家会话",
  "摘除失联进程路由",
  "校验新系统依赖",
  "排空旧版本并切换",
  "重连回滚后签发",
] as const;

export function Mga12DisconnectDynamicSystemMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第12章 断线与动态加载系统"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga12DisconnectDynamicSystemExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第12章 断线与动态加载系统"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga12DisconnectDynamicSystemEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第12章 断线与动态加载系统"
      nodes={nodes}
      mode="evidence"
    />
  );
}
