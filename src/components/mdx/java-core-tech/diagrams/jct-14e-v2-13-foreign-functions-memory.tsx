import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-13-foreign-functions-memory",
  "title": "卷II 第13章 外部函数与内存 API",
  "concepts": [
    "Chapter 13: The Foreign Functions and Memory API",
    "13.1 Using JNI to Call C Code from a Java Program",
    "13.2 Using FFM to Call a Foreign Function",
    "13.3 Arenas",
    "13.4 Memory Segments",
    "13.5 Memory Layout",
    "13.6 Looking Up and Invoking Foreign Functions",
    "13.7 Callbacks",
    "13.8 Advanced Topics"
  ],
  "stages": [
    "确认ABI",
    "建立布局",
    "分配Arena",
    "调用外部函数",
    "关闭与回调"
  ],
  "focuses": [
    "JNI",
    "Linker",
    "Arena",
    "MemorySegment",
    "MemoryLayout",
    "upcall"
  ],
  "model": {
    "studio": "FFM ABI 与生命周期台",
    "axisA": {
      "label": "互操作方式",
      "levels": [
        "JNI桥接",
        "FFM downcall",
        "FFM upcall"
      ]
    },
    "axisB": {
      "label": "Arena寿命",
      "levels": [
        "global",
        "shared",
        "confined"
      ]
    },
    "outcomes": {
      "success": "ABI匹配率",
      "risk": "越界与悬垂风险",
      "evidence": "可重放证据"
    },
    "fault": "MemorySegment逃逸已关闭Arena，或按错误字节序和布局调用本地函数",
    "task": "改变布局或提前关闭Arena，观察Java侧检查与本地边界，并恢复正确ABI合同",
    "invariant": "每个外部地址的布局、线程可达性和寿命覆盖完整调用窗口",
    "probe": "segment.scope().isAlive()",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      1
    ]
  }
} as const;

export function Jct14eV213ForeignFunctionsMemoryMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV213ForeignFunctionsMemoryExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV213ForeignFunctionsMemoryEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
