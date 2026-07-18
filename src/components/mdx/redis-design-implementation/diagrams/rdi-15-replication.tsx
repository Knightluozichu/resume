import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第15章 复制",
  focus:
    "比较SYNC全量同步与PSYNC部分重同步，连接运行ID、复制偏移量、积压缓冲区和心跳",
  invariant:
    "主从偏移与数据一致，断线重连正确选择全量或部分同步，命令传播顺序不分叉",
  artifact: "复制状态机、偏移与backlog实验、断线重连轨迹和主从对账",
  nodes: [
    "旧版复制功能的实现",
    "旧版复制功能的缺陷",
    "新版复制功能的实现",
    "部分重同步的实现",
    "PSYNC命令的实现",
    "复制的实现",
    "心跳检测",
    "重点回顾",
  ],
};

export function Rdi15ReplicationStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi15ReplicationTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi15ReplicationEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
