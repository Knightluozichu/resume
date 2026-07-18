import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第6章 类文件结构",
  "6.1 概述",
  "6.2 无关性的基石",
  "6.3 Class类文件的结构",
  "6.3.1 魔数与Class文件的版本",
  "6.3.2 常量池",
  "6.3.3 访问标志",
  "6.3.4 类索引、父类索引与接口索引集合",
  "6.3.5 字段表集合",
  "6.3.6 方法表集合",
  "6.3.7 属性表集合",
  "6.4 字节码指令简介",
  "6.4.1 字节码与数据类型",
  "6.4.2 加载和存储指令",
  "6.4.3 运算指令",
  "6.4.4 类型转换指令",
  "6.4.5 对象创建与访问指令",
  "6.4.6 操作数栈管理指令",
  "6.4.7 控制转移指令",
  "6.4.8 方法调用和返回指令",
  "6.4.9 异常处理指令",
  "6.4.10 同步指令",
  "6.5 公有设计，私有实现",
  "6.6 Class文件结构的发展",
  "6.7 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第6章 类文件结构" focus="逐字节解析Class文件表结构与指令族，区分规范公开格式和虚拟机私有执行实现" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第6章 类文件结构" focus="从最小类手工定位魔数、版本、常量池和Code属性，再改变一个索引观察验证器拒绝位置" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第6章 类文件结构" focus="十六进制偏移表、常量池索引图、方法Code属性、操作数栈轨迹、验证失败样本" nodes={nodes} />;
}
