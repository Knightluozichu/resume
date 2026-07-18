import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第3章 View的事件体系",
  "3.1 View基础知识",
  "3.1.1 什么是View",
  "3.1.2 View的位置参数",
  "3.1.3 MotionEvent和TouchSlop",
  "3.1.4 VelocityTracker、GestureDetector和Scroller",
  "3.2 View的滑动",
  "3.2.1 使用scrollTo/scrollBy",
  "3.2.2 使用动画",
  "3.2.3 改变布局参数",
  "3.2.4 各种滑动方式的对比",
  "3.3 弹性滑动",
  "3.3.1 使用Scroller",
  "3.3.2 通过动画",
  "3.3.3 使用延时策略",
  "3.4 View的事件分发机制",
  "3.4.1 点击事件的传递规则",
  "3.4.2 事件分发的源码解析",
  "3.5 View的滑动冲突",
  "3.5.1 常见的滑动冲突场景",
  "3.5.2 滑动冲突的处理规则",
  "3.5.3 滑动冲突的解决方式"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第3章 View的事件体系" focus="从坐标、MotionEvent、TouchSlop和速度工具推导滑动、弹性滑动、事件分发与滑动冲突解决" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第3章 View的事件体系" focus="只处理ACTION_DOWN和UP，忽略多指、CANCEL、父子拦截与事件序列所有权" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第3章 View的事件体系" focus="坐标轨迹、手势阈值、三种滑动对照、分发日志和冲突方向矩阵" nodes={nodes} />; }
