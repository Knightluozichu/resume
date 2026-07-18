import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "4 Making the most of logs: Auditing an app’s behavior",
  "4.1 Investigating issues with logs",
  "4.1.1 Using logs to identify exceptions",
  "4.1.2 Using exception stack traces to identify what calls a method",
  "4.1.3 Measuring time spent to execute a given instruction",
  "4.1.4 Investigating problems in multithreaded architectures",
  "4.2 Implementing logging",
  "4.2.1 Persisting logs",
  "4.2.2 Defining logging levels and using logging frameworks",
  "4.2.3 Problems caused by logging and how to avoid them",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第4章 用日志审计应用行为" focus="把异常栈、调用来源、耗时和线程上下文编码为结构化事件，并控制级别、持久化、成本与敏感信息" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第4章 用日志审计应用行为" focus="注入一次下游超时与一次业务拒绝，验证二者级别、堆栈、关联字段和告警结果不同" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第4章 用日志审计应用行为" focus="事件字段合同、关联ID传播、级别矩阵、脱敏测试、日志成本预算" nodes={nodes} />;
}
