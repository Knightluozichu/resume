import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第11章 AOF持久化",
  focus: "沿命令追加、缓冲区写入、fsync、载入重放和后台重写理解AOF",
  invariant:
    "确认策略对应明确丢失窗口，AOF语法完整可重放，重写期间增量不丢且结果等价",
  artifact: "appendfsync对照、AOF解析、崩溃截断实验、重写双缓冲轨迹",
  nodes: ["AOF持久化的实现", "AOF文件的载入与数据还原", "AOF重写", "重点回顾"],
};

export function Rdi11AofPersistenceStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi11AofPersistenceTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi11AofPersistenceEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
