import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第10章 RDB持久化",
  focus: "比较SAVE与BGSAVE，追踪自动保存条件、RDB文件结构、载入顺序与校验",
  invariant:
    "快照表示一致时点，文件头尾与对象编码可校验，恢复结果与快照时刻对账",
  artifact: "快照时间线、RDB字节解析、自动保存实验与恢复对账",
  nodes: [
    "RDB文件的创建与载入",
    "自动间隔性保存",
    "RDB文件结构",
    "分析RDB文件",
    "重点回顾",
  ],
};

export function Rdi10RdbPersistenceStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi10RdbPersistenceTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi10RdbPersistenceEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
