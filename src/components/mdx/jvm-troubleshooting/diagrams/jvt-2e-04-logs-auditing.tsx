import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-04-logs-auditing",
  "unitTitle": "第4章 用日志审计应用行为",
  "concepts": [
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
  ],
  "stages": [
    "定义事件",
    "记录上下文",
    "持久传输",
    "关联时间线",
    "验证成本"
  ],
  "focuses": [
    "异常cause",
    "调用栈",
    "耗时",
    "线程标识",
    "日志级别",
    "敏感字段"
  ],
  "model": {
    "studio": "结构化日志时间线台",
    "axisA": {
      "label": "事件粒度",
      "levels": [
        "自由文本",
        "结构字段",
        "trace关联字段"
      ]
    },
    "axisB": {
      "label": "记录密度",
      "levels": [
        "全量DEBUG",
        "分级采样",
        "错误加动态窗口"
      ]
    },
    "outcomes": {
      "signal": "事件可关联度",
      "risk": "成本与泄密风险",
      "evidence": "证据闭环度"
    },
    "fault": "吞掉异常cause、记录口令或在热点循环同步刷盘导致故障被日志放大",
    "task": "用同一trace id重建失败请求，并证明日志未包含秘密且不会阻塞主路径",
    "invariant": "每条关键日志能回答何时、何地、谁、发生什么和因为什么",
    "command": "rg 'trace_id=.*ERROR' app.log",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e04LogsAuditingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e04LogsAuditingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e04LogsAuditingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
