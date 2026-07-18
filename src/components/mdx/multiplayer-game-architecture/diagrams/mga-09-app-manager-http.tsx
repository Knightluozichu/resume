import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "启动多login实例",
  "向appmgr注册",
  "增量解析HTTP",
  "补充Packet路由标识",
  "处理分块正文",
  "机器人批量压测签发",
] as const;

export function Mga09AppManagerHttpMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第9章 服务器管理进程与HTTP"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga09AppManagerHttpExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第9章 服务器管理进程与HTTP"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga09AppManagerHttpEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第9章 服务器管理进程与HTTP"
      nodes={nodes}
      mode="evidence"
    />
  );
}
