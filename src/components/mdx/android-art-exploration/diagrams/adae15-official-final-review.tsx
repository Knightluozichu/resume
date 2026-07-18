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

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="《Android开发艺术探索》全书总复习" focus="跨15章重建从用户事件到framework、Binder、线程、缓存、原生边界和性能证据的完整调用链" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="《Android开发艺术探索》全书总复习" focus="按章背诵类名却无法追踪一次操作跨组件、跨线程和跨进程的因果链" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="《Android开发艺术探索》全书总复习" focus="整书机制图、综合故障实验、源码定位、迁移差异和独立交接包" nodes={nodes} />; }
