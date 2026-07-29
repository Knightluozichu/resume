"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第5章 深入理解Android输入系统";
const focus =
  "贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈";
const nodes = [
  {
    label: "第5章 深入理解Android输入系统",
    stage: "锁定历史基线",
    mechanism:
      "第5章 深入理解Android输入系统在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查第5章 深入理解Android输入系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1 初识Android输入系统",
    stage: "复现正常轨迹",
    mechanism:
      "5.1 初识Android输入系统在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时排除只凭类名或流程图得出的结论。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.1 初识Android输入系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1.1 getevent与sendevent工具",
    stage: "注入单一故障",
    mechanism:
      "5.1.1 getevent与sendevent工具在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.1.1 getevent与sendevent工具的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1.2 Android输入系统简介",
    stage: "定位首个分叉",
    mechanism:
      "5.1.2 Android输入系统简介在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.1.2 Android输入系统简介的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1.3 IMS的构成",
    stage: "恢复同输入重放",
    mechanism:
      "5.1.3 IMS的构成在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.1.3 IMS的构成的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2 原始事件的读取与加工",
    stage: "锁定历史基线",
    mechanism:
      "5.2 原始事件的读取与加工在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2 原始事件的读取与加工的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.1 基础知识：INotify与Epoll",
    stage: "复现正常轨迹",
    mechanism:
      "5.2.1 基础知识：INotify与Epoll在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2.1 基础知识：INotify与Epoll的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.2 InputReader的总体流程",
    stage: "注入单一故障",
    mechanism:
      "5.2.2 InputReader的总体流程在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2.2 InputReader的总体流程的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.3 深入理解EventHub",
    stage: "定位首个分叉",
    mechanism:
      "5.2.3 深入理解EventHub在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2.3 深入理解EventHub的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.4 深入理解InputReader",
    stage: "恢复同输入重放",
    mechanism:
      "5.2.4 深入理解InputReader在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2.4 深入理解InputReader的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.5 原始事件的读取与加工总结",
    stage: "锁定历史基线",
    mechanism:
      "5.2.5 原始事件的读取与加工总结在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时排除只凭类名或流程图得出的结论。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.2.5 原始事件的读取与加工总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3 输入事件的派发",
    stage: "复现正常轨迹",
    mechanism:
      "5.3 输入事件的派发在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.3 输入事件的派发的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.1 通用事件派发流程",
    stage: "注入单一故障",
    mechanism:
      "5.3.1 通用事件派发流程在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.3.1 通用事件派发流程的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.2 按键事件的派发",
    stage: "定位首个分叉",
    mechanism:
      "5.3.2 按键事件的派发在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.3.2 按键事件的派发的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.3 DispatcherPolicy与InputFilter",
    stage: "恢复同输入重放",
    mechanism:
      "5.3.3 DispatcherPolicy与InputFilter在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.3.3 DispatcherPolicy与InputFilter的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.4 输入事件的派发总结",
    stage: "锁定历史基线",
    mechanism:
      "5.3.4 输入事件的派发总结在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时排除只凭类名或流程图得出的结论。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.3.4 输入事件的派发总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4 输入事件的发送、接收与反馈",
    stage: "复现正常轨迹",
    mechanism:
      "5.4 输入事件的发送、接收与反馈在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4 输入事件的发送、接收与反馈的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.1 深入理解InputChannel",
    stage: "注入单一故障",
    mechanism:
      "5.4.1 深入理解InputChannel在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.1 深入理解InputChannel的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.2 连接InputDispatcher和窗口",
    stage: "定位首个分叉",
    mechanism:
      "5.4.2 连接InputDispatcher和窗口在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.2 连接InputDispatcher和窗口的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.3 事件的发送",
    stage: "恢复同输入重放",
    mechanism:
      "5.4.3 事件的发送在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.3 事件的发送的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.4 事件的接收",
    stage: "锁定历史基线",
    mechanism:
      "5.4.4 事件的接收在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.4 事件的接收的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.5 事件的反馈与发送循环",
    stage: "复现正常轨迹",
    mechanism:
      "5.4.5 事件的反馈与发送循环在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.5 事件的反馈与发送循环的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.6 输入事件的发送、接收与反馈总结",
    stage: "注入单一故障",
    mechanism:
      "5.4.6 输入事件的发送、接收与反馈总结在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时排除只凭类名或流程图得出的结论。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.4.6 输入事件的发送、接收与反馈总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5 关于输入系统的其他重要话题",
    stage: "定位首个分叉",
    mechanism:
      "5.5 关于输入系统的其他重要话题在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.5 关于输入系统的其他重要话题的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.1 输入事件ANR的产生",
    stage: "恢复同输入重放",
    mechanism:
      "5.5.1 输入事件ANR的产生在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.5.1 输入事件ANR的产生的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.2 焦点窗口的确定",
    stage: "锁定历史基线",
    mechanism:
      "5.5.2 焦点窗口的确定在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.5.2 焦点窗口的确定的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5.3 以软件方式模拟用户操作",
    stage: "复现正常轨迹",
    mechanism:
      "5.5.3 以软件方式模拟用户操作在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.5.3 以软件方式模拟用户操作的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.6 本章小结",
    stage: "注入单一故障",
    mechanism:
      "5.6 本章小结在“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时排除只凭类名或流程图得出的结论。",
    probe:
      "使用event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时检查5.6 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.2.2_r1固定输入下，贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只追踪触摸到View，遗漏设备发现、策略过滤、反馈和超时状态",
  evidence:
    "event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时",
  boundary:
    "贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈的第一个线程、进程、Binder、JNI或持久状态边界",
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
