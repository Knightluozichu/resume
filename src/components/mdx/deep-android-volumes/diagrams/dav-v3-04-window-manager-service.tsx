"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第4章 深入理解WindowManagerService";
const focus = "以窗口管理结构、Z序、布局与动画交替循环解释WMS";
const nodes = [
  {
    label: "第4章 深入理解WindowManagerService",
    stage: "固定输入与所有者",
    mechanism:
      "第4章 深入理解WindowManagerService在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查第4章 深入理解WindowManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1 初识WindowManagerService",
    stage: "触发系统请求",
    mechanism:
      "4.1 初识WindowManagerService在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.1 初识WindowManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1.1 一个从命令行启动的动画窗口",
    stage: "推进状态机",
    mechanism:
      "4.1.1 一个从命令行启动的动画窗口在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.1.1 一个从命令行启动的动画窗口的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1.2 WMS的构成",
    stage: "观察反馈与释放",
    mechanism:
      "4.1.2 WMS的构成在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态复核。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.1.2 WMS的构成的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1.3 初识WMS的小结",
    stage: "复位后再次执行",
    mechanism:
      "4.1.3 初识WMS的小结在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.1.3 初识WMS的小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2 WMS的窗口管理结构",
    stage: "固定输入与所有者",
    mechanism:
      "4.2 WMS的窗口管理结构在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.2 WMS的窗口管理结构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.1 理解WindowToken",
    stage: "触发系统请求",
    mechanism:
      "4.2.1 理解WindowToken在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.2.1 理解WindowToken的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.2 理解WindowState",
    stage: "推进状态机",
    mechanism:
      "4.2.2 理解WindowState在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.2.2 理解WindowState的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2.3 理解DisplayContent",
    stage: "观察反馈与释放",
    mechanism:
      "4.2.3 理解DisplayContent在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.2.3 理解DisplayContent的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3 理解窗口的显示次序",
    stage: "复位后再次执行",
    mechanism:
      "4.3 理解窗口的显示次序在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.3 理解窗口的显示次序的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.1 主序、子序和窗口类型",
    stage: "固定输入与所有者",
    mechanism:
      "4.3.1 主序、子序和窗口类型在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.3.1 主序、子序和窗口类型的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.2 通过主序与子序确定窗口的次序",
    stage: "触发系统请求",
    mechanism:
      "4.3.2 通过主序与子序确定窗口的次序在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.3.2 通过主序与子序确定窗口的次序的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.3 更新显示次序到Surface",
    stage: "推进状态机",
    mechanism:
      "4.3.3 更新显示次序到Surface在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.3.3 更新显示次序到Surface的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.4 关于显示次序的小结",
    stage: "观察反馈与释放",
    mechanism:
      "4.3.4 关于显示次序的小结在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.3.4 关于显示次序的小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4 窗口的布局",
    stage: "复位后再次执行",
    mechanism:
      "4.4 窗口的布局在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4 窗口的布局的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.1 从relayoutWindow()开始",
    stage: "固定输入与所有者",
    mechanism:
      "4.4.1 从relayoutWindow()开始在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.1 从relayoutWindow()开始的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.2 布局操作的外围代码分析",
    stage: "触发系统请求",
    mechanism:
      "4.4.2 布局操作的外围代码分析在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.2 布局操作的外围代码分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.3 初探performLayoutAndPlaceSurfacesLockedInner()",
    stage: "推进状态机",
    mechanism:
      "4.4.3 初探performLayoutAndPlaceSurfacesLockedInner()在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.3 初探performLayoutAndPlaceSurfacesLockedInner()的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.4 布局的前期处理",
    stage: "观察反馈与释放",
    mechanism:
      "4.4.4 布局的前期处理在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.4 布局的前期处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.5 布局DisplayContent",
    stage: "复位后再次执行",
    mechanism:
      "4.4.5 布局DisplayContent在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.5 布局DisplayContent的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.6 布局的最终阶段",
    stage: "固定输入与所有者",
    mechanism:
      "4.4.6 布局的最终阶段在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.4.6 布局的最终阶段的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5 WMS的动画系统",
    stage: "触发系统请求",
    mechanism:
      "4.5 WMS的动画系统在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5 WMS的动画系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.1 Android动画原理简介",
    stage: "推进状态机",
    mechanism:
      "4.5.1 Android动画原理简介在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.1 Android动画原理简介的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.2 WMS的动画系统框架",
    stage: "观察反馈与释放",
    mechanism:
      "4.5.2 WMS的动画系统框架在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.2 WMS的动画系统框架的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.3 WindowAnimator分析",
    stage: "复位后再次执行",
    mechanism:
      "4.5.3 WindowAnimator分析在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.3 WindowAnimator分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.4 深入理解窗口动画",
    stage: "固定输入与所有者",
    mechanism:
      "4.5.4 深入理解窗口动画在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.4 深入理解窗口动画的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.5 交替运行的布局系统与动画系统",
    stage: "触发系统请求",
    mechanism:
      "4.5.5 交替运行的布局系统与动画系统在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.5 交替运行的布局系统与动画系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.6 动画系统总结",
    stage: "推进状态机",
    mechanism:
      "4.5.6 动画系统总结在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.5.6 动画系统总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.6 本章小结",
    stage: "观察反馈与释放",
    mechanism:
      "4.6 本章小结在“以窗口管理结构、Z序、布局与动画交替循环解释WMS”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态检查4.6 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷III / Android 4.2.2 / API 17"];
const stages = [
  "固定输入与所有者",
  "触发系统请求",
  "推进状态机",
  "观察反馈与释放",
  "复位后再次执行",
];
const model = {
  sourceTag: "android-4.2.2_r1",
  sourcePath: "platform/frameworks/base @ android-4.2.2_r1",
  invariant:
    "在android-4.2.2_r1固定输入下，以窗口管理结构、Z序、布局与动画交替循环解释WMS的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把WMS当View布局器，忽略窗口令牌、显示层级、Surface和动画状态",
  evidence:
    "WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态",
  boundary:
    "以窗口管理结构、Z序、布局与动画交替循环解释WMS的第一个线程、进程、Binder、JNI或持久状态边界",
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
