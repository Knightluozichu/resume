import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-09-memory-profiling",
  "unitTitle": "第9章 剖析内存相关问题",
  "concepts": [
    "9 Profiling memory-related problems",
    "9.1 Sampling to identify memory allocation problems",
    "9.2 Profiling to find the culprit",
    "Summary"
  ],
  "stages": [
    "固定负载",
    "记录分配",
    "触发稳态",
    "比较存活",
    "定位代码"
  ],
  "focuses": [
    "allocation rate",
    "TLAB",
    "live object",
    "class histogram",
    "call tree",
    "retention"
  ],
  "model": {
    "studio": "分配与存活对照台",
    "axisA": {
      "label": "对象寿命",
      "levels": [
        "短命",
        "跨请求",
        "持续存活"
      ]
    },
    "axisB": {
      "label": "负载阶段",
      "levels": [
        "预热",
        "稳定压力",
        "撤载恢复"
      ]
    },
    "outcomes": {
      "signal": "增长来源命中率",
      "risk": "短命对象误报",
      "evidence": "证据闭环度"
    },
    "fault": "把分配最多的类型直接当泄漏者，忽略对象已快速回收",
    "task": "对比分配热点与GC后存活热点，找出真正持续增长的类型",
    "invariant": "泄漏候选在撤载与GC后仍保持增长或异常持有",
    "command": "jfr view allocation-by-site memory.jfr",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e09MemoryProfilingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e09MemoryProfilingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e09MemoryProfilingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
