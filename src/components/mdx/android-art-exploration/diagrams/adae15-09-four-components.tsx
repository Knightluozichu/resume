import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第9章 四大组件的工作过程",
  "9.1 四大组件的运行状态",
  "9.2 Activity的工作过程",
  "9.3 Service的工作过程",
  "9.3.1 Service的启动过程",
  "9.3.2 Service的绑定过程",
  "9.4 BroadcastReceiver的工作过程",
  "9.4.1 广播的注册过程",
  "9.4.2 广播的发送和接收过程",
  "9.5 ContentProvider的工作过程"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第9章 四大组件的工作过程" focus="从应用进程到AMS与Binder调用链追踪Activity、Service、BroadcastReceiver和ContentProvider的启动与调度" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第9章 四大组件的工作过程" focus="把四大组件都当作本地Java对象调用，忽略AMS调度、进程边界和主线程回调" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第9章 四大组件的工作过程" focus="四组件状态表、进程启动图、Binder时序、注册/发送轨迹、Provider初始化和失败点" nodes={nodes} />; }
