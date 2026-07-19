"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第5章 深入理解常见类";
const focus =
  "用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型";
const nodes = [
  {
    label: "第5章 深入理解常见类",
    stage: "锁定历史基线",
    mechanism:
      "第5章 深入理解常见类在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查第5章 深入理解常见类的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "5.1 概述在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间排除只凭类名或流程图得出的结论。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2 以“三板斧”揭秘RefBase、sp和wp",
    stage: "注入单一故障",
    mechanism:
      "5.2 以“三板斧”揭秘RefBase、sp和wp在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2 以“三板斧”揭秘RefBase、sp和wp的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.1 第一板斧——初识影子对象",
    stage: "定位首个分叉",
    mechanism:
      "5.2.1 第一板斧——初识影子对象在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间排除只凭类名或流程图得出的结论。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2.1 第一板斧——初识影子对象的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.2 第二板斧——由弱生强",
    stage: "恢复同输入重放",
    mechanism:
      "5.2.2 第二板斧——由弱生强在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2.2 第二板斧——由弱生强的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.3 第三板斧——破解生死魔咒",
    stage: "锁定历史基线",
    mechanism:
      "5.2.3 第三板斧——破解生死魔咒在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2.3 第三板斧——破解生死魔咒的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.4 轻量级的引用计数控制类LightRefBase",
    stage: "复现正常轨迹",
    mechanism:
      "5.2.4 轻量级的引用计数控制类LightRefBase在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2.4 轻量级的引用计数控制类LightRefBase的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.2.5 题外话——三板斧的来历",
    stage: "注入单一故障",
    mechanism:
      "5.2.5 题外话——三板斧的来历在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.2.5 题外话——三板斧的来历的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3 Thread类及常用同步类分析",
    stage: "定位首个分叉",
    mechanism:
      "5.3 Thread类及常用同步类分析在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.3 Thread类及常用同步类分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.1 一个变量引发的思考",
    stage: "恢复同输入重放",
    mechanism:
      "5.3.1 一个变量引发的思考在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.3.1 一个变量引发的思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.3.2 常用同步类",
    stage: "锁定历史基线",
    mechanism:
      "5.3.2 常用同步类在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间复核。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.3.2 常用同步类的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4 Looper和Handler类分析",
    stage: "复现正常轨迹",
    mechanism:
      "5.4 Looper和Handler类分析在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.4 Looper和Handler类分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.1 Looper类分析",
    stage: "注入单一故障",
    mechanism:
      "5.4.1 Looper类分析在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.4.1 Looper类分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.2 Handler分析",
    stage: "定位首个分叉",
    mechanism:
      "5.4.2 Handler分析在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.4.2 Handler分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.3 Looper和Handler的同步关系",
    stage: "恢复同输入重放",
    mechanism:
      "5.4.3 Looper和Handler的同步关系在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.4.3 Looper和Handler的同步关系的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.4.4 HandlerThread介绍",
    stage: "锁定历史基线",
    mechanism:
      "5.4.4 HandlerThread介绍在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.4.4 HandlerThread介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "5.5 本章小结",
    stage: "复现正常轨迹",
    mechanism:
      "5.5 本章小结在“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间排除只凭类名或流程图得出的结论。",
    probe:
      "使用强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间检查5.5 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-2.2_r1固定输入下，用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把sp等同标准智能指针，或把Handler误认为自动创建工作线程",
  evidence:
    "强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间",
  boundary:
    "用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型的第一个线程、进程、Binder、JNI或持久状态边界",
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
