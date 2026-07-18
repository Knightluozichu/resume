import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第1章 Activity的生命周期和启动模式",
  "第2章 IPC机制",
  "第3章 View的事件体系",
  "第4章 View的工作原理",
  "第5章 理解RemoteViews",
  "第6章 Android的Drawable",
  "第7章 Android动画深入分析",
  "第8章 理解Window和WindowManager",
  "第9章 四大组件的工作过程",
  "第10章 Android的消息机制",
  "第11章 Android的线程和线程池",
  "第12章 Bitmap的加载和Cache",
  "第13章 综合技术",
  "第14章 JNI和NDK编程",
  "第15章 Android性能优化"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="《Android开发艺术探索》权威学习地图" focus="沿Android 5.0源码与应用层边界串联Activity、IPC、View、跨进程UI、框架内部、线程、缓存、JNI和性能" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="《Android开发艺术探索》权威学习地图" focus="把15章压成生命周期、Binder、View、Handler和性能几个概览，遗漏完整机制链" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="《Android开发艺术探索》权威学习地图" focus="15章173节点矩阵、框架调用图、实验路线、版本迁移账本和全书验收表" nodes={nodes} />; }
