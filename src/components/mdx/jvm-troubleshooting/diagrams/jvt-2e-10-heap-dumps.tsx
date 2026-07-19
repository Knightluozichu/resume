import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-10-heap-dumps",
  "unitTitle": "第10章 用堆转储调查内存问题",
  "concepts": [
    "10 Investigating memory problems with heap dumps",
    "10.1 Obtaining a heap dump",
    "10.1.1 Configuring an app to generate a heap dump when it encounters a memory problem",
    "10.1.2 Obtaining a heap dump using a profiler",
    "10.1.3 Obtaining a heap dump with the command line",
    "10.2 Reading a heap dump",
    "10.3 Using the OQL console to query a heap dump",
    "Summary"
  ],
  "stages": [
    "检查容量",
    "生成转储",
    "载入分析",
    "追踪GC Root",
    "验证释放"
  ],
  "focuses": [
    "HeapDumpOnOutOfMemoryError",
    "jcmd",
    "dominator tree",
    "retained size",
    "GC Roots",
    "OQL"
  ],
  "model": {
    "studio": "堆图持有路径分析台",
    "axisA": {
      "label": "转储触发",
      "levels": [
        "OOM自动",
        "维护窗口",
        "故障现场"
      ]
    },
    "axisB": {
      "label": "分析视角",
      "levels": [
        "浅大小",
        "保留大小",
        "GC Root路径"
      ]
    },
    "outcomes": {
      "signal": "持有者定位率",
      "risk": "敏感数据暴露",
      "evidence": "证据闭环度"
    },
    "fault": "只按shallow size排序，或把含口令和个人数据的hprof上传到非授权服务",
    "task": "从大对象集合追到GC Root，说明谁负责释放并验证修复后基线",
    "invariant": "堆转储的采集、传输、存储和销毁均受容量与访问控制保护",
    "command": "jcmd <pid> GC.heap_dump filename=incident.hprof",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e10HeapDumpsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e10HeapDumpsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e10HeapDumpsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
