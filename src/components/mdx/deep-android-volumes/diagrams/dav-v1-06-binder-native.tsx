"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第6章 深入理解Binder";
const focus =
  "从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端";
const nodes = [
  {
    label: "第6章 深入理解Binder",
    stage: "锁定历史基线",
    mechanism:
      "第6章 深入理解Binder在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查第6章 深入理解Binder的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "6.1 概述在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界排除只凭类名或流程图得出的结论。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2 庖丁解MediaServer",
    stage: "注入单一故障",
    mechanism:
      "6.2 庖丁解MediaServer在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界复核。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2 庖丁解MediaServer的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.1 MediaServer的入口函数",
    stage: "定位首个分叉",
    mechanism:
      "6.2.1 MediaServer的入口函数在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界复核。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.1 MediaServer的入口函数的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.2 独一无二的ProcessState",
    stage: "恢复同输入重放",
    mechanism:
      "6.2.2 独一无二的ProcessState在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.2 独一无二的ProcessState的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.3 时空穿越魔术——defaultServiceManager",
    stage: "锁定历史基线",
    mechanism:
      "6.2.3 时空穿越魔术——defaultServiceManager在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.3 时空穿越魔术——defaultServiceManager的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.4 注册MediaPlayerService",
    stage: "复现正常轨迹",
    mechanism:
      "6.2.4 注册MediaPlayerService在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.4 注册MediaPlayerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.5 StartThreadPool和joinThreadPool分析",
    stage: "注入单一故障",
    mechanism:
      "6.2.5 StartThreadPool和joinThreadPool分析在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.5 StartThreadPool和joinThreadPool分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.2.6 你彻底明白了吗",
    stage: "定位首个分叉",
    mechanism:
      "6.2.6 你彻底明白了吗在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界排除只凭类名或流程图得出的结论。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.2.6 你彻底明白了吗的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3 服务总管ServiceManager",
    stage: "恢复同输入重放",
    mechanism:
      "6.3 服务总管ServiceManager在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.3 服务总管ServiceManager的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.1 ServiceManager的原理",
    stage: "锁定历史基线",
    mechanism:
      "6.3.1 ServiceManager的原理在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.3.1 ServiceManager的原理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.2 服务的注册",
    stage: "复现正常轨迹",
    mechanism:
      "6.3.2 服务的注册在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.3.2 服务的注册的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.3.3 ServiceManager存在的意义",
    stage: "注入单一故障",
    mechanism:
      "6.3.3 ServiceManager存在的意义在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.3.3 ServiceManager存在的意义的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4 MediaPlayerService和它的Client",
    stage: "定位首个分叉",
    mechanism:
      "6.4 MediaPlayerService和它的Client在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.4 MediaPlayerService和它的Client的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.1 查询ServiceManager",
    stage: "恢复同输入重放",
    mechanism:
      "6.4.1 查询ServiceManager在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.4.1 查询ServiceManager的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.4.2 子承父业",
    stage: "锁定历史基线",
    mechanism:
      "6.4.2 子承父业在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界复核。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.4.2 子承父业的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5 拓展思考",
    stage: "复现正常轨迹",
    mechanism:
      "6.5 拓展思考在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界排除只凭类名或流程图得出的结论。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.5 拓展思考的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.1 Binder和线程的关系",
    stage: "注入单一故障",
    mechanism:
      "6.5.1 Binder和线程的关系在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.5.1 Binder和线程的关系的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.2 死亡通知",
    stage: "定位首个分叉",
    mechanism:
      "6.5.2 死亡通知在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.5.2 死亡通知的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.5.3 匿名Service",
    stage: "恢复同输入重放",
    mechanism:
      "6.5.3 匿名Service在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.5.3 匿名Service的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6 学以致用",
    stage: "锁定历史基线",
    mechanism:
      "6.6 学以致用在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界复核。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.6 学以致用的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.1 纯Native的Service",
    stage: "复现正常轨迹",
    mechanism:
      "6.6.1 纯Native的Service在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.6.1 纯Native的Service的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.6.2 AIDL",
    stage: "注入单一故障",
    mechanism:
      "6.6.2 AIDL在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.6.2 AIDL的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "6.7 本章小结",
    stage: "定位首个分叉",
    mechanism:
      "6.7 本章小结在“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界排除只凭类名或流程图得出的结论。",
    probe:
      "使用设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界检查6.7 本章小结的输入、状态变化、错误出口和释放结果",
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
    "在android-2.2_r1固定输入下，从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只讲一次拷贝或Proxy/Stub，遗漏服务发现、线程池与引用语义",
  evidence:
    "设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界",
  boundary:
    "从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端的第一个线程、进程、Binder、JNI或持久状态边界",
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
