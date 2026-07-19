"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第7章 深入理解ContentProvider";
const focus =
  "从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递";
const nodes = [
  {
    label: "第7章 深入理解ContentProvider",
    stage: "锁定历史基线",
    mechanism:
      "第7章 深入理解ContentProvider在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查第7章 深入理解ContentProvider的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "7.1 概述在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2 MediaProvider的启动及创建",
    stage: "注入单一故障",
    mechanism:
      "7.2 MediaProvider的启动及创建在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.2 MediaProvider的启动及创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.1 Context的getContentResolver函数分析",
    stage: "定位首个分叉",
    mechanism:
      "7.2.1 Context的getContentResolver函数分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.2.1 Context的getContentResolver函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.2 MediaStore.Images.Media的query函数分析",
    stage: "恢复同输入重放",
    mechanism:
      "7.2.2 MediaStore.Images.Media的query函数分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.2.2 MediaStore.Images.Media的query函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.3 MediaProvider的启动及创建总结",
    stage: "锁定历史基线",
    mechanism:
      "7.2.3 MediaProvider的启动及创建总结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.2.3 MediaProvider的启动及创建总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3 SQLite创建数据库分析",
    stage: "复现正常轨迹",
    mechanism:
      "7.3 SQLite创建数据库分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.3 SQLite创建数据库分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.1 SQLite及SQLiteDatabase家族",
    stage: "注入单一故障",
    mechanism:
      "7.3.1 SQLite及SQLiteDatabase家族在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.3.1 SQLite及SQLiteDatabase家族的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.2 MediaProvider创建数据库分析",
    stage: "定位首个分叉",
    mechanism:
      "7.3.2 MediaProvider创建数据库分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.3.2 MediaProvider创建数据库分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.3 SQLiteDatabase创建数据库的分析总结",
    stage: "恢复同输入重放",
    mechanism:
      "7.3.3 SQLiteDatabase创建数据库的分析总结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.3.3 SQLiteDatabase创建数据库的分析总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4 Cursor的query函数实现分析",
    stage: "锁定历史基线",
    mechanism:
      "7.4 Cursor的query函数实现分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.4 Cursor的query函数实现分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.1 提取query关键点",
    stage: "复现正常轨迹",
    mechanism:
      "7.4.1 提取query关键点在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.4.1 提取query关键点的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.2 MediaProvider的query分析",
    stage: "注入单一故障",
    mechanism:
      "7.4.2 MediaProvider的query分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.4.2 MediaProvider的query分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.3 query关键点分析",
    stage: "定位首个分叉",
    mechanism:
      "7.4.3 query关键点分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.4.3 query关键点分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.4 Cursor query实现分析总结",
    stage: "恢复同输入重放",
    mechanism:
      "7.4.4 Cursor query实现分析总结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.4.4 Cursor query实现分析总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5 Cursor close函数实现分析",
    stage: "锁定历史基线",
    mechanism:
      "7.5 Cursor close函数实现分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.5 Cursor close函数实现分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.1 客户端close分析",
    stage: "复现正常轨迹",
    mechanism:
      "7.5.1 客户端close分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.5.1 客户端close分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.2 服务端close分析",
    stage: "注入单一故障",
    mechanism:
      "7.5.2 服务端close分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.5.2 服务端close分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.3 finalize函数分析",
    stage: "定位首个分叉",
    mechanism:
      "7.5.3 finalize函数分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.5.3 finalize函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.4 Cursor close函数总结",
    stage: "恢复同输入重放",
    mechanism:
      "7.5.4 Cursor close函数总结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.5.4 Cursor close函数总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6 ContentResolver openAssetFileDescriptor函数分析",
    stage: "锁定历史基线",
    mechanism:
      "7.6 ContentResolver openAssetFileDescriptor函数分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.6 ContentResolver openAssetFileDescriptor函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6.1 openAssetFileDescriptor之客户端调用分析",
    stage: "复现正常轨迹",
    mechanism:
      "7.6.1 openAssetFileDescriptor之客户端调用分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.6.1 openAssetFileDescriptor之客户端调用分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6.2 ContentProvider的openTypedAssetFile函数分析",
    stage: "注入单一故障",
    mechanism:
      "7.6.2 ContentProvider的openTypedAssetFile函数分析在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.6.2 ContentProvider的openTypedAssetFile函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6.3 跨进程传递文件描述符的探讨",
    stage: "定位首个分叉",
    mechanism:
      "7.6.3 跨进程传递文件描述符的探讨在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.6.3 跨进程传递文件描述符的探讨的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6.4 openAssetFileDescriptor函数分析总结",
    stage: "恢复同输入重放",
    mechanism:
      "7.6.4 openAssetFileDescriptor函数分析总结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.6.4 openAssetFileDescriptor函数分析总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.7 本章学习指导",
    stage: "锁定历史基线",
    mechanism:
      "7.7 本章学习指导在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理复核。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.7 本章学习指导的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.8 本章小结",
    stage: "复现正常轨迹",
    mechanism:
      "7.8 本章小结在“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理排除只凭类名或流程图得出的结论。",
    probe:
      "使用Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理检查7.8 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷II / Android 4.0.1 / API 14"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-4.0.1_r1",
  sourcePath: "platform/frameworks/base @ android-4.0.1_r1",
  invariant:
    "在android-4.0.1_r1固定输入下，从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只会ContentResolver CRUD，忽略Provider启动、Cursor远端资源和FD所有权",
  evidence:
    "Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理",
  boundary:
    "从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递的第一个线程、进程、Binder、JNI或持久状态边界",
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
