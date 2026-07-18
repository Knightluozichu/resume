import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第7章 压缩列表",
  focus:
    "按zlbytes、zltail、zllen和变长节点解析连续内存，并推演previous_entry_length导致的连锁更新",
  invariant:
    "总字节、尾偏移、节点数和每个前驱长度一致，插删后能双向遍历到终止字节",
  artifact: "字节布局图、节点解析器、连锁更新最坏轨迹与边界测试",
  nodes: [
    "压缩列表的构成",
    "压缩列表节点的构成",
    "连锁更新",
    "压缩列表API",
    "重点回顾",
  ],
};

export function Rdi07ZiplistStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi07ZiplistTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi07ZiplistEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
