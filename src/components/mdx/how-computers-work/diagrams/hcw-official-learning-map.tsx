"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "核验2015版身份",
  "连接最小硬件",
  "执行机器程序",
  "组织算法数据",
  "交换保护信息",
  "构建运营系统",
] as const;
const concepts = [
  "第1章 计算机的三大原则",
  "第2章 试着制造一台计算机吧",
  "第3章 体验一次手工汇编",
  "第4章 程序像河水一样流动着",
  "第5章 与算法成为好朋友的七个要点",
  "第6章 与数据结构成为好朋友的七个要点",
  "第7章 成为会使用面向对象编程的程序员吧",
  "第8章 一用就会的数据库",
  "第9章 通过七个简单的实验理解TCP/IP网络",
  "第10章 试着加密数据吧",
  "第11章 XML是什么",
  "第12章 SE负责监管计算机系统的构建",
] as const;
const common = {
  title: "《计算机是怎样跑起来的》权威学习地图",
  label: "计算机怎样运行 · 导学",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function HcwOfficialLearningMapMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function HcwOfficialLearningMapExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function HcwOfficialLearningMapEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
