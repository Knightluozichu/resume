import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-official-final-review",
  "title": "《Java核心技术（第14版·全两卷）》全书总复习",
  "concepts": [
    "Freeze the Java 25 toolchain",
    "Prove type and object contracts",
    "Measure collections, streams, and concurrency",
    "Bound modules, files, and network protocols",
    "Preserve database and time semantics",
    "Threat-model code and data",
    "Keep UI and native memory responsive and owned",
    "Hand off reproducible cross-layer evidence"
  ],
  "stages": [
    "冻结版本",
    "重建合同",
    "注入首错",
    "修复重放",
    "交接发布"
  ],
  "focuses": [
    "编译诊断",
    "对象不变量",
    "资源关闭",
    "事务一致",
    "威胁模型",
    "跨层证据"
  ],
  "model": {
    "studio": "Java 25 跨层故障答辩台",
    "axisA": {
      "label": "故障所在层",
      "levels": [
        "类型与对象",
        "资源与并发",
        "协议与本地内存"
      ]
    },
    "axisB": {
      "label": "证据闭环",
      "levels": [
        "只有日志",
        "最小反例",
        "修复加回归"
      ]
    },
    "outcomes": {
      "success": "跨层定位率",
      "risk": "错误归因率",
      "evidence": "可重放证据"
    },
    "fault": "同时修改版本、输入和资源上限，最后无法判断是哪一个前提修复了问题",
    "task": "为一个跨模块服务提交编译、运行、故障、恢复和关闭五段证据并现场复现",
    "invariant": "每次修复只改变一个因果前提且原反例转为稳定回归",
    "probe": "java -XshowSettings:properties -version",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eOfficialFinalReviewMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eOfficialFinalReviewExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eOfficialFinalReviewEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
