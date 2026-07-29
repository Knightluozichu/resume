"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第8章 深入理解ContentService和AccountManagerService";
const focus = "连接内容观察者、账户认证与SyncManager调度的数据闭环";
const nodes = [
  {
    label: "第8章 深入理解ContentService和AccountManagerService",
    stage: "固定输入与所有者",
    mechanism:
      "第8章 深入理解ContentService和AccountManagerService在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查第8章 深入理解ContentService和AccountManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.1 概述",
    stage: "触发系统请求",
    mechanism:
      "8.1 概述在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2 数据更新通知机制分析",
    stage: "推进状态机",
    mechanism:
      "8.2 数据更新通知机制分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.2 数据更新通知机制分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.1 初识ContentService",
    stage: "观察反馈与释放",
    mechanism:
      "8.2.1 初识ContentService在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.2.1 初识ContentService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.2 ContentResolver的registerContentObserver分析",
    stage: "复位后再次执行",
    mechanism:
      "8.2.2 ContentResolver的registerContentObserver分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.2.2 ContentResolver的registerContentObserver分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.3 ContentResolver的notifyChange分析",
    stage: "固定输入与所有者",
    mechanism:
      "8.2.3 ContentResolver的notifyChange分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.2.3 ContentResolver的notifyChange分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.4 数据更新通知机制总结和深入探讨",
    stage: "触发系统请求",
    mechanism:
      "8.2.4 数据更新通知机制总结和深入探讨在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.2.4 数据更新通知机制总结和深入探讨的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3 AccountManagerService分析",
    stage: "推进状态机",
    mechanism:
      "8.3 AccountManagerService分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.3 AccountManagerService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.1 初识AccountManagerService",
    stage: "观察反馈与释放",
    mechanism:
      "8.3.1 初识AccountManagerService在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.3.1 初识AccountManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.2 AccountManager addAccount分析",
    stage: "复位后再次执行",
    mechanism:
      "8.3.2 AccountManager addAccount分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.3.2 AccountManager addAccount分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.3 AccountManagerService分析总结",
    stage: "固定输入与所有者",
    mechanism:
      "8.3.3 AccountManagerService分析总结在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.3.3 AccountManagerService分析总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4 数据同步管理SyncManager分析",
    stage: "触发系统请求",
    mechanism:
      "8.4 数据同步管理SyncManager分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.4 数据同步管理SyncManager分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.1 初识SyncManager",
    stage: "推进状态机",
    mechanism:
      "8.4.1 初识SyncManager在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.4.1 初识SyncManager的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.2 ContentResolver的requestSync分析",
    stage: "观察反馈与释放",
    mechanism:
      "8.4.2 ContentResolver的requestSync分析在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.4.2 ContentResolver的requestSync分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.3 数据同步管理SyncManager分析总结",
    stage: "复位后再次执行",
    mechanism:
      "8.4.3 数据同步管理SyncManager分析总结在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.4.3 数据同步管理SyncManager分析总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5 本章学习指导",
    stage: "固定输入与所有者",
    mechanism:
      "8.5 本章学习指导在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.5 本章学习指导的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.6 本章小结",
    stage: "触发系统请求",
    mechanism:
      "8.6 本章小结在“连接内容观察者、账户认证与SyncManager调度的数据闭环”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态检查8.6 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷II / Android 4.0.1 / API 14"];
const stages = [
  "固定输入与所有者",
  "触发系统请求",
  "推进状态机",
  "观察反馈与释放",
  "复位后再次执行",
];
const model = {
  sourceTag: "android-4.0.1_r1",
  sourcePath: "platform/frameworks/base @ android-4.0.1_r1",
  invariant:
    "在android-4.0.1_r1固定输入下，连接内容观察者、账户认证与SyncManager调度的数据闭环的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把notifyChange、账户和同步当三套独立API，遗漏身份、订阅与调度关系",
  evidence:
    "Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态",
  boundary:
    "连接内容观察者、账户认证与SyncManager调度的数据闭环的第一个线程、进程、Binder、JNI或持久状态边界",
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
