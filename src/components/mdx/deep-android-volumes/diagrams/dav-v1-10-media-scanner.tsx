"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第10章 深入理解MediaScanner";
const focus = "贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入";
const nodes = [
  {
    label: "第10章 深入理解MediaScanner",
    stage: "锁定历史基线",
    mechanism:
      "第10章 深入理解MediaScanner在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查第10章 深入理解MediaScanner的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "10.1 概述在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.2 android.process.media分析",
    stage: "注入单一故障",
    mechanism:
      "10.2 android.process.media分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.2 android.process.media分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.2.1 MediaScannerReceiver模块分析",
    stage: "定位首个分叉",
    mechanism:
      "10.2.1 MediaScannerReceiver模块分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.2.1 MediaScannerReceiver模块分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.2.2 MediaScannerService模块分析",
    stage: "恢复同输入重放",
    mechanism:
      "10.2.2 MediaScannerService模块分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.2.2 MediaScannerService模块分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.2.3 android.process.media媒体扫描流程总结",
    stage: "锁定历史基线",
    mechanism:
      "10.2.3 android.process.media媒体扫描流程总结在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.2.3 android.process.media媒体扫描流程总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.3 MediaScanner分析",
    stage: "复现正常轨迹",
    mechanism:
      "10.3 MediaScanner分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.3 MediaScanner分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.3.1 Java层分析",
    stage: "注入单一故障",
    mechanism:
      "10.3.1 Java层分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本复核。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.3.1 Java层分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.3.2 JNI层分析",
    stage: "定位首个分叉",
    mechanism:
      "10.3.2 JNI层分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本复核。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.3.2 JNI层分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.3.3 PVMediaScanner分析",
    stage: "恢复同输入重放",
    mechanism:
      "10.3.3 PVMediaScanner分析在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.3.3 PVMediaScanner分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.3.4 关于MediaScanner的总结",
    stage: "锁定历史基线",
    mechanism:
      "10.3.4 关于MediaScanner的总结在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.3.4 关于MediaScanner的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.4 拓展思考",
    stage: "复现正常轨迹",
    mechanism:
      "10.4 拓展思考在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.4 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.4.1 MediaScannerConnection介绍",
    stage: "注入单一故障",
    mechanism:
      "10.4.1 MediaScannerConnection介绍在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.4.1 MediaScannerConnection介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.4.2 我问你答",
    stage: "定位首个分叉",
    mechanism:
      "10.4.2 我问你答在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本复核。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.4.2 我问你答的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "10.5 本章小结",
    stage: "恢复同输入重放",
    mechanism:
      "10.5 本章小结在“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本排除只凭类名或流程图得出的结论。",
    probe:
      "使用挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本检查10.5 本章小结的输入、状态变化、错误出口和释放结果",
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
  sourcePath: "platform/frameworks/base @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只调用scanFile验证成功路径，忽略目录扫描、去重、异常文件与数据库事务",
  evidence:
    "挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本",
  boundary:
    "贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入的第一个线程、进程、Binder、JNI或持久状态边界",
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
