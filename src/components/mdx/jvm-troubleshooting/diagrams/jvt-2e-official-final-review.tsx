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
  return <OfficialJvt2Lab mode="investigation" unitTitle="《Troubleshooting Java（第2版）》全书总复习" focus="用一次跨线程、内存和服务边界的综合事故答辩串联138个正式目录节点，并证明结论可复现可推翻" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="《Troubleshooting Java（第2版）》全书总复习" focus="随机抽取一个正式节点，将其嵌入综合事故，要求另一位读者仅凭档案重放并尝试推翻结论" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="《Troubleshooting Java（第2版）》全书总复习" focus="事故档案、假设演化、原始证据、修复对照、恢复演练、预防项与复核日期" nodes={nodes} />;
}
