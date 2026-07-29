"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第7章 深入理解Audio系统";
const focus = "追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策";
const nodes = [
  {
    label: "第7章 深入理解Audio系统",
    stage: "固定输入与所有者",
    mechanism:
      "第7章 深入理解Audio系统在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查第7章 深入理解Audio系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1 概述",
    stage: "触发系统请求",
    mechanism:
      "7.1 概述在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2 AudioTrack的破解",
    stage: "推进状态机",
    mechanism:
      "7.2 AudioTrack的破解在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.2 AudioTrack的破解的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.1 用例介绍",
    stage: "观察反馈与释放",
    mechanism:
      "7.2.1 用例介绍在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.2.1 用例介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.2 AudioTrack（Java空间）分析",
    stage: "复位后再次执行",
    mechanism:
      "7.2.2 AudioTrack（Java空间）分析在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.2.2 AudioTrack（Java空间）分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.3 AudioTrack（Native空间）分析",
    stage: "固定输入与所有者",
    mechanism:
      "7.2.3 AudioTrack（Native空间）分析在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.2.3 AudioTrack（Native空间）分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.4 关于AudioTrack的总结",
    stage: "触发系统请求",
    mechanism:
      "7.2.4 关于AudioTrack的总结在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.2.4 关于AudioTrack的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3 AudioFlinger的破解",
    stage: "推进状态机",
    mechanism:
      "7.3 AudioFlinger的破解在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.3 AudioFlinger的破解的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.1 AudioFlinger的诞生",
    stage: "观察反馈与释放",
    mechanism:
      "7.3.1 AudioFlinger的诞生在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.3.1 AudioFlinger的诞生的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.2 通过流程分析AudioFlinger",
    stage: "复位后再次执行",
    mechanism:
      "7.3.2 通过流程分析AudioFlinger在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.3.2 通过流程分析AudioFlinger的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.3 audio_track_cblk_t分析",
    stage: "固定输入与所有者",
    mechanism:
      "7.3.3 audio_track_cblk_t分析在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.3.3 audio_track_cblk_t分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.4 关于AudioFlinger的总结",
    stage: "触发系统请求",
    mechanism:
      "7.3.4 关于AudioFlinger的总结在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.3.4 关于AudioFlinger的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4 AudioPolicyService的破解",
    stage: "推进状态机",
    mechanism:
      "7.4 AudioPolicyService的破解在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.4 AudioPolicyService的破解的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.1 AudioPolicyService的创建",
    stage: "观察反馈与释放",
    mechanism:
      "7.4.1 AudioPolicyService的创建在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.4.1 AudioPolicyService的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.2 重回AudioTrack",
    stage: "复位后再次执行",
    mechanism:
      "7.4.2 重回AudioTrack在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.4.2 重回AudioTrack的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.3 声音路由切换实例分析",
    stage: "固定输入与所有者",
    mechanism:
      "7.4.3 声音路由切换实例分析在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.4.3 声音路由切换实例分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.4 关于AudioPolicy的总结",
    stage: "触发系统请求",
    mechanism:
      "7.4.4 关于AudioPolicy的总结在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.4.4 关于AudioPolicy的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5 拓展思考",
    stage: "推进状态机",
    mechanism:
      "7.5 拓展思考在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.5 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.1 DuplicatingThread破解",
    stage: "观察反馈与释放",
    mechanism:
      "7.5.1 DuplicatingThread破解在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.5.1 DuplicatingThread破解的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.2 单元测试、ALSA与Desktop check",
    stage: "复位后再次执行",
    mechanism:
      "7.5.2 单元测试、ALSA与Desktop check在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.5.2 单元测试、ALSA与Desktop check的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6 本章小结",
    stage: "固定输入与所有者",
    mechanism:
      "7.6 本章小结在“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本检查7.6 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷I / Android 2.2 / API 8"];
const stages = [
  "固定输入与所有者",
  "触发系统请求",
  "推进状态机",
  "观察反馈与释放",
  "复位后再次执行",
];
const model = {
  sourceTag: "android-2.2_r1",
  sourcePath: "platform/frameworks/base @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只验证能出声，忽略共享缓冲区并发、策略选择与失败恢复",
  evidence:
    "共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本",
  boundary:
    "追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策的第一个线程、进程、Binder、JNI或持久状态边界",
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
