import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第一部分 走近Java"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第一部分 走近Java" focus="建立Java技术体系、虚拟机家族与OpenJDK构建的历史坐标，理解规范、实现和发行版不是同一层次" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第一部分 走近Java" focus="选择一项JVM行为，分别定位规范约束、HotSpot实现与发行版配置，说明三者何处可能不同" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第一部分 走近Java" focus="技术体系分层图、虚拟机谱系、JDK构建环境指纹与源码调试入口" nodes={nodes} />;
}
