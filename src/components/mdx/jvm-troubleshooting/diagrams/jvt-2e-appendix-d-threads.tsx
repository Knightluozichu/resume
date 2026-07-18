import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix D: Understanding Java threads",
  "D.1 What is a thread?",
  "D.2 A thread’s life cycle",
  "D.3 Synchronizing threads",
  "D.3.1 Synchronized blocks",
  "D.3.2 Using wait(), notify(), and notifyAll()",
  "D.3.3 Joining threads",
  "D.3.4 Blocking threads for a defined time",
  "D.3.5 Synchronizing threads with blocking objects",
  "D.4 Common problems in multithreaded architectures",
  "D.4.1 Race conditions",
  "D.4.2 Deadlocks",
  "D.4.3 Livelocks",
  "D.4.4 Starvation",
  "D.5 Further reading"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录D 理解Java线程" focus="掌握线程生命周期、同步、等待通知、join、定时阻塞和并发工具，并区分竞态、死锁、活锁与饥饿" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录D 理解Java线程" focus="分别构造竞态、死锁、活锁和饥饿，记录状态序列与终止条件，再用正确同步原语修复" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录D 理解Java线程" focus="线程状态图、共享不变量、锁序、等待条件循环、四类并发故障测试" nodes={nodes} />;
}
