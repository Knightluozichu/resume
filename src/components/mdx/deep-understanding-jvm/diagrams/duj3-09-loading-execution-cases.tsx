import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第9章 类加载及执行子系统的案例与实战",
  "9.1 概述",
  "9.2 案例分析",
  "9.2.1 Tomcat：正统的类加载器架构",
  "9.2.2 OSGi：灵活的类加载器架构",
  "9.2.3 字节码生成技术与动态代理的实现",
  "9.2.4 Backport工具：Java的时光机器",
  "9.3 实战：自己动手实现远程执行功能",
  "9.3.1 目标",
  "9.3.2 思路",
  "9.3.3 实现",
  "9.3.4 验证",
  "9.4 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第9章 类加载及执行子系统的案例与实战" focus="比较Tomcat、OSGi、动态代理和Backport的类隔离与字节码改写，再实现受约束的远程执行实验" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第9章 类加载及执行子系统的案例与实战" focus="仅允许白名单类在隔离进程执行，注入超时、异常和静态状态，确认输出、资源与类加载器均被回收" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第9章 类加载及执行子系统的案例与实战" focus="类加载拓扑、隔离用例、代理字节码、远程执行威胁模型、沙箱与清理验证" nodes={nodes} />;
}
