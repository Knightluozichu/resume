import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第5章 多线程和同步",
  "5.1 线程",
  "5.2 AsyncTask",
  "5.3 Handler和Looper",
  "5.3.1 Handler",
  "5.3.2 Looper",
  "5.4 数据类型",
  "5.5 并发",
  "5.6 多核",
  "5.6.1 为多核修改算法",
  "5.6.2 使用并发缓存",
  "5.7 Activity生命周期",
  "5.7.1 传递信息",
  "5.7.2 记住状态",
  "5.8 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第5章 多线程和同步" focus="比较Thread、AsyncTask、Handler/Looper、并发容器与多核算法，并把结果交付绑定到Activity生命周期" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第5章 多线程和同步" focus="把后台线程等同于并行加速，或让AsyncTask、Handler和工作线程越过Activity销毁继续持有与回调UI" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第5章 多线程和同步" focus="线程时序、消息队列、锁竞争、多核加速比、状态保存、取消与迟到结果测试" nodes={nodes} />; }
