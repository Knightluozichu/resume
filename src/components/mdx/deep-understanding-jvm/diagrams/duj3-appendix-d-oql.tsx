import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "附录D 对象查询语言（OQL）简介"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="附录D 对象查询语言（OQL）简介" focus="用OQL从堆转储筛选对象、字段与引用关系，同时控制查询成本和敏感数据暴露" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="附录D 对象查询语言（OQL）简介" focus="构造已关闭但仍被监听器保留的对象，用OQL筛选并沿GC根找到所有者，修复后重采集" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="附录D 对象查询语言（OQL）简介" focus="转储校验和、OQL查询、结果采样、GC根路径、访问与销毁审计" nodes={nodes} />;
}
