import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第2章 IPC机制",
  "2.1 Android IPC简介",
  "2.2 Android中的多进程模式",
  "2.2.1 开启多进程模式",
  "2.2.2 多进程模式的运行机制",
  "2.3 IPC基础概念介绍",
  "2.3.1 Serializable接口",
  "2.3.2 Parcelable接口",
  "2.3.3 Binder",
  "2.4 Android中的IPC方式",
  "2.4.1 使用Bundle",
  "2.4.2 使用文件共享",
  "2.4.3 使用Messenger",
  "2.4.4 使用AIDL",
  "2.4.5 使用ContentProvider",
  "2.4.6 使用Socket",
  "2.5 Binder连接池",
  "2.6 选用合适的IPC方式"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第2章 IPC机制" focus="比较多进程状态隔离、Serializable、Parcelable、Binder及六种IPC通道，并用Binder连接池管理服务" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第2章 IPC机制" focus="把内存单例当作跨进程共享状态，或在Binder线程直接修改主线程UI" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第2章 IPC机制" focus="进程边界图、序列化样本、Binder线程记录、故障矩阵、连接池和选型表" nodes={nodes} />; }
