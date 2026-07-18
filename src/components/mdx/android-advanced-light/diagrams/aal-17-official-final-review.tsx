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

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="《Android进阶之光》全书总复习" focus="从版本与UI行为出发，复盘线程、网络、模式、事件流、依赖图、应用架构和MediaPlayer源码证据" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="《Android进阶之光》全书总复习" focus="只背框架名称和源码类名，不能解释输入、线程、生命周期、调用方向与失败证据" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="《Android进阶之光》全书总复习" focus="全书节点表、View与线程实验、网络抓包、订阅释放、对象图、架构状态测试和媒体调用链" nodes={nodes} />; }
