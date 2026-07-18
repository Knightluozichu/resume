import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第5章 Android进程/线程管理",
  "5.1 Android进程和线程",
  "5.2 Handler、MessageQueue、Runnable与Looper",
  "5.3 UI主线程——ActivityThread",
  "5.4 Thread类",
  "5.4.1 Thread类的内部原理",
  "5.4.2 Thread休眠和唤醒",
  "5.4.3 Thread实例",
  "5.5 Android应用程序的典型启动流程"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第5章 Android进程/线程管理" focus="连接进程线程、Handler/MessageQueue/Runnable/Looper、ActivityThread、Thread内部与应用启动" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第5章 Android进程/线程管理" focus="把Handler等同于新线程，或忽略Looper所有者、消息屏障和进程创建边界" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第5章 Android进程/线程管理" focus="线程名、消息队列、唤醒、进程fork、主线程入口、Binder回调与启动时序" nodes={nodes}/>;}
