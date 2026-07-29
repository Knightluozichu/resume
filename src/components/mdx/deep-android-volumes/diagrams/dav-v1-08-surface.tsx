"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第8章 深入理解Surface系统";
const focus =
  "连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成";
const nodes = [
  {
    label: "第8章 深入理解Surface系统",
    stage: "固定输入与所有者",
    mechanism:
      "第8章 深入理解Surface系统在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查第8章 深入理解Surface系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.1 概述",
    stage: "触发系统请求",
    mechanism:
      "8.1 概述在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2 一个Activity的显示",
    stage: "推进状态机",
    mechanism:
      "8.2 一个Activity的显示在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.2 一个Activity的显示的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.1 Activity的创建",
    stage: "观察反馈与释放",
    mechanism:
      "8.2.1 Activity的创建在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.2.1 Activity的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.2 Activity的UI绘制",
    stage: "复位后再次执行",
    mechanism:
      "8.2.2 Activity的UI绘制在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.2.2 Activity的UI绘制的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.2.3 关于Activity的总结",
    stage: "固定输入与所有者",
    mechanism:
      "8.2.3 关于Activity的总结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.2.3 关于Activity的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3 初识Surface",
    stage: "触发系统请求",
    mechanism:
      "8.3 初识Surface在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3 初识Surface的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.1 和Surface有关的流程总结",
    stage: "推进状态机",
    mechanism:
      "8.3.1 和Surface有关的流程总结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3.1 和Surface有关的流程总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.2 Surface之乾坤大挪移",
    stage: "观察反馈与释放",
    mechanism:
      "8.3.2 Surface之乾坤大挪移在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3.2 Surface之乾坤大挪移的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.3 乾坤大挪移的JNI层分析",
    stage: "复位后再次执行",
    mechanism:
      "8.3.3 乾坤大挪移的JNI层分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3.3 乾坤大挪移的JNI层分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.4 Surface和画图",
    stage: "固定输入与所有者",
    mechanism:
      "8.3.4 Surface和画图在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3.4 Surface和画图的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.3.5 初识Surface小结",
    stage: "触发系统请求",
    mechanism:
      "8.3.5 初识Surface小结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.3.5 初识Surface小结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4 深入分析Surface",
    stage: "推进状态机",
    mechanism:
      "8.4 深入分析Surface在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4 深入分析Surface的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.1 与Surface相关的基础知识介绍",
    stage: "观察反馈与释放",
    mechanism:
      "8.4.1 与Surface相关的基础知识介绍在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.1 与Surface相关的基础知识介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.2 SurfaceComposerClient分析",
    stage: "复位后再次执行",
    mechanism:
      "8.4.2 SurfaceComposerClient分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.2 SurfaceComposerClient分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.3 SurfaceControl分析",
    stage: "固定输入与所有者",
    mechanism:
      "8.4.3 SurfaceControl分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.3 SurfaceControl分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.4 writeToParcel和Surface对象的创建",
    stage: "触发系统请求",
    mechanism:
      "8.4.4 writeToParcel和Surface对象的创建在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.4 writeToParcel和Surface对象的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.5 lockCanvas和unlockCanvasAndPost分析",
    stage: "推进状态机",
    mechanism:
      "8.4.5 lockCanvas和unlockCanvasAndPost分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.5 lockCanvas和unlockCanvasAndPost分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.6 GraphicBuffer介绍",
    stage: "观察反馈与释放",
    mechanism:
      "8.4.6 GraphicBuffer介绍在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.6 GraphicBuffer介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.4.7 深入分析Surface的总结",
    stage: "复位后再次执行",
    mechanism:
      "8.4.7 深入分析Surface的总结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.4.7 深入分析Surface的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5 SurfaceFlinger分析",
    stage: "固定输入与所有者",
    mechanism:
      "8.5 SurfaceFlinger分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.5 SurfaceFlinger分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5.1 SurfaceFlinger的诞生",
    stage: "触发系统请求",
    mechanism:
      "8.5.1 SurfaceFlinger的诞生在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.5.1 SurfaceFlinger的诞生的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5.2 SurfaceFlinger工作线程分析",
    stage: "推进状态机",
    mechanism:
      "8.5.2 SurfaceFlinger工作线程分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.5.2 SurfaceFlinger工作线程分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5.3 Transaction分析",
    stage: "观察反馈与释放",
    mechanism:
      "8.5.3 Transaction分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.5.3 Transaction分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.5.4 关于SurfaceFlinger的总结",
    stage: "复位后再次执行",
    mechanism:
      "8.5.4 关于SurfaceFlinger的总结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.5.4 关于SurfaceFlinger的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.6 拓展思考",
    stage: "固定输入与所有者",
    mechanism:
      "8.6 拓展思考在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.6 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.6.1 Surface系统的CB对象分析",
    stage: "触发系统请求",
    mechanism:
      "8.6.1 Surface系统的CB对象分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.6.1 Surface系统的CB对象分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.6.2 ViewRoot的你问我答",
    stage: "推进状态机",
    mechanism:
      "8.6.2 ViewRoot的你问我答在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.6.2 ViewRoot的你问我答的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.6.3 LayerBuffer分析",
    stage: "观察反馈与释放",
    mechanism:
      "8.6.3 LayerBuffer分析在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.6.3 LayerBuffer分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "8.7 本章小结",
    stage: "复位后再次执行",
    mechanism:
      "8.7 本章小结在“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧检查8.7 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-2.2_r1固定输入下，连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把Surface当Canvas别名，忽略跨进程对象、缓冲区所有权和合成时序",
  evidence:
    "窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧",
  boundary:
    "连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成的第一个线程、进程、Binder、JNI或持久状态边界",
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
