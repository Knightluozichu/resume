import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-d-threads",
  "unitTitle": "附录D 理解Java线程",
  "concepts": [
    "Appendix D: Understanding Java threads",
    "D.1 What is a thread?",
    "D.2 A thread’s life cycle",
    "D.3 Synchronizing threads",
    "D.3.1 Synchronized blocks",
    "D.3.2 Using wait(), notify(), and notifyAll()",
    "D.3.3 Joining threads",
    "D.3.4 Blocking threads for a defined time",
    "D.3.5 Synchronizing threads with blocking objects",
    "D.4 Common problems in multithreaded architectures",
    "D.4.1 Race conditions",
    "D.4.2 Deadlocks",
    "D.4.3 Livelocks",
    "D.4.4 Starvation",
    "D.5 Further reading"
  ],
  "stages": [
    "创建线程",
    "进入运行",
    "等待或阻塞",
    "协调唤醒",
    "终止回收"
  ],
  "focuses": [
    "Thread.State",
    "synchronized",
    "wait/notify",
    "join",
    "blocking object",
    "race/deadlock"
  ],
  "model": {
    "studio": "线程状态与协调台",
    "axisA": {
      "label": "协调方式",
      "levels": [
        "忙等",
        "wait/notify",
        "并发工具"
      ]
    },
    "axisB": {
      "label": "故障类型",
      "levels": [
        "竞态",
        "死锁",
        "活锁或饥饿"
      ]
    },
    "outcomes": {
      "signal": "状态解释度",
      "risk": "同步错误率",
      "evidence": "证据闭环度"
    },
    "fault": "在错误监视器上调用wait/notify，或用sleep期待建立可见性和顺序",
    "task": "分别构造竞态与死锁，使用连续线程转储区分两者",
    "invariant": "共享状态访问具有明确happens-before关系且任务最终可终止",
    "command": "jcmd <pid> Thread.print -l",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixDThreadsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixDThreadsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixDThreadsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
