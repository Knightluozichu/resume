import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第3章 Android事件机制",
  "3.1 Android事件处理概述",
  "3.2 基于监听的事件处理",
  "3.2.1 监听的处理模型",
  "3.2.2 事件和事件监听器",
  "实例：控制飞机移动",
  "3.2.3 内部类作为事件监听器类",
  "3.2.4 外部类作为事件监听器类",
  "3.2.5 Activity本身作为事件监听器类",
  "3.2.6 Lambda表达式作为事件监听器类",
  "3.2.7 直接绑定到标签",
  "3.3 基于回调的事件处理",
  "3.3.1 回调机制与监听机制",
  "3.3.2 基于回调的事件传播",
  "3.4 响应系统设置的事件",
  "3.4.1 Configuration类简介",
  "实例：获取系统设备状态",
  "3.4.2 重写onConfigurationChanged方法响应系统设置更改",
  "实例：监听屏幕方向的改变",
  "3.5 Handler消息传递机制",
  "3.5.1 Handler类简介",
  "实例：自动播放动画",
  "3.5.2 Handler、Loop、MessageQueue的工作原理",
  "实例：使用新线程计算质数",
  "3.6 异步任务（AsyncTask）",
  "实例：使用异步任务执行下载",
  "3.7 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第3章 Android事件机制" focus="比较监听与回调的事件传播，并用Configuration、Handler消息循环和AsyncTask解释异步响应" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第3章 Android事件机制" focus="比较监听与回调的事件传播，并用Configuration、Handler消息循环和AsyncTask解释异步响应" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第3章 Android事件机制" focus="事件传播图、消息队列轨迹、线程断言、配置变化和取消测试" nodes={nodes} />; }
