import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第4章 多线程编程",
  "4.1 线程基础",
  "4.1.1 进程与线程",
  "4.1.2 线程的状态",
  "4.1.3 创建线程",
  "4.1.4 理解中断",
  "4.1.5 安全地终止线程",
  "4.2 同步",
  "4.2.1 重入锁与条件对象",
  "4.2.2 同步方法",
  "4.2.3 同步代码块",
  "4.2.4 volatile",
  "4.3 阻塞队列",
  "4.3.1 阻塞队列简介",
  "4.3.2 Java中的阻塞队列",
  "4.3.3 阻塞队列的实现原理",
  "4.3.4 阻塞队列的使用场景",
  "4.4 线程池",
  "4.4.1 ThreadPoolExecutor",
  "4.4.2 线程池的处理流程和原理",
  "4.4.3 线程池的种类",
  "4.5 AsyncTask的原理",
  "4.6 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第4章 多线程编程" focus="从线程状态、中断和安全终止进入锁、条件、同步、volatile、阻塞队列、线程池并解析Android 7.0 AsyncTask" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第4章 多线程编程" focus="用volatile替代复合操作同步，或让无界队列和AsyncTask越过页面生命周期继续工作" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第4章 多线程编程" focus="线程状态轨迹、happens-before断言、锁竞争、队列容量、拒绝策略、取消与主线程回调日志" nodes={nodes} />; }
