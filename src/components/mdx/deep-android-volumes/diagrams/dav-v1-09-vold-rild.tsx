"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第9章 深入理解Vold和Rild";
const focus = "比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链";
const nodes = [
  {
    label: "第9章 深入理解Vold和Rild",
    stage: "锁定历史基线",
    mechanism:
      "第9章 深入理解Vold和Rild在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查第9章 深入理解Vold和Rild的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "9.1 概述在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2 Vold的原理与机制分析",
    stage: "注入单一故障",
    mechanism:
      "9.2 Vold的原理与机制分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2 Vold的原理与机制分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.1 Netlink和Uevent介绍",
    stage: "定位首个分叉",
    mechanism:
      "9.2.1 Netlink和Uevent介绍在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.1 Netlink和Uevent介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.2 初识Vold",
    stage: "恢复同输入重放",
    mechanism:
      "9.2.2 初识Vold在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.2 初识Vold的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.3 NetlinkManager模块分析",
    stage: "锁定历史基线",
    mechanism:
      "9.2.3 NetlinkManager模块分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.3 NetlinkManager模块分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.4 VolumeManager模块分析",
    stage: "复现正常轨迹",
    mechanism:
      "9.2.4 VolumeManager模块分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.4 VolumeManager模块分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.5 CommandListener模块分析",
    stage: "注入单一故障",
    mechanism:
      "9.2.5 CommandListener模块分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.5 CommandListener模块分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.6 Vold实例分析",
    stage: "定位首个分叉",
    mechanism:
      "9.2.6 Vold实例分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.6 Vold实例分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.2.7 关于Vold的总结",
    stage: "恢复同输入重放",
    mechanism:
      "9.2.7 关于Vold的总结在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.2.7 关于Vold的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3 Rild的原理与机制分析",
    stage: "锁定历史基线",
    mechanism:
      "9.3 Rild的原理与机制分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3 Rild的原理与机制分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.1 初识Rild",
    stage: "复现正常轨迹",
    mechanism:
      "9.3.1 初识Rild在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.1 初识Rild的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.2 RIL_startEventLoop分析",
    stage: "注入单一故障",
    mechanism:
      "9.3.2 RIL_startEventLoop分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.2 RIL_startEventLoop分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.3 RIL_Init分析",
    stage: "定位首个分叉",
    mechanism:
      "9.3.3 RIL_Init分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.3 RIL_Init分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.4 RIL_register分析",
    stage: "恢复同输入重放",
    mechanism:
      "9.3.4 RIL_register分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.4 RIL_register分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.5 关于Rild main函数的总结",
    stage: "锁定历史基线",
    mechanism:
      "9.3.5 关于Rild main函数的总结在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.5 关于Rild main函数的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.6 Rild实例分析",
    stage: "复现正常轨迹",
    mechanism:
      "9.3.6 Rild实例分析在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.6 Rild实例分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.3.7 关于Rild的总结",
    stage: "注入单一故障",
    mechanism:
      "9.3.7 关于Rild的总结在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.3.7 关于Rild的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.4 拓展思考",
    stage: "定位首个分叉",
    mechanism:
      "9.4 拓展思考在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.4 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.4.1 嵌入式系统的存储知识介绍",
    stage: "恢复同输入重放",
    mechanism:
      "9.4.1 嵌入式系统的存储知识介绍在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.4.1 嵌入式系统的存储知识介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.4.2 Rild和Phone的改进探讨",
    stage: "锁定历史基线",
    mechanism:
      "9.4.2 Rild和Phone的改进探讨在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.4.2 Rild和Phone的改进探讨的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "9.5 本章小结",
    stage: "复现正常轨迹",
    mechanism:
      "9.5 本章小结在“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复排除只凭类名或流程图得出的结论。",
    probe:
      "使用uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复检查9.5 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷I / Android 2.2 / API 8"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-2.2_r1",
  sourcePath: "platform/system/core @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault:
    "把Vold和Rild并列成两个守护进程名称，未区分同步存储状态机与异步射频协议",
  evidence:
    "uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复",
  boundary:
    "比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链的第一个线程、进程、Binder、JNI或持久状态边界",
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
