import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第9章 G1的新特性：字符串去重",
  "9.1 字符串去重概述",
  "9.2 日志解读",
  "9.3 参数介绍和调优",
  "9.4 字符串去重和String.intern的区别",
  "9.5 String.intern中的实现"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第9章 G1的新特性：字符串去重" focus="理解G1字符串去重的候选、哈希表和后台处理，并与String.intern的语义、生命周期和成本区分" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第9章 G1的新特性：字符串去重" focus="分别使用高重复和低重复字符串负载，比较去重率、堆节省、CPU成本与intern行为" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第9章 G1的新特性：字符串去重" focus="字符串分布基线、候选年龄、去重日志、CPU与内存收益、intern语义对照" nodes={nodes} />; }
