import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "连接并设置超时",
  "封装连接组件",
  "参数化写入查询",
  "迁移表结构",
  "映射Protobuf数据",
  "角色创建事务签发",
] as const;

export function Mga07MysqlMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第7章 MySQL数据库"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga07MysqlExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第7章 MySQL数据库"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga07MysqlEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第7章 MySQL数据库"
      nodes={nodes}
      mode="evidence"
    />
  );
}
