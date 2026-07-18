import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第3章 数据存储与检索",
  focus:
    "沿写路径、读路径和后台维护理解日志结构、B树、列存与物化聚合的成本模型",
  invariant:
    "存储布局在崩溃恢复、并发写和真实分布下返回正确结果，读写空间放大与尾延迟可度量",
  artifact: "写读路径图、索引基准、放大系数、压缩对照与恢复验证",
  nodes: [
    "驱动数据库的数据结构",
    "哈希索引",
    "SSTable与LSM树",
    "B树",
    "比较B树和LSM树",
    "其他索引结构",
    "事务处理还是分析处理",
    "数据仓库",
    "星型与雪花型Schema",
    "列式存储",
    "列压缩",
    "列存中的排序顺序",
    "写入列式存储",
    "聚合：数据立方体与物化视图",
    "小结",
  ],
};

export function Ddi03StorageRetrievalArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi03StorageRetrievalFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi03StorageRetrievalEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
