import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "13 Measuring data consistency and transactions",
  "13.1 Troubleshooting inconsistencies across services",
  "13.1.1 Inspecting time-based anomalies in event flows",
  "13.1.2 Applying domain invariants to identify invalid states",
  "13.2 Tracking and correlating multistep transactions",
  "13.2.1 Reviewing audit logs to reconstruct transaction steps",
  "13.2.2 Replaying events or examining event logs for missing messages",
  "13.3 Measuring and monitoring consistency guarantees",
  "13.3.1 Verifying data integrity using checksums or hashes",
  "13.4 Running reconciliation jobs to compare expected vs. actual state",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第13章 测量数据一致性与事务" focus="用事件时间、领域不变量、审计日志、事件重放、校验和与对账任务度量跨服务一致性" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第13章 测量数据一致性与事务" focus="删除、重复并乱序一条事件，验证审计重建、对账检测与修复重复执行仍得到相同状态" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第13章 测量数据一致性与事务" focus="事务关联模型、不变量断言、事件序列、完整性校验、对账报告、幂等修复与审计" nodes={nodes} />;
}
