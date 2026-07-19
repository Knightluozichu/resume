import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-02-input-output",
  "title": "卷II 第2章 输入与输出",
  "concepts": [
    "Chapter 2: Input and Output",
    "2.1 Input/Output Streams",
    "2.2 Reading and Writing Binary Data",
    "2.3 Working with Files",
    "2.4 Memory-Mapped Files",
    "2.5 File Locking",
    "2.6 Object Input/Output Streams and Serialization",
    "2.7 Regular Expressions"
  ],
  "stages": [
    "识别格式",
    "选择流",
    "读取写入",
    "同步资源",
    "验证关闭"
  ],
  "focuses": [
    "字节/字符",
    "Charset",
    "Path/Files",
    "MappedByteBuffer",
    "FileLock",
    "序列化风险"
  ],
  "model": {
    "studio": "I/O 格式与资源边界台",
    "axisA": {
      "label": "数据表示",
      "levels": [
        "原始字节",
        "显式UTF-8",
        "对象图"
      ]
    },
    "axisB": {
      "label": "资源策略",
      "levels": [
        "手动关闭",
        "try-with-resources",
        "映射或加锁"
      ]
    },
    "outcomes": {
      "success": "往返一致率",
      "risk": "格式与泄漏风险",
      "evidence": "可重放证据"
    },
    "fault": "依赖默认字符集或反序列化不可信对象，造成跨环境乱码或代码执行边界失守",
    "task": "用两种字符集重放同一文件，再注入截断输入并核对异常与资源关闭",
    "invariant": "格式、编码、大小与关闭责任在读取前明确",
    "probe": "Files.readString(path, StandardCharsets.UTF_8)",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV202InputOutputMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV202InputOutputExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV202InputOutputEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
