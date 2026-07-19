"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第8章 深入理解Android壁纸";
const focus = "连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略";
const nodes = [
  {
    label: "第8章 深入理解Android壁纸",
    stage: "固定输入与所有者",
    mechanism:
      "第8章 深入理解Android壁纸在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查第8章 深入理解Android壁纸的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.1 初识Android壁纸",
    stage: "触发系统请求",
    mechanism:
      "8.1 初识Android壁纸在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.1 初识Android壁纸的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2 深入理解动态壁纸",
    stage: "推进状态机",
    mechanism:
      "8.2 深入理解动态壁纸在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2 深入理解动态壁纸的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.1 启动动态壁纸的方法",
    stage: "观察反馈与释放",
    mechanism:
      "8.2.1 启动动态壁纸的方法在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2.1 启动动态壁纸的方法的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.2 壁纸服务的启动原理",
    stage: "复位后再次执行",
    mechanism:
      "8.2.2 壁纸服务的启动原理在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2.2 壁纸服务的启动原理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.3 理解updateSurface()方法",
    stage: "固定输入与所有者",
    mechanism:
      "8.2.3 理解updateSurface()方法在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2.3 理解updateSurface()方法的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.4 壁纸的销毁",
    stage: "触发系统请求",
    mechanism:
      "8.2.4 壁纸的销毁在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2.4 壁纸的销毁的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.5 理解Engine的回调",
    stage: "推进状态机",
    mechanism:
      "8.2.5 理解Engine的回调在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.2.5 理解Engine的回调的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3 深入理解静态壁纸——ImageWallpaper",
    stage: "观察反馈与释放",
    mechanism:
      "8.3 深入理解静态壁纸——ImageWallpaper在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.3 深入理解静态壁纸——ImageWallpaper的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.1 获取用作静态壁纸的位图",
    stage: "复位后再次执行",
    mechanism:
      "8.3.1 获取用作静态壁纸的位图在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.3.1 获取用作静态壁纸的位图的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.2 静态壁纸位图的设置",
    stage: "固定输入与所有者",
    mechanism:
      "8.3.2 静态壁纸位图的设置在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.3.2 静态壁纸位图的设置的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.3 连接静态壁纸的设置与获取——WallpaperObserver",
    stage: "触发系统请求",
    mechanism:
      "8.3.3 连接静态壁纸的设置与获取——WallpaperObserver在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.3.3 连接静态壁纸的设置与获取——WallpaperObserver的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4 WMS对壁纸窗口的特殊处理",
    stage: "推进状态机",
    mechanism:
      "8.4 WMS对壁纸窗口的特殊处理在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.4 WMS对壁纸窗口的特殊处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.1 壁纸窗口Z序的确定",
    stage: "观察反馈与释放",
    mechanism:
      "8.4.1 壁纸窗口Z序的确定在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.4.1 壁纸窗口Z序的确定的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.2 壁纸窗口的可见性",
    stage: "复位后再次执行",
    mechanism:
      "8.4.2 壁纸窗口的可见性在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.4.2 壁纸窗口的可见性的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.3 壁纸窗口的动画",
    stage: "固定输入与所有者",
    mechanism:
      "8.4.3 壁纸窗口的动画在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.4.3 壁纸窗口的动画的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.4 壁纸窗口总结",
    stage: "触发系统请求",
    mechanism:
      "8.4.4 壁纸窗口总结在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.4.4 壁纸窗口总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5 本章小结",
    stage: "推进状态机",
    mechanism:
      "8.5 本章小结在“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态检查8.5 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.2.2_r1固定输入下，连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把静态壁纸当桌面背景位图，忽略服务、窗口和WMS特殊策略",
  evidence:
    "壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态",
  boundary:
    "连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略的第一个线程、进程、Binder、JNI或持久状态边界",
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
