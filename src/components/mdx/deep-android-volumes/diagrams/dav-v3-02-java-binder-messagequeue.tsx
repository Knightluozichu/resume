"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第2章 深入理解Java Binder和MessageQueue";
const focus = "以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询";
const nodes = [
  {
    label: "第2章 深入理解Java Binder和MessageQueue",
    stage: "锁定历史基线",
    mechanism:
      "第2章 深入理解Java Binder和MessageQueue在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查第2章 深入理解Java Binder和MessageQueue的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "2.1 概述在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件排除只凭类名或流程图得出的结论。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2 Java层中的Binder分析",
    stage: "注入单一故障",
    mechanism:
      "2.2 Java层中的Binder分析在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2 Java层中的Binder分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2.1 Binder架构总览",
    stage: "定位首个分叉",
    mechanism:
      "2.2.1 Binder架构总览在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2.1 Binder架构总览的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2.2 初始化Java层Binder框架",
    stage: "恢复同输入重放",
    mechanism:
      "2.2.2 初始化Java层Binder框架在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2.2 初始化Java层Binder框架的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2.3 窥一斑，可见全豹乎",
    stage: "锁定历史基线",
    mechanism:
      "2.2.3 窥一斑，可见全豹乎在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件复核。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2.3 窥一斑，可见全豹乎的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2.4 理解AIDL",
    stage: "复现正常轨迹",
    mechanism:
      "2.2.4 理解AIDL在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2.4 理解AIDL的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2.5 Java层Binder架构总结",
    stage: "注入单一故障",
    mechanism:
      "2.2.5 Java层Binder架构总结在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件排除只凭类名或流程图得出的结论。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.2.5 Java层Binder架构总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3 心系两界的MessageQueue",
    stage: "定位首个分叉",
    mechanism:
      "2.3 心系两界的MessageQueue在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.3 心系两界的MessageQueue的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.1 MessageQueue的创建",
    stage: "恢复同输入重放",
    mechanism:
      "2.3.1 MessageQueue的创建在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.3.1 MessageQueue的创建的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.2 提取消息",
    stage: "锁定历史基线",
    mechanism:
      "2.3.2 提取消息在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件复核。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.3.2 提取消息的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.3 nativePollOnce函数分析",
    stage: "复现正常轨迹",
    mechanism:
      "2.3.3 nativePollOnce函数分析在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.3.3 nativePollOnce函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.4 MessageQueue总结",
    stage: "注入单一故障",
    mechanism:
      "2.3.4 MessageQueue总结在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件排除只凭类名或流程图得出的结论。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.3.4 MessageQueue总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4 本章小结",
    stage: "定位首个分叉",
    mechanism:
      "2.4 本章小结在“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件排除只凭类名或流程图得出的结论。",
    probe:
      "使用BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件检查2.4 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-4.2.2_r1固定输入下，以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "直接复用卷II结论，忽略4.2.2源码变化与新增AIDL分析",
  evidence:
    "BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件",
  boundary:
    "以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询的第一个线程、进程、Binder、JNI或持久状态边界",
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
