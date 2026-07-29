"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第7章 深入理解SystemUI";
const focus = "剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播";
const nodes = [
  {
    label: "第7章 深入理解SystemUI",
    stage: "锁定历史基线",
    mechanism:
      "第7章 深入理解SystemUI在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查第7章 深入理解SystemUI的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1 初识SystemUI",
    stage: "复现正常轨迹",
    mechanism:
      "7.1 初识SystemUI在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链排除只凭类名或流程图得出的结论。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.1 初识SystemUI的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1.1 SystemUIService的启动",
    stage: "注入单一故障",
    mechanism:
      "7.1.1 SystemUIService的启动在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.1.1 SystemUIService的启动的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1.2 状态栏与导航栏的创建",
    stage: "定位首个分叉",
    mechanism:
      "7.1.2 状态栏与导航栏的创建在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.1.2 状态栏与导航栏的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1.3 理解IStatusBarService",
    stage: "恢复同输入重放",
    mechanism:
      "7.1.3 理解IStatusBarService在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.1.3 理解IStatusBarService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.1.4 SystemUI的体系结构",
    stage: "锁定历史基线",
    mechanism:
      "7.1.4 SystemUI的体系结构在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.1.4 SystemUI的体系结构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2 深入理解状态栏",
    stage: "复现正常轨迹",
    mechanism:
      "7.2 深入理解状态栏在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.2 深入理解状态栏的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.1 状态栏窗口的创建与控件树结构",
    stage: "注入单一故障",
    mechanism:
      "7.2.1 状态栏窗口的创建与控件树结构在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.2.1 状态栏窗口的创建与控件树结构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.2 通知信息的管理与显示",
    stage: "定位首个分叉",
    mechanism:
      "7.2.2 通知信息的管理与显示在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.2.2 通知信息的管理与显示的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.3 系统状态图标区的管理与显示",
    stage: "恢复同输入重放",
    mechanism:
      "7.2.3 系统状态图标区的管理与显示在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.2.3 系统状态图标区的管理与显示的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.2.4 状态栏总结",
    stage: "锁定历史基线",
    mechanism:
      "7.2.4 状态栏总结在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链排除只凭类名或流程图得出的结论。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.2.4 状态栏总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3 深入理解导航栏",
    stage: "复现正常轨迹",
    mechanism:
      "7.3 深入理解导航栏在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3 深入理解导航栏的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.1 导航栏的创建",
    stage: "注入单一故障",
    mechanism:
      "7.3.1 导航栏的创建在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3.1 导航栏的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.2 虚拟按键的工作原理",
    stage: "定位首个分叉",
    mechanism:
      "7.3.2 虚拟按键的工作原理在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3.2 虚拟按键的工作原理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.3 SearchPanel",
    stage: "恢复同输入重放",
    mechanism:
      "7.3.3 SearchPanel在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3.3 SearchPanel的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.4 关于导航栏的其他话题",
    stage: "锁定历史基线",
    mechanism:
      "7.3.4 关于导航栏的其他话题在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3.4 关于导航栏的其他话题的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.3.5 导航栏总结",
    stage: "复现正常轨迹",
    mechanism:
      "7.3.5 导航栏总结在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链排除只凭类名或流程图得出的结论。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.3.5 导航栏总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4 禁用状态栏与导航栏的功能",
    stage: "注入单一故障",
    mechanism:
      "7.4 禁用状态栏与导航栏的功能在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.4 禁用状态栏与导航栏的功能的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.1 如何禁用状态栏与导航栏的功能",
    stage: "定位首个分叉",
    mechanism:
      "7.4.1 如何禁用状态栏与导航栏的功能在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.4.1 如何禁用状态栏与导航栏的功能的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.2 StatusBarManagerService对禁用标记的维护",
    stage: "恢复同输入重放",
    mechanism:
      "7.4.2 StatusBarManagerService对禁用标记的维护在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.4.2 StatusBarManagerService对禁用标记的维护的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.4.3 状态栏与导航栏对禁用标记的响应",
    stage: "锁定历史基线",
    mechanism:
      "7.4.3 状态栏与导航栏对禁用标记的响应在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.4.3 状态栏与导航栏对禁用标记的响应的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5 理解SystemUIVisibility",
    stage: "复现正常轨迹",
    mechanism:
      "7.5 理解SystemUIVisibility在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.5 理解SystemUIVisibility的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.1 SystemUIVisibility在系统中的漫游过程",
    stage: "注入单一故障",
    mechanism:
      "7.5.1 SystemUIVisibility在系统中的漫游过程在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.5.1 SystemUIVisibility在系统中的漫游过程的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.2 SystemUIVisibility发挥作用",
    stage: "定位首个分叉",
    mechanism:
      "7.5.2 SystemUIVisibility发挥作用在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.5.2 SystemUIVisibility发挥作用的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.5.3 SystemUIVisibility总结",
    stage: "恢复同输入重放",
    mechanism:
      "7.5.3 SystemUIVisibility总结在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链排除只凭类名或流程图得出的结论。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.5.3 SystemUIVisibility总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "7.6 本章小结",
    stage: "锁定历史基线",
    mechanism:
      "7.6 本章小结在“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链排除只凭类名或流程图得出的结论。",
    probe:
      "使用SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链检查7.6 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷III / Android 4.2.2 / API 17"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-4.2.2_r1",
  sourcePath: "platform/frameworks/base @ android-4.2.2_r1",
  invariant:
    "在android-4.2.2_r1固定输入下，剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把SystemUI当普通应用页面，忽略系统服务控制、窗口类型与跨进程状态",
  evidence:
    "SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链",
  boundary:
    "剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播的第一个线程、进程、Binder、JNI或持久状态边界",
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
