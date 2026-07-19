import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-13-consistency-transactions",
  "unitTitle": "第13章 测量数据一致性与事务",
  "concepts": [
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
  ],
  "stages": [
    "声明不变量",
    "关联事务",
    "重放事件",
    "比较状态",
    "执行补偿"
  ],
  "focuses": [
    "time anomaly",
    "domain invariant",
    "audit log",
    "missing event",
    "checksum",
    "reconciliation"
  ],
  "model": {
    "studio": "分布式一致性对账台",
    "axisA": {
      "label": "状态来源",
      "levels": [
        "服务当前值",
        "审计事件",
        "事件加权威账本"
      ]
    },
    "axisB": {
      "label": "核对方式",
      "levels": [
        "抽样",
        "校验和",
        "逐业务键对账"
      ]
    },
    "outcomes": {
      "signal": "差异发现率",
      "risk": "错误补偿风险",
      "evidence": "证据闭环度"
    },
    "fault": "按到达时间重放乱序事件，或重复执行无幂等保护的补偿",
    "task": "为缺失、重复和乱序事件各造一例，验证不变量、检测和补偿幂等性",
    "invariant": "每个业务键的期望状态可由版本化事件和权威来源重新计算",
    "command": "reconcile expected_state_hash against actual_state_hash",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e13ConsistencyTransactionsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e13ConsistencyTransactionsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e13ConsistencyTransactionsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
