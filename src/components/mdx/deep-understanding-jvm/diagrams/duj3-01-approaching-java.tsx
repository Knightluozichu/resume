import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第1章 走近Java",
  "1.1 概述",
  "1.2 Java技术体系",
  "1.3 Java发展史",
  "1.4 Java虚拟机家族",
  "1.4.1 虚拟机始祖：Sun Classic/Exact VM",
  "1.4.2 武林盟主：HotSpot VM",
  "1.4.3 小家碧玉：Mobile/Embedded VM",
  "1.4.4 天下第二：BEA JRockit/IBM J9 VM",
  "1.4.5 软硬合璧：BEA Liquid VM/Azul VM",
  "1.4.6 挑战者：Apache Harmony/Google Android Dalvik VM",
  "1.4.7 没有成功，但并非失败：Microsoft JVM及其他",
  "1.4.8 百家争鸣",
  "1.5 展望Java技术的未来",
  "1.5.1 无语言倾向",
  "1.5.2 新一代即时编译器",
  "1.5.3 向Native迈进",
  "1.5.4 灵活的胖子",
  "1.5.5 语言语法持续增强",
  "1.6 实战：自己编译JDK",
  "1.6.1 获取源码",
  "1.6.2 系统需求",
  "1.6.3 构建编译环境",
  "1.6.4 进行编译",
  "1.6.5 在IDE工具中进行源码调试",
  "1.7 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第1章 走近Java" focus="从Java体系和JVM演进走到可重复的OpenJDK 12源码构建，建立阅读虚拟机实现的入口" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第1章 走近Java" focus="固定源码提交和boot JDK，完成一次干净构建并在类加载或GC初始化路径命中源码断点" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第1章 走近Java" focus="JVM家族比较表、JDK 12构建清单、构建日志、镜像验证与调试断点" nodes={nodes} />;
}
