import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "附录C 虚拟机字节码指令表"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="附录C 虚拟机字节码指令表" focus="将指令表作为第6与第8章的查阅索引，按操作数、栈效果、异常和控制流解释字节码" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="附录C 虚拟机字节码指令表" focus="抽取一个含异常和同步的方法，为每条指令标注输入输出栈并与javap结果核对" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="附录C 虚拟机字节码指令表" focus="指令分类表、栈效果注释、控制流图、验证器约束" nodes={nodes} />;
}
