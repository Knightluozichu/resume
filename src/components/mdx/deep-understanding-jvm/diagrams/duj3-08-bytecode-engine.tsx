import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第8章 虚拟机字节码执行引擎",
  "8.1 概述",
  "8.2 运行时栈帧结构",
  "8.2.1 局部变量表",
  "8.2.2 操作数栈",
  "8.2.3 动态连接",
  "8.2.4 方法返回地址",
  "8.2.5 附加信息",
  "8.3 方法调用",
  "8.3.1 解析",
  "8.3.2 分派",
  "8.4 动态类型语言支持",
  "8.4.1 动态类型语言",
  "8.4.2 Java与动态类型",
  "8.4.3 java.lang.invoke包",
  "8.4.4 invokedynamic指令",
  "8.4.5 实战：掌控方法分派规则",
  "8.5 基于栈的字节码解释执行引擎",
  "8.5.1 解释执行",
  "8.5.2 基于栈的指令集与基于寄存器的指令集",
  "8.5.3 基于栈的解释器执行过程",
  "8.6 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第8章 虚拟机字节码执行引擎" focus="从栈帧和方法调用解释字节码执行，区分解析与分派，并通过MethodHandle与invokedynamic理解动态链接" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第8章 虚拟机字节码执行引擎" focus="为重载、覆盖、接口调用和invokedynamic各编译一个样本，预测并核对调用点与目标方法" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第8章 虚拟机字节码执行引擎" focus="栈帧剖面、invoke指令对照、分派矩阵、MethodHandle实验、逐指令栈变化" nodes={nodes} />;
}
