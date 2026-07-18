import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "划分game与space",
  "连接Redis并设预算",
  "写入短期登录状态",
  "分析共享瓶颈",
  "重放多进程协议",
  "Redis失效后签发",
] as const;

export function Mga10DistributedLoginRedisMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第10章 分布式登录与Redis内存数据库"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga10DistributedLoginRedisExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第10章 分布式登录与Redis内存数据库"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga10DistributedLoginRedisEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第10章 分布式登录与Redis内存数据库"
      nodes={nodes}
      mode="evidence"
    />
  );
}
