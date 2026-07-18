import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第3章 View体系与自定义View",
  "3.1 View与ViewGroup",
  "3.2 坐标系",
  "3.2.1 Android坐标系",
  "3.2.2 View坐标系",
  "3.3 View的滑动",
  "3.3.1 layout()方法",
  "3.3.2 offsetLeftAndRight()与offsetTopAndBottom()",
  "3.3.3 LayoutParams（改变布局参数）",
  "3.3.4 动画",
  "3.3.5 scrollTo与scrollBy",
  "3.3.6 Scroller",
  "3.4 属性动画",
  "3.5 解析Scroller",
  "3.6 View的事件分发机制",
  "3.6.1 源码解析Activity的构成",
  "3.6.2 源码解析View的事件分发机制",
  "3.7 View的工作流程",
  "3.7.1 View的工作流程入口",
  "3.7.2 理解MeasureSpec",
  "3.7.3 View的measure流程",
  "3.7.4 View的layout流程",
  "3.7.5 View的draw流程",
  "3.8 自定义View",
  "3.8.1 继承系统控件的自定义View",
  "3.8.2 继承View的自定义View",
  "3.8.3 自定义组合控件",
  "3.8.4 自定义ViewGroup",
  "3.9 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第3章 View体系与自定义View" focus="贯通坐标、六种滑动方式、属性动画、Scroller、事件分发、measure/layout/draw流程和四类自定义View" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第3章 View体系与自定义View" focus="只让自定义View在固定尺寸下看起来正确，不处理测量模式、padding、事件冲突和状态恢复" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第3章 View体系与自定义View" focus="MotionEvent序列、坐标换算、MeasureSpec、测量尺寸、布局坐标、绘制边界与父子拦截日志" nodes={nodes} />; }
