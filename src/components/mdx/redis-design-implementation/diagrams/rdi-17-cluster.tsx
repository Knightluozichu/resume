import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第17章 集群",
  focus:
    "用16384槽、节点握手、MOVED与ASK、重新分片、复制和Gossip消息解释Redis Cluster",
  invariant:
    "每个槽恰有有效所有者，迁移状态可路由请求，故障转移不产生两个合法写主",
  artifact: "槽位图、MOVED/ASK轨迹、在线迁槽演练、Gossip与故障转移记录",
  nodes: [
    "节点",
    "槽指派",
    "在集群中执行命令",
    "重新分片",
    "ASK错误",
    "复制与故障转移",
    "消息",
    "重点回顾",
  ],
};

export function Rdi17ClusterStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi17ClusterTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi17ClusterEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
