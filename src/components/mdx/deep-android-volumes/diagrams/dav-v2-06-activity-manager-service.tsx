"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第6章 深入理解ActivityManagerService";
const focus = "剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收";
const nodes = [
  {
    label: "第6章 深入理解ActivityManagerService",
    stage: "锁定历史基线",
    mechanism:
      "第6章 深入理解ActivityManagerService在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查第6章 深入理解ActivityManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "6.1 概述在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2 初识ActivityManagerService",
    stage: "注入单一故障",
    mechanism:
      "6.2 初识ActivityManagerService在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2 初识ActivityManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.1 ActivityManagerService的main函数分析",
    stage: "定位首个分叉",
    mechanism:
      "6.2.1 ActivityManagerService的main函数分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2.1 ActivityManagerService的main函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.2 AMS的setSystemProcess分析",
    stage: "恢复同输入重放",
    mechanism:
      "6.2.2 AMS的setSystemProcess分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2.2 AMS的setSystemProcess分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.3 AMS的installSystemProviders函数分析",
    stage: "锁定历史基线",
    mechanism:
      "6.2.3 AMS的installSystemProviders函数分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2.3 AMS的installSystemProviders函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.4 AMS的systemReady分析",
    stage: "复现正常轨迹",
    mechanism:
      "6.2.4 AMS的systemReady分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志复核。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2.4 AMS的systemReady分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.5 初识ActivityManagerService总结",
    stage: "注入单一故障",
    mechanism:
      "6.2.5 初识ActivityManagerService总结在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.2.5 初识ActivityManagerService总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3 startActivity分析",
    stage: "定位首个分叉",
    mechanism:
      "6.3 startActivity分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.3 startActivity分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.1 从am说起",
    stage: "恢复同输入重放",
    mechanism:
      "6.3.1 从am说起在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志复核。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.3.1 从am说起的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.2 AMS的startActivityAndWait函数分析",
    stage: "锁定历史基线",
    mechanism:
      "6.3.2 AMS的startActivityAndWait函数分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.3.2 AMS的startActivityAndWait函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.3 startActivityLocked分析",
    stage: "复现正常轨迹",
    mechanism:
      "6.3.3 startActivityLocked分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.3.3 startActivityLocked分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4 Broadcast和BroadcastReceiver分析",
    stage: "注入单一故障",
    mechanism:
      "6.4 Broadcast和BroadcastReceiver分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4 Broadcast和BroadcastReceiver分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.1 registerReceiver流程分析",
    stage: "定位首个分叉",
    mechanism:
      "6.4.1 registerReceiver流程分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志复核。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4.1 registerReceiver流程分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.2 sendBroadcast流程分析",
    stage: "恢复同输入重放",
    mechanism:
      "6.4.2 sendBroadcast流程分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4.2 sendBroadcast流程分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.3 BROADCAST_INTENT_MSG消息处理函数",
    stage: "锁定历史基线",
    mechanism:
      "6.4.3 BROADCAST_INTENT_MSG消息处理函数在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4.3 BROADCAST_INTENT_MSG消息处理函数的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.4 应用进程处理广播分析",
    stage: "复现正常轨迹",
    mechanism:
      "6.4.4 应用进程处理广播分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4.4 应用进程处理广播分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.5 广播处理总结",
    stage: "注入单一故障",
    mechanism:
      "6.4.5 广播处理总结在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.4.5 广播处理总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5 startService之按图索骥",
    stage: "定位首个分叉",
    mechanism:
      "6.5 startService之按图索骥在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.5 startService之按图索骥的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.1 Service知识介绍",
    stage: "恢复同输入重放",
    mechanism:
      "6.5.1 Service知识介绍在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.5.1 Service知识介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.2 startService流程图",
    stage: "锁定历史基线",
    mechanism:
      "6.5.2 startService流程图在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.5.2 startService流程图的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6 AMS中的进程管理",
    stage: "复现正常轨迹",
    mechanism:
      "6.6 AMS中的进程管理在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.6 AMS中的进程管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.1 Linux进程管理介绍",
    stage: "注入单一故障",
    mechanism:
      "6.6.1 Linux进程管理介绍在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.6.1 Linux进程管理介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.2 Android中的进程管理介绍",
    stage: "定位首个分叉",
    mechanism:
      "6.6.2 Android中的进程管理介绍在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.6.2 Android中的进程管理介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.3 AMS进程管理函数分析",
    stage: "恢复同输入重放",
    mechanism:
      "6.6.3 AMS进程管理函数分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.6.3 AMS进程管理函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.4 AMS进程管理总结",
    stage: "锁定历史基线",
    mechanism:
      "6.6.4 AMS进程管理总结在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.6.4 AMS进程管理总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7 App的Crash处理",
    stage: "复现正常轨迹",
    mechanism:
      "6.7 App的Crash处理在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.7 App的Crash处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7.1 应用进程的Crash处理",
    stage: "注入单一故障",
    mechanism:
      "6.7.1 应用进程的Crash处理在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.7.1 应用进程的Crash处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7.2 AMS的handleApplicationCrash分析",
    stage: "定位首个分叉",
    mechanism:
      "6.7.2 AMS的handleApplicationCrash分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.7.2 AMS的handleApplicationCrash分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7.3 AppDeathRecipient binderDied分析",
    stage: "恢复同输入重放",
    mechanism:
      "6.7.3 AppDeathRecipient binderDied分析在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.7.3 AppDeathRecipient binderDied分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7.4 App的Crash处理总结",
    stage: "锁定历史基线",
    mechanism:
      "6.7.4 App的Crash处理总结在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.7.4 App的Crash处理总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.8 本章学习指导",
    stage: "复现正常轨迹",
    mechanism:
      "6.8 本章学习指导在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志复核。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.8 本章学习指导的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.9 本章小结",
    stage: "注入单一故障",
    mechanism:
      "6.9 本章小结在“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志检查6.9 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.0.1_r1固定输入下，剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只背生命周期回调，遗漏system_server状态机、调度队列和进程死亡清理",
  evidence:
    "Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志",
  boundary:
    "剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收的第一个线程、进程、Binder、JNI或持久状态边界",
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
