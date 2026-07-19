import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-part-3-memory",
  "unitTitle": "Part 3 诊断内存相关问题",
  "concepts": [
    "Part 3 Diagnosing memory-related problems"
  ],
  "stages": [
    "确认症状",
    "观察分配",
    "检查存活",
    "读取堆图",
    "核对GC"
  ],
  "focuses": [
    "allocation",
    "live set",
    "GC roots",
    "heap dump",
    "pause",
    "capacity"
  ],
  "model": {
    "studio": "内存证据升级门",
    "axisA": {
      "label": "内存现象",
      "levels": [
        "高水位",
        "持续存活增长",
        "分配失败"
      ]
    },
    "axisB": {
      "label": "证据深度",
      "levels": [
        "总量",
        "类直方图",
        "堆图与GC日志"
      ]
    },
    "outcomes": {
      "signal": "内存归因率",
      "risk": "转储冲击风险",
      "evidence": "证据闭环度"
    },
    "fault": "在线上高峰贸然抓取完整堆转储，造成额外停顿或磁盘耗尽",
    "task": "为内存告警选择最低成本证据，并定义升级到heap dump的资源门槛",
    "invariant": "调查动作不能让磁盘、停顿或内存压力超过预设安全预算",
    "command": "jcmd <pid> GC.heap_info",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2ePart3MemoryInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2ePart3MemoryTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2ePart3MemoryEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
