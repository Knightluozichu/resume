import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第8章 对象",
  focus:
    "从redisObject的type、encoding、ptr、refcount和lru连接五类对象与多种底层编码",
  invariant:
    "对象类型决定命令集合，编码与ptr结构匹配，转换不改变用户值，引用计数和空转时间正确",
  artifact: "类型编码矩阵、转换阈值实验、命令多态轨迹与内存回收记录",
  nodes: [
    "对象的类型与编码",
    "字符串对象",
    "列表对象",
    "哈希对象",
    "集合对象",
    "有序集合对象",
    "类型检查与命令多态",
    "内存回收",
    "对象共享",
    "对象的空转时长",
    "重点回顾",
  ],
};

export function Rdi08ObjectStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi08ObjectTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi08ObjectEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
