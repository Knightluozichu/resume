import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-11-gc-logs",
  "unitTitle": "第11章 用GC日志分析潜在JVM问题",
  "concepts": [
    "11 Analyzing potential JVM problems with GC logs",
    "11.1 Enabling GC logs",
    "11.2 Storing GC logs in files",
    "11.3 Particular configurations for storing GC logs",
    "11.4 Analyzing GC logs",
    "11.4.1 Troubleshooting performance lags with GC pause times",
    "11.4.2 Identifying memory leaks with heap usage logs",
    "11.4.3 Identifying insufficient memory with full GC events",
    "11.4.4 Tuning parallelism in GC",
    "Summary"
  ],
  "stages": [
    "启用事件",
    "保存轮转",
    "解析暂停",
    "比较占用",
    "验证调优"
  ],
  "focuses": [
    "Xlog:gc",
    "rotation",
    "pause time",
    "heap after GC",
    "Full GC",
    "parallelism"
  ],
  "model": {
    "studio": "GC事件与暂停分布台",
    "axisA": {
      "label": "分析指标",
      "levels": [
        "平均暂停",
        "分位数",
        "占用与事件序列"
      ]
    },
    "axisB": {
      "label": "负载坐标",
      "levels": [
        "未知",
        "请求率固定",
        "请求率与堆固定"
      ]
    },
    "outcomes": {
      "signal": "GC症状解释度",
      "risk": "参数过调风险",
      "evidence": "证据闭环度"
    },
    "fault": "只看到一次Full GC就改收集器或堆大小，没有对照负载、分配率与GC后占用",
    "task": "从GC日志计算暂停P95、Full GC频率和GC后live set趋势，再选择是否调优",
    "invariant": "任何GC调优都以相同工作量的吞吐、暂停和内存三项回归验证",
    "command": "java -Xlog:gc*,safepoint:file=gc.log -jar app.jar",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e11GcLogsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e11GcLogsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e11GcLogsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
