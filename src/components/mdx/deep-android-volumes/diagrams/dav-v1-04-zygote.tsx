"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第4章 深入理解zygote";
const focus = "追踪app_process进入Java世界、SystemServer诞生与应用进程fork";
const nodes = [
  {
    label: "第4章 深入理解zygote",
    stage: "固定输入与所有者",
    mechanism:
      "第4章 深入理解zygote在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查第4章 深入理解zygote的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1 概述",
    stage: "触发系统请求",
    mechanism:
      "4.1 概述在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2 zygote分析",
    stage: "推进状态机",
    mechanism:
      "4.2 zygote分析在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.2 zygote分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.1 AppRuntime分析",
    stage: "观察反馈与释放",
    mechanism:
      "4.2.1 AppRuntime分析在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时复核。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.2.1 AppRuntime分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.2 Welcome to Java World",
    stage: "复位后再次执行",
    mechanism:
      "4.2.2 Welcome to Java World在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时复核。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.2.2 Welcome to Java World的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.3 关于zygote的总结",
    stage: "固定输入与所有者",
    mechanism:
      "4.2.3 关于zygote的总结在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.2.3 关于zygote的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3 SystemServer分析",
    stage: "触发系统请求",
    mechanism:
      "4.3 SystemServer分析在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.3 SystemServer分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.1 SystemServer的诞生",
    stage: "推进状态机",
    mechanism:
      "4.3.1 SystemServer的诞生在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.3.1 SystemServer的诞生的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.2 SystemServer的重要使命",
    stage: "观察反馈与释放",
    mechanism:
      "4.3.2 SystemServer的重要使命在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.3.2 SystemServer的重要使命的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.3 关于SystemServer的总结",
    stage: "复位后再次执行",
    mechanism:
      "4.3.3 关于SystemServer的总结在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.3.3 关于SystemServer的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4 zygote的分裂",
    stage: "固定输入与所有者",
    mechanism:
      "4.4 zygote的分裂在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.4 zygote的分裂的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.1 ActivityManagerService发送请求",
    stage: "触发系统请求",
    mechanism:
      "4.4.1 ActivityManagerService发送请求在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.4.1 ActivityManagerService发送请求的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.2 有求必应之响应请求",
    stage: "推进状态机",
    mechanism:
      "4.4.2 有求必应之响应请求在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时复核。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.4.2 有求必应之响应请求的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.3 关于zygote分裂的总结",
    stage: "观察反馈与释放",
    mechanism:
      "4.4.3 关于zygote分裂的总结在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.4.3 关于zygote分裂的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5 拓展思考",
    stage: "复位后再次执行",
    mechanism:
      "4.5 拓展思考在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.5 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.1 虚拟机heapsize的限制",
    stage: "固定输入与所有者",
    mechanism:
      "4.5.1 虚拟机heapsize的限制在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.5.1 虚拟机heapsize的限制的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.2 开机速度优化",
    stage: "触发系统请求",
    mechanism:
      "4.5.2 开机速度优化在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时复核。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.5.2 开机速度优化的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.3 Watchdog分析",
    stage: "推进状态机",
    mechanism:
      "4.5.3 Watchdog分析在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.5.3 Watchdog分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.6 本章小结",
    stage: "观察反馈与释放",
    mechanism:
      "4.6 本章小结在“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时排除只凭类名或流程图得出的结论。",
    probe:
      "使用Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时检查4.6 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-2.2_r1固定输入下，追踪app_process进入Java世界、SystemServer诞生与应用进程fork的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只画init到Zygote箭头，遗漏预加载、fork分支和system_server职责",
  evidence:
    "Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时",
  boundary:
    "追踪app_process进入Java世界、SystemServer诞生与应用进程fork的第一个线程、进程、Binder、JNI或持久状态边界",
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
