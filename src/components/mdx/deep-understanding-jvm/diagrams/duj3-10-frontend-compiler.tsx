import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第10章 前端编译与优化",
  "10.1 概述",
  "10.2 Javac编译器",
  "10.2.1 Javac的源码与调试",
  "10.2.2 解析与填充符号表",
  "10.2.3 注解处理器",
  "10.2.4 语义分析与字节码生成",
  "10.3 Java语法糖的味道",
  "10.3.1 泛型",
  "10.3.2 自动装箱、拆箱与遍历循环",
  "10.3.3 条件编译",
  "10.4 实战：插入式注解处理器",
  "10.4.1 实战目标",
  "10.4.2 代码实现",
  "10.4.3 运行与测试",
  "10.4.4 其他应用案例",
  "10.5 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第10章 前端编译与优化" focus="沿Javac解析、符号表、注解处理、语义分析到字节码生成，拆解泛型擦除、装箱与遍历等语法糖" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第10章 前端编译与优化" focus="编写只读语法树的检查器，固定输入两次构建并比较生成物哈希，再验证错误定位与增量构建" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第10章 前端编译与优化" focus="Javac阶段图、脱糖前后字节码、处理器输入输出、确定性构建测试" nodes={nodes} />;
}
