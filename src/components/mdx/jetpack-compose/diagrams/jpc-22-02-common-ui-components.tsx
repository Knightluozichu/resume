import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第2章 了解常用UI组件",
  "2.1 Modifier修饰符",
  "2.1.1 常用修饰符",
  "2.1.2 作用域限定Modifier修饰符",
  "2.1.3 Modifier实现原理",
  "2.2 常用的基础组件",
  "2.2.1 文字组件",
  "2.2.2 图片组件",
  "2.2.3 按钮组件",
  "2.2.4 选择器",
  "2.2.5 对话框",
  "2.3 常用的布局组件",
  "2.3.1 线性布局",
  "2.3.2 帧布局",
  "2.3.3 Spacer留白",
  "2.3.4 ConstraintLayout约束布局",
  "2.3.5 Scaffold脚手架",
  "2.4 列表",
  "2.4.1 Lazy Composables",
  "2.4.2 LazyListScope作用域",
  "2.4.3 内容填充",
  "2.5 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第2章 了解常用UI组件" focus="沿Modifier顺序与作用域，组合文本、图片、按钮、选择器、对话框、基础布局、Scaffold和惰性列表" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第2章 了解常用UI组件" focus="把Modifier当成无序样式集合，或让惰性列表使用位置作为身份导致状态错位" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第2章 了解常用UI组件" focus="Modifier顺序对照、作用域编译约束、布局边界、列表稳定键、滚动状态与语义树" nodes={nodes} />; }
