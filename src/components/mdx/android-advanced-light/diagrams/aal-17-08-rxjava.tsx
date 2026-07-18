import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第8章 函数响应式编程",
  "8.1 RxJava基本用法",
  "8.1.1 RxJava概述",
  "8.1.2 RxJava基本实现",
  "8.1.3 RxJava的不完整定义回调",
  "8.2 RxJava的Subject",
  "8.3 RxJava操作符入门",
  "8.3.1 创建操作符",
  "8.3.2 变换操作符",
  "8.3.3 过滤操作符",
  "8.3.4 组合操作符",
  "8.3.5 辅助操作符",
  "8.3.6 错误处理操作符",
  "8.3.7 条件操作符和布尔操作符",
  "8.3.8 转换操作符",
  "8.4 RxJava的线程控制",
  "8.5 RxJava的使用场景",
  "8.5.1 RxJava结合OkHttp访问网络",
  "8.5.2 RxJava结合Retrofit访问网络",
  "8.5.3 用RxJava实现RxBus",
  "8.6 RxJava源码解析",
  "8.6.1 RxJava的订阅过程",
  "8.6.2 RxJava的变换过程",
  "8.6.3 RxJava的线程切换过程",
  "8.7 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第8章 函数响应式编程" focus="从Observable订阅进入Subject、八类操作符、线程控制、OkHttp与Retrofit组合、RxBus及订阅变换线程切换源码" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第8章 函数响应式编程" focus="把长操作符链当作天然异步和安全，忽略错误终止、订阅释放、线程切换位置和上游速度" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第8章 函数响应式编程" focus="事件时序图、订阅释放、错误终止、背压假设、调度线程、操作符输入输出与网络取消日志" nodes={nodes} />; }
