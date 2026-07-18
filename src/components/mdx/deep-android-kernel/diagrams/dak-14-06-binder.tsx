import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第6章 进程间通信——Binder",
  "6.1 智能指针",
  "6.1.1 智能指针的设计理念",
  "6.1.2 强指针sp",
  "6.1.3 弱指针wp",
  "6.2 进程间的数据传递载体——Parcel",
  "6.3 Binder驱动与协议",
  "6.3.1 打开Binder驱动——binder_open",
  "6.3.2 binder_mmap",
  "6.3.3 binder_ioctl",
  "6.4 DNS服务器——ServiceManager（Binder Server）",
  "6.4.1 ServiceManager的启动",
  "6.4.2 ServiceManager的构建",
  "6.4.3 获取ServiceManager服务——设计思考",
  "6.4.4 ServiceManagerProxy",
  "6.4.5 IBinder和BpBinder",
  "6.4.6 ProcessState和IPCThreadState",
  "6.5 Binder客户端——Binder Client",
  "6.6 Android接口描述语言——AIDL",
  "6.7 匿名Binder Server"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第6章 进程间通信——Binder" focus="从智能指针与Parcel进入Binder驱动协议、ServiceManager、客户端、AIDL和匿名服务" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第6章 进程间通信——Binder" focus="只画代理和服务两端，遗漏驱动映射、Parcel校验、线程池、引用计数和死亡处理" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第6章 进程间通信——Binder" focus="sp/wp引用计数、Parcel边界、binder_open/mmap/ioctl、事务码、线程池与死亡通知" nodes={nodes}/>;}
