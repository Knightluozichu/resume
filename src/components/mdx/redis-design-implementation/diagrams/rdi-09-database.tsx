import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第9章 数据库",
  focus:
    "追踪redisServer.db、redisDb.dict与expires完成键空间、TTL、惰性和定期删除以及通知",
  invariant:
    "键空间和过期字典引用同一键，过期语义在命令、RDB、AOF和复制路径中一致",
  artifact: "键空间图、TTL时间线、过期采样实验、持久化与复制对照",
  nodes: [
    "服务器中的数据库",
    "切换数据库",
    "数据库键空间",
    "设置键的生存时间或过期时间",
    "过期键删除策略",
    "Redis的过期键删除策略",
    "AOF、RDB和复制功能对过期键的处理",
    "数据库通知",
    "重点回顾",
  ],
};

export function Rdi09DatabaseStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi09DatabaseTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi09DatabaseEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
