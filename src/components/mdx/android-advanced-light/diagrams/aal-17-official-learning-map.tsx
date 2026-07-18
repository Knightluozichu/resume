import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第1章 Android新特性",
  "第2章 Material Design",
  "第3章 View体系与自定义View",
  "第4章 多线程编程",
  "第5章 网络编程与网络框架",
  "第6章 设计模式",
  "第7章 事件总线",
  "第8章 函数响应式编程",
  "第9章 注解与依赖注入框架",
  "第10章 应用架构设计",
  "第11章 系统架构与MediaPlayer框架"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="《Android进阶之光》权威学习地图" focus="以11章190个节点贯通Android 5至7应用进阶、View与并发、网络与架构，再进入MediaPlayer三层源码" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="《Android进阶之光》权威学习地图" focus="把本书误写成系统源码专著，遗漏新特性、Material、View、网络框架、RxJava、依赖注入与应用架构" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="《Android进阶之光》权威学习地图" focus="11章190节点矩阵、Android版本卡、应用机制实验、框架源码调用图和现代迁移账本" nodes={nodes} />; }
