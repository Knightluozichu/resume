"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第3章 深入理解AudioService";
const focus = "追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机";
const nodes = [
  {
    label: "第3章 深入理解AudioService",
    stage: "固定输入与所有者",
    mechanism:
      "第3章 深入理解AudioService在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查第3章 深入理解AudioService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.1 概述",
    stage: "触发系统请求",
    mechanism:
      "3.1 概述在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置排除只凭类名或流程图得出的结论。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2 音量管理",
    stage: "推进状态机",
    mechanism:
      "3.2 音量管理在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.2 音量管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.1 音量键的处理流程",
    stage: "观察反馈与释放",
    mechanism:
      "3.2.1 音量键的处理流程在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.2.1 音量键的处理流程的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.2 通用的音量设置函数setStreamVolume()",
    stage: "复位后再次执行",
    mechanism:
      "3.2.2 通用的音量设置函数setStreamVolume()在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.2.2 通用的音量设置函数setStreamVolume()的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.3 静音控制",
    stage: "固定输入与所有者",
    mechanism:
      "3.2.3 静音控制在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置复核。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.2.3 静音控制的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.4 音量控制小结",
    stage: "触发系统请求",
    mechanism:
      "3.2.4 音量控制小结在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置排除只凭类名或流程图得出的结论。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.2.4 音量控制小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3 音频外设的管理",
    stage: "推进状态机",
    mechanism:
      "3.3 音频外设的管理在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置复核。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.3 音频外设的管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3.1 WiredAccessoryObserver设备状态的监控",
    stage: "观察反馈与释放",
    mechanism:
      "3.3.1 WiredAccessoryObserver设备状态的监控在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.3.1 WiredAccessoryObserver设备状态的监控的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3.2 AudioService的外设状态管理",
    stage: "复位后再次执行",
    mechanism:
      "3.3.2 AudioService的外设状态管理在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.3.2 AudioService的外设状态管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3.3 音频外设管理小结",
    stage: "固定输入与所有者",
    mechanism:
      "3.3.3 音频外设管理小结在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置排除只凭类名或流程图得出的结论。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.3.3 音频外设管理小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4 AudioFocus机制的实现",
    stage: "触发系统请求",
    mechanism:
      "3.4 AudioFocus机制的实现在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4 AudioFocus机制的实现的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.1 AudioFocus最简单的例子",
    stage: "推进状态机",
    mechanism:
      "3.4.1 AudioFocus最简单的例子在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4.1 AudioFocus最简单的例子的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.2 AudioFocus实现原理简介",
    stage: "观察反馈与释放",
    mechanism:
      "3.4.2 AudioFocus实现原理简介在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4.2 AudioFocus实现原理简介的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.3 申请AudioFocus",
    stage: "复位后再次执行",
    mechanism:
      "3.4.3 申请AudioFocus在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4.3 申请AudioFocus的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.4 释放AudioFocus",
    stage: "固定输入与所有者",
    mechanism:
      "3.4.4 释放AudioFocus在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4.4 释放AudioFocus的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.5 AudioFocus小结",
    stage: "触发系统请求",
    mechanism:
      "3.4.5 AudioFocus小结在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置排除只凭类名或流程图得出的结论。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.4.5 AudioFocus小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.5 AudioService的其他功能",
    stage: "推进状态机",
    mechanism:
      "3.5 AudioService的其他功能在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.5 AudioService的其他功能的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.6 本章小结",
    stage: "观察反馈与释放",
    mechanism:
      "3.6 本章小结在“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置排除只凭类名或流程图得出的结论。",
    probe:
      "使用stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置检查3.6 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷III / Android 4.2.2 / API 17"];
const stages = [
  "固定输入与所有者",
  "触发系统请求",
  "推进状态机",
  "观察反馈与释放",
  "复位后再次执行",
];
const model = {
  sourceTag: "android-4.2.2_r1",
  sourcePath: "platform/frameworks/base @ android-4.2.2_r1",
  invariant:
    "在android-4.2.2_r1固定输入下，追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把AudioService与卷I AudioFlinger混为一层，忽略策略控制与数据平面区别",
  evidence:
    "stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置",
  boundary:
    "追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机的第一个线程、进程、Binder、JNI或持久状态边界",
} satisfies DavCausalModel;
const props = { unitTitle, focus, nodes, versions, stages, model };

export function DavSeriesPipelineLab() {
  return <OfficialDavSeriesLab mode="pipeline" {...props} />;
}

export function DavSeriesExperimentLab() {
  return <OfficialDavSeriesLab mode="experiment" {...props} />;
}

export function DavSeriesEvidenceLab() {
  return <OfficialDavSeriesLab mode="evidence" {...props} />;
}
