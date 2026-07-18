import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第7章 虚拟机类加载机制",
  "7.1 概述",
  "7.2 类加载的时机",
  "7.3 类加载的过程",
  "7.3.1 加载",
  "7.3.2 验证",
  "7.3.3 准备",
  "7.3.4 解析",
  "7.3.5 初始化",
  "7.4 类加载器",
  "7.4.1 类与类加载器",
  "7.4.2 双亲委派模型",
  "7.4.3 破坏双亲委派模型",
  "7.5 Java模块化系统",
  "7.5.1 模块的兼容性",
  "7.5.2 模块化下的类加载器",
  "7.6 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第7章 虚拟机类加载机制" focus="掌握加载、验证、准备、解析、初始化五阶段，理解类身份由名称与加载器共同决定，并纳入JPMS模块边界" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第7章 虚拟机类加载机制" focus="由两个独立加载器加载同名Class，验证类型不兼容，再改变模块可读性观察解析和访问失败" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第7章 虚拟机类加载机制" focus="加载状态机、初始化触发矩阵、加载器委派图、类身份实验、模块可读性与导出表" nodes={nodes} />;
}
