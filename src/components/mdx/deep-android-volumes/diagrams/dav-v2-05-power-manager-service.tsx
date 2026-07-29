"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第5章 深入理解PowerManagerService";
const focus = "连接PMS初始化、WakeLock、用户活动、电源键与电池统计";
const nodes = [
  {
    label: "第5章 深入理解PowerManagerService",
    stage: "固定输入与所有者",
    mechanism:
      "第5章 深入理解PowerManagerService在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查第5章 深入理解PowerManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1 概述",
    stage: "触发系统请求",
    mechanism:
      "5.1 概述在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2 初识PowerManagerService",
    stage: "推进状态机",
    mechanism:
      "5.2 初识PowerManagerService在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2 初识PowerManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.1 PMS构造函数分析",
    stage: "观察反馈与释放",
    mechanism:
      "5.2.1 PMS构造函数分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2.1 PMS构造函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.2 init分析",
    stage: "复位后再次执行",
    mechanism:
      "5.2.2 init分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2.2 init分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.3 systemReady分析",
    stage: "固定输入与所有者",
    mechanism:
      "5.2.3 systemReady分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2.3 systemReady分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.4 BootComplete处理",
    stage: "触发系统请求",
    mechanism:
      "5.2.4 BootComplete处理在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2.4 BootComplete处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.5 初识PowerManagerService总结",
    stage: "推进状态机",
    mechanism:
      "5.2.5 初识PowerManagerService总结在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.2.5 初识PowerManagerService总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3 PMS WakeLock分析",
    stage: "观察反馈与释放",
    mechanism:
      "5.3 PMS WakeLock分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.3 PMS WakeLock分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.1 WakeLock客户端分析",
    stage: "复位后再次执行",
    mechanism:
      "5.3.1 WakeLock客户端分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.3.1 WakeLock客户端分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.2 PMS acquireWakeLock分析",
    stage: "固定输入与所有者",
    mechanism:
      "5.3.2 PMS acquireWakeLock分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.3.2 PMS acquireWakeLock分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.3 Power类及LightService类介绍",
    stage: "触发系统请求",
    mechanism:
      "5.3.3 Power类及LightService类介绍在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.3.3 Power类及LightService类介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.4 WakeLock总结",
    stage: "推进状态机",
    mechanism:
      "5.3.4 WakeLock总结在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.3.4 WakeLock总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4 userActivity及Power按键处理分析",
    stage: "观察反馈与释放",
    mechanism:
      "5.4 userActivity及Power按键处理分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.4 userActivity及Power按键处理分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.1 userActivity分析",
    stage: "复位后再次执行",
    mechanism:
      "5.4.1 userActivity分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.4.1 userActivity分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.2 Power按键处理分析",
    stage: "固定输入与所有者",
    mechanism:
      "5.4.2 Power按键处理分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.4.2 Power按键处理分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5 BatteryService及BatteryStatsService分析",
    stage: "触发系统请求",
    mechanism:
      "5.5 BatteryService及BatteryStatsService分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.5 BatteryService及BatteryStatsService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.1 BatteryService分析",
    stage: "推进状态机",
    mechanism:
      "5.5.1 BatteryService分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.5.1 BatteryService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.2 BatteryStatsService分析",
    stage: "观察反馈与释放",
    mechanism:
      "5.5.2 BatteryStatsService分析在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.5.2 BatteryStatsService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.3 BatteryService及BatteryStatsService总结",
    stage: "复位后再次执行",
    mechanism:
      "5.5.3 BatteryService及BatteryStatsService总结在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.5.3 BatteryService及BatteryStatsService总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.6 本章学习指导",
    stage: "固定输入与所有者",
    mechanism:
      "5.6 本章学习指导在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.6 本章学习指导的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.7 本章小结",
    stage: "触发系统请求",
    mechanism:
      "5.7 本章小结在“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志检查5.7 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.0.1_r1固定输入下，连接PMS初始化、WakeLock、用户活动、电源键与电池统计的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把WakeLock等同保持屏幕常亮，忽略类型、超时、UID归因与异常释放",
  evidence:
    "电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志",
  boundary:
    "连接PMS初始化、WakeLock、用户活动、电源键与电池统计的第一个线程、进程、Binder、JNI或持久状态边界",
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
