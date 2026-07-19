import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-12-system-failures",
  "unitTitle": "第12章 揭示系统级与服务通信故障",
  "concepts": [
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
  ],
  "stages": [
    "接收请求",
    "传播上下文",
    "调用下游",
    "处理超时",
    "限制重试"
  ],
  "focuses": [
    "RPC",
    "messaging",
    "trace id",
    "span",
    "schema mismatch",
    "retry storm"
  ],
  "model": {
    "studio": "级联失败与超时预算台",
    "axisA": {
      "label": "下游故障",
      "levels": [
        "稳定",
        "慢响应",
        "持续拒绝"
      ]
    },
    "axisB": {
      "label": "客户端策略",
      "levels": [
        "无超时",
        "截止时间",
        "截止时间加退避预算"
      ]
    },
    "outcomes": {
      "signal": "传播可见度",
      "risk": "请求放大率",
      "evidence": "证据闭环度"
    },
    "fault": "每一层独立重试且下游超时大于上游截止时间，形成重试风暴",
    "task": "计算三层调用的最坏请求放大，并重新分配端到端超时与重试预算",
    "invariant": "下游工作不超过入口截止时间，重试总数受单一预算约束",
    "command": "trace-id with span status and retry.count",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e12SystemFailuresInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e12SystemFailuresTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e12SystemFailuresEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
