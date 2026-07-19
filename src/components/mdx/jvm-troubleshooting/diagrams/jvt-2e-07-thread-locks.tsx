import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-07-thread-locks",
  "unitTitle": "第7章 调查多线程架构中的锁",
  "concepts": [
    "7 Investigating locks in multithreaded architectures",
    "7.1 Monitoring threads for locks",
    "7.2 Analyzing thread locks",
    "7.3 Analyzing waiting threads",
    "Summary"
  ],
  "stages": [
    "抓取线程",
    "识别状态",
    "定位所有者",
    "构建等待图",
    "缩短临界区"
  ],
  "focuses": [
    "BLOCKED",
    "WAITING",
    "monitor",
    "ownable synchronizer",
    "lock owner",
    "持有时间"
  ],
  "model": {
    "studio": "锁所有权与等待图台",
    "axisA": {
      "label": "抓取次数",
      "levels": [
        "单次",
        "相隔5秒两次",
        "覆盖峰值多次"
      ]
    },
    "axisB": {
      "label": "等待分类",
      "levels": [
        "只看状态",
        "锁所有者",
        "资源与业务动作"
      ]
    },
    "outcomes": {
      "signal": "竞争定位率",
      "risk": "瞬时快照误判",
      "evidence": "证据闭环度"
    },
    "fault": "从一次WAITING状态断言死锁，忽略条件等待、I/O或快照瞬时性",
    "task": "比较连续线程快照，找出持续等待链与真正持锁者",
    "invariant": "锁瓶颈必须在多次快照中保持同一所有权或等待模式",
    "command": "jcmd <pid> Thread.print -l",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e07ThreadLocksInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e07ThreadLocksTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e07ThreadLocksEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
