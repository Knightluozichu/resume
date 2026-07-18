import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "12 Uncovering system-level failures and service communication problems",
  "12.1 Troubleshooting communication patterns: RPC and messaging",
  "12.1.1 Working with trace IDs and spans",
  "12.1.2 OpenTelemetry, Jaeger, Zipkin, and other utilities",
  "12.2 Serialization mismatches and versioning problems",
  "12.3 Understanding systemic failure modes",
  "12.3.1 Cascading failures",
  "12.3.2 Retry storms",
  "12.3.3 Timeout mismatches",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第12章 揭示系统级与服务通信故障" focus="比较RPC与消息的失败语义，使用trace与span重建传播路径，并诊断序列化错配、级联、重试风暴和超时错位" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第12章 揭示系统级与服务通信故障" focus="让下游变慢并返回间歇错误，比较无界重试与单层有预算重试的请求放大和恢复时间" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第12章 揭示系统级与服务通信故障" focus="调用与消息拓扑、span合同、模式兼容矩阵、重试预算、超时瀑布、级联熔断实验" nodes={nodes} />;
}
