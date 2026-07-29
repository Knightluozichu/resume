"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第6章 深入理解控件系统";
const focus =
  "连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口";
const nodes = [
  {
    label: "第6章 深入理解控件系统",
    stage: "固定输入与所有者",
    mechanism:
      "第6章 深入理解控件系统在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查第6章 深入理解控件系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.1 初识Android的控件系统",
    stage: "触发系统请求",
    mechanism:
      "6.1 初识Android的控件系统在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.1 初识Android的控件系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.1.1 另一种创建窗口的方法",
    stage: "推进状态机",
    mechanism:
      "6.1.1 另一种创建窗口的方法在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.1.1 另一种创建窗口的方法的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.1.2 控件系统的组成",
    stage: "观察反馈与释放",
    mechanism:
      "6.1.2 控件系统的组成在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.1.2 控件系统的组成的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2 深入理解WindowManager",
    stage: "复位后再次执行",
    mechanism:
      "6.2 深入理解WindowManager在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2 深入理解WindowManager的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.1 WindowManager的创建与体系结构",
    stage: "固定输入与所有者",
    mechanism:
      "6.2.1 WindowManager的创建与体系结构在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2.1 WindowManager的创建与体系结构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.2 通过WindowManagerGlobal添加窗口",
    stage: "触发系统请求",
    mechanism:
      "6.2.2 通过WindowManagerGlobal添加窗口在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2.2 通过WindowManagerGlobal添加窗口的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.3 更新窗口的布局",
    stage: "推进状态机",
    mechanism:
      "6.2.3 更新窗口的布局在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2.3 更新窗口的布局的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.4 删除窗口",
    stage: "观察反馈与释放",
    mechanism:
      "6.2.4 删除窗口在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2.4 删除窗口的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.5 WindowManager的总结",
    stage: "复位后再次执行",
    mechanism:
      "6.2.5 WindowManager的总结在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.2.5 WindowManager的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3 深入理解ViewRootImpl",
    stage: "固定输入与所有者",
    mechanism:
      "6.3 深入理解ViewRootImpl在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.3 深入理解ViewRootImpl的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.1 ViewRootImpl的创建及其重要成员",
    stage: "触发系统请求",
    mechanism:
      "6.3.1 ViewRootImpl的创建及其重要成员在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.3.1 ViewRootImpl的创建及其重要成员的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.2 控件系统的心跳：performTraversals()",
    stage: "推进状态机",
    mechanism:
      "6.3.2 控件系统的心跳：performTraversals()在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.3.2 控件系统的心跳：performTraversals()的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.3 ViewRootImpl总结",
    stage: "观察反馈与释放",
    mechanism:
      "6.3.3 ViewRootImpl总结在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.3.3 ViewRootImpl总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4 深入理解控件树的绘制",
    stage: "复位后再次执行",
    mechanism:
      "6.4 深入理解控件树的绘制在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4 深入理解控件树的绘制的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.1 理解Canvas",
    stage: "固定输入与所有者",
    mechanism:
      "6.4.1 理解Canvas在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.1 理解Canvas的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.2 View.invalidate()与脏区域",
    stage: "触发系统请求",
    mechanism:
      "6.4.2 View.invalidate()与脏区域在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.2 View.invalidate()与脏区域的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.3 开始绘制",
    stage: "推进状态机",
    mechanism:
      "6.4.3 开始绘制在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.3 开始绘制的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.4 软件绘制的原理",
    stage: "观察反馈与释放",
    mechanism:
      "6.4.4 软件绘制的原理在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.4 软件绘制的原理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.5 硬件加速绘制的原理",
    stage: "复位后再次执行",
    mechanism:
      "6.4.5 硬件加速绘制的原理在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.5 硬件加速绘制的原理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.6 使用绘图缓存",
    stage: "固定输入与所有者",
    mechanism:
      "6.4.6 使用绘图缓存在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.6 使用绘图缓存的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.7 控件动画",
    stage: "触发系统请求",
    mechanism:
      "6.4.7 控件动画在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.7 控件动画的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.8 绘制控件树的总结",
    stage: "推进状态机",
    mechanism:
      "6.4.8 绘制控件树的总结在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.4.8 绘制控件树的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5 深入理解输入事件的派发",
    stage: "观察反馈与释放",
    mechanism:
      "6.5 深入理解输入事件的派发在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5 深入理解输入事件的派发的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.1 触摸模式",
    stage: "复位后再次执行",
    mechanism:
      "6.5.1 触摸模式在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.1 触摸模式的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.2 控件焦点",
    stage: "固定输入与所有者",
    mechanism:
      "6.5.2 控件焦点在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.2 控件焦点的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.3 输入事件派发的综述",
    stage: "触发系统请求",
    mechanism:
      "6.5.3 输入事件派发的综述在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.3 输入事件派发的综述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.4 按键事件的派发",
    stage: "推进状态机",
    mechanism:
      "6.5.4 按键事件的派发在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.4 按键事件的派发的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.5 触摸事件的派发",
    stage: "观察反馈与释放",
    mechanism:
      "6.5.5 触摸事件的派发在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.5 触摸事件的派发的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.6 输入事件派发的总结",
    stage: "复位后再次执行",
    mechanism:
      "6.5.6 输入事件派发的总结在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.5.6 输入事件派发的总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6 Activity与控件系统",
    stage: "固定输入与所有者",
    mechanism:
      "6.6 Activity与控件系统在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.6 Activity与控件系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.1 理解PhoneWindow",
    stage: "触发系统请求",
    mechanism:
      "6.6.1 理解PhoneWindow在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.6.1 理解PhoneWindow的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.2 Activity窗口的创建与显示",
    stage: "推进状态机",
    mechanism:
      "6.6.2 Activity窗口的创建与显示在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.6.2 Activity窗口的创建与显示的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7 本章小结",
    stage: "观察反馈与释放",
    mechanism:
      "6.7 本章小结在“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow排除只凭类名或流程图得出的结论。",
    probe:
      "使用窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow检查6.7 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.2.2_r1固定输入下，连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只讲View三大流程，遗漏窗口会话、渲染后端和输入反馈闭环",
  evidence:
    "窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow",
  boundary:
    "连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口的第一个线程、进程、Binder、JNI或持久状态边界",
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
