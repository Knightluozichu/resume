import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第15章 Android性能优化",
  "15.1 Android的性能优化方法",
  "15.1.1 布局优化",
  "15.1.2 绘制优化",
  "15.1.3 内存泄露优化",
  "15.1.4 响应速度优化和ANR日志分析",
  "15.1.5 ListView和Bitmap优化",
  "15.1.6 线程优化",
  "15.1.7 一些性能优化建议",
  "15.2 内存泄露分析之MAT工具",
  "15.3 提高程序的可维护性"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第15章 Android性能优化" focus="以测量驱动布局、绘制、泄漏、响应、ANR、列表、Bitmap和线程优化，并用MAT与可维护性收口" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第15章 Android性能优化" focus="先优化再测量、只看平均值，或用缓存与线程掩盖生命周期泄漏" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第15章 Android性能优化" focus="性能预算、基线trace、布局层级、内存引用链、ANR栈、帧时间和回归门" nodes={nodes} />; }
