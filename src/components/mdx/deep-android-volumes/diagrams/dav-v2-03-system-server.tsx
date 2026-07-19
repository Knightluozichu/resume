"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第3章 深入理解SystemServer";
const focus =
  "从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务";
const nodes = [
  {
    label: "第3章 深入理解SystemServer",
    stage: "界定卷册范围",
    mechanism:
      "第3章 深入理解SystemServer在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查第3章 深入理解SystemServer的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.1 概述",
    stage: "画出责任边界",
    mechanism:
      "3.1 概述在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查排除只凭类名或流程图得出的结论。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2 SystemServer分析",
    stage: "声明机制不变量",
    mechanism:
      "3.2 SystemServer分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.2 SystemServer分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.1 main函数分析",
    stage: "用反例挑战",
    mechanism:
      "3.2.1 main函数分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.2.1 main函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.2 Service群英会",
    stage: "记录迁移决策",
    mechanism:
      "3.2.2 Service群英会在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.2.2 Service群英会的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3 EntropyService分析",
    stage: "界定卷册范围",
    mechanism:
      "3.3 EntropyService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.3 EntropyService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4 DropBoxManagerService分析",
    stage: "画出责任边界",
    mechanism:
      "3.4 DropBoxManagerService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.4 DropBoxManagerService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.1 DBMS构造函数分析",
    stage: "声明机制不变量",
    mechanism:
      "3.4.1 DBMS构造函数分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.4.1 DBMS构造函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.2 dropbox日志文件的添加",
    stage: "用反例挑战",
    mechanism:
      "3.4.2 dropbox日志文件的添加在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.4.2 dropbox日志文件的添加的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.4.3 DBMS和settings数据库",
    stage: "记录迁移决策",
    mechanism:
      "3.4.3 DBMS和settings数据库在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.4.3 DBMS和settings数据库的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.5 DiskStatsService和DeviceStorageMonitorService分析",
    stage: "界定卷册范围",
    mechanism:
      "3.5 DiskStatsService和DeviceStorageMonitorService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.5 DiskStatsService和DeviceStorageMonitorService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.5.1 DiskStatsService分析",
    stage: "画出责任边界",
    mechanism:
      "3.5.1 DiskStatsService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.5.1 DiskStatsService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.5.2 DeviceStorageMonitorService分析",
    stage: "声明机制不变量",
    mechanism:
      "3.5.2 DeviceStorageMonitorService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.5.2 DeviceStorageMonitorService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.6 SamplingProfilerService分析",
    stage: "用反例挑战",
    mechanism:
      "3.6 SamplingProfilerService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.6 SamplingProfilerService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.6.1 SamplingProfilerService构造函数分析",
    stage: "记录迁移决策",
    mechanism:
      "3.6.1 SamplingProfilerService构造函数分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.6.1 SamplingProfilerService构造函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.6.2 SamplingProfilerIntegration分析",
    stage: "界定卷册范围",
    mechanism:
      "3.6.2 SamplingProfilerIntegration分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.6.2 SamplingProfilerIntegration分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.7 ClipboardService分析",
    stage: "画出责任边界",
    mechanism:
      "3.7 ClipboardService分析在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.7 ClipboardService分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.7.1 复制数据到剪贴板",
    stage: "声明机制不变量",
    mechanism:
      "3.7.1 复制数据到剪贴板在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.7.1 复制数据到剪贴板的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.7.2 从剪贴板粘贴数据",
    stage: "用反例挑战",
    mechanism:
      "3.7.2 从剪贴板粘贴数据在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查复核。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.7.2 从剪贴板粘贴数据的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.7.3 ClipboardService中的权限管理",
    stage: "记录迁移决策",
    mechanism:
      "3.7.3 ClipboardService中的权限管理在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.7.3 ClipboardService中的权限管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.8 本章小结",
    stage: "界定卷册范围",
    mechanism:
      "3.8 本章小结在“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查排除只凭类名或流程图得出的结论。",
    probe:
      "使用服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查检查3.8 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷II / Android 4.0.1 / API 14"];
const stages = [
  "界定卷册范围",
  "画出责任边界",
  "声明机制不变量",
  "用反例挑战",
  "记录迁移决策",
];
const model = {
  sourceTag: "android-4.0.1_r1",
  sourcePath: "platform/frameworks/base @ android-4.0.1_r1",
  invariant:
    "在android-4.0.1_r1固定输入下，从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只列SystemServer服务名，未证明启动依赖、持久状态和调用权限",
  evidence:
    "服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查",
  boundary:
    "从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务的第一个线程、进程、Binder、JNI或持久状态边界",
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
