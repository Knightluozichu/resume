import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "附录E JDK历史版本轨迹"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="附录E JDK历史版本轨迹" focus="把JDK版本演进与本书章节中的行为变化建立索引，避免跨版本套用参数、工具和对象布局" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="附录E JDK历史版本轨迹" focus="选择一个GC参数、一个工具和一个类加载行为，在两个目标JDK上用一手文档与最小实验复核" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="附录E JDK历史版本轨迹" focus="版本轨迹、特性到章节映射、弃用与移除清单、迁移验证" nodes={nodes} />;
}
