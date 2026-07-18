import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第10章 Android的消息机制",
  "10.1 Android的消息机制概述",
  "10.2 Android的消息机制分析",
  "10.2.1 ThreadLocal的工作原理",
  "10.2.2 消息队列的工作原理",
  "10.2.3 Looper的工作原理",
  "10.2.4 Handler的工作原理",
  "10.3 主线程的消息循环"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第10章 Android的消息机制" focus="拆解ThreadLocal、MessageQueue、Looper、Handler与主线程消息循环，验证消息入队、取出、分发和退出" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第10章 Android的消息机制" focus="在没有Looper的线程创建Handler，或让非静态Handler长期持有已销毁组件" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第10章 Android的消息机制" focus="线程局部表、消息队列时间线、Looper循环、Handler归属、主线程栈和泄漏实验" nodes={nodes} />; }
