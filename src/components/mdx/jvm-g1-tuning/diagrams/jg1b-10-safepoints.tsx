import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第10章 线程中的安全点",
  "10.1 安全点的基本概念",
  "10.2 G1并发线程进入安全点",
  "10.3 解释线程进入安全点",
  "10.4 编译线程进入安全点",
  "10.5 正在执行本地代码的线程进入安全点",
  "10.6 安全点小结",
  "10.7 日志分析",
  "10.8 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第10章 线程中的安全点" focus="区分到达安全点的时间与安全点内工作，比较并发、解释、编译和本地代码线程的协作路径" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第10章 线程中的安全点" focus="制造长计数循环和本地调用，对比到达安全点时间与停顿内工作，再修改一个轮询或任务边界" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第10章 线程中的安全点" focus="线程到达图、TTSP与停顿拆分、轮询位置、JNI案例、安全点日志" nodes={nodes} />; }
