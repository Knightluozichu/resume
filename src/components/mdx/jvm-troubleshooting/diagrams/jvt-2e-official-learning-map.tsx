import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Part 1 Revisiting the foundation for code investigation",
  "1 Starting to know your apps",
  "2 Understanding your app’s logic through debugging techniques",
  "3 Finding problem root causes using advanced debugging techniques",
  "4 Making the most of logs: Auditing an app’s behavior",
  "Part 2 Deep diagnosing an app’s execution",
  "5 Identifying resource consumption problems using profiling techniques",
  "6 Finding hidden problems using profiling techniques",
  "7 Investigating locks in multithreaded architectures",
  "8 Investigating deadlocks with thread dumps",
  "Part 3 Diagnosing memory-related problems",
  "9 Profiling memory-related problems",
  "10 Investigating memory problems with heap dumps",
  "11 Analyzing potential JVM problems with GC logs",
  "Part 4 Finding problems in large systems",
  "12 Uncovering system-level failures and service communication problems",
  "13 Measuring data consistency and transactions",
  "Appendices",
  "Appendix A: Tools you’ll need",
  "Appendix B: Opening a project",
  "Appendix C: Recommended further reading",
  "Appendix D: Understanding Java threads",
  "Appendix E: Memory management in Java apps",
  "Appendix F: references"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="《Troubleshooting Java（第2版）》权威学习地图" focus="沿4个Part、13章和6个附录建立从单进程代码调查到大型系统一致性的完整证据路径" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="《Troubleshooting Java（第2版）》权威学习地图" focus="为意外输出、死锁、内存增长和跨服务不一致各选择一条最短学习路径并说明停止条件" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="《Troubleshooting Java（第2版）》权威学习地图" focus="138节点覆盖矩阵、诊断选择树、学习依赖图、全书证据清单" nodes={nodes} />;
}
