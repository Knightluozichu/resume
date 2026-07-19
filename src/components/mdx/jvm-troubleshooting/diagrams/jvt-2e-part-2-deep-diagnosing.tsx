import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-part-2-deep-diagnosing",
  "unitTitle": "Part 2 深入诊断应用执行",
  "concepts": [
    "Part 2 Deep diagnosing an app’s execution"
  ],
  "stages": [
    "确认症状",
    "选择采样",
    "定位热点",
    "抓取线程",
    "交叉验证"
  ],
  "focuses": [
    "CPU样本",
    "分配样本",
    "SQL调用",
    "锁等待",
    "线程转储",
    "探针成本"
  ],
  "model": {
    "studio": "深度诊断升级门",
    "axisA": {
      "label": "工具深度",
      "levels": [
        "运行指标",
        "采样剖析",
        "事件与转储"
      ]
    },
    "axisB": {
      "label": "窗口代表性",
      "levels": [
        "故障外",
        "覆盖故障",
        "基线故障对照"
      ]
    },
    "outcomes": {
      "signal": "热点解释度",
      "risk": "误采样风险",
      "evidence": "证据闭环度"
    },
    "fault": "采集窗口没有覆盖故障，却根据最热方法给出优化结论",
    "task": "规定从指标升级到JFR或线程转储的触发条件，并保存前后窗口",
    "invariant": "深度证据必须覆盖症状窗口并可与稳定基线比较",
    "command": "jcmd <pid> JFR.start duration=60s filename=incident.jfr",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2ePart2DeepDiagnosingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2ePart2DeepDiagnosingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2ePart2DeepDiagnosingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
