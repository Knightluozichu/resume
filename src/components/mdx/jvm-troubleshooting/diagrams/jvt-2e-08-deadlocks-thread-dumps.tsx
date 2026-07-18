import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "8 Investigating deadlocks with thread dumps",
  "8.1 Getting a thread dump",
  "8.1.1 Getting a thread dump using a profiler",
  "8.1.2 Generating a thread dump from the command line",
  "8.2 Reading thread dumps",
  "8.2.1 Reading plain-text thread dumps",
  "8.2.2 Using tools to better grasp thread dumps",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第8章 用线程转储调查死锁" focus="用剖析器或命令行获取多份线程转储，读取线程、栈、监视器与等待边，构建死锁环并验证修复" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第8章 用线程转储调查死锁" focus="构造两个反向锁序线程，连续采集三份转储并验证环稳定存在；统一顺序后重复压力测试" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第8章 用线程转储调查死锁" focus="原始转储、线程到锁表、等待环、统一锁序、修复前后压力测试" nodes={nodes} />;
}
