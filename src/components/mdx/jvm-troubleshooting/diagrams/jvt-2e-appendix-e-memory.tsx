import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-e-memory",
  "unitTitle": "附录E Java应用内存管理",
  "concepts": [
    "Appendix E: Memory management in Java apps",
    "E.1 How the JVM organizes an app’s memory",
    "E.2 The stack used by threads to store local data",
    "E.3 The heap the app uses to store object instances",
    "E.4 The metaspace memory location for storing data types"
  ],
  "stages": [
    "识别区域",
    "观察分配",
    "找到所有者",
    "触发边界",
    "验证恢复"
  ],
  "focuses": [
    "thread stack",
    "heap",
    "metaspace",
    "native memory",
    "GC root",
    "OOM type"
  ],
  "model": {
    "studio": "JVM内存区域归因台",
    "axisA": {
      "label": "异常区域",
      "levels": [
        "栈",
        "堆",
        "元空间或本地"
      ]
    },
    "axisB": {
      "label": "证据类型",
      "levels": [
        "错误文字",
        "区域指标",
        "分配与持有路径"
      ]
    },
    "outcomes": {
      "signal": "区域命中率",
      "risk": "盲目扩容风险",
      "evidence": "证据闭环度"
    },
    "fault": "看到进程RSS上涨就只增大-Xmx，实际增长来自线程栈、类元数据或直接内存",
    "task": "根据三组指标判断增长区域，并选择只针对该区域的下一项证据",
    "invariant": "容量调整必须与实际耗尽区域和持有原因一致",
    "command": "jcmd <pid> VM.native_memory summary",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixEMemoryInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixEMemoryTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixEMemoryEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
