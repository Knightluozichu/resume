import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-10-concurrency",
  "title": "卷I 第10章 并发",
  "concepts": [
    "Chapter 10: Concurrency",
    "10.1 Running Threads",
    "10.2 Thread States",
    "10.3 Thread Properties",
    "10.4 Coordinating Tasks",
    "10.5 Synchronization",
    "10.6 Thread-Safe Collections",
    "10.7 Asynchronous Computations",
    "10.8 Processes"
  ],
  "stages": [
    "定义任务",
    "选择线程",
    "协调状态",
    "传播取消",
    "验证关闭"
  ],
  "focuses": [
    "虚拟线程",
    "线程状态",
    "happens-before",
    "锁与原子性",
    "CompletableFuture",
    "Process"
  ],
  "model": {
    "studio": "并发任务与关闭轨迹台",
    "axisA": {
      "label": "线程模型",
      "levels": [
        "单平台线程",
        "固定线程池",
        "每任务虚拟线程"
      ]
    },
    "axisB": {
      "label": "共享状态保护",
      "levels": [
        "无同步",
        "锁或原子",
        "隔离状态"
      ]
    },
    "outcomes": {
      "success": "任务完成率",
      "risk": "竞争与泄漏风险",
      "evidence": "可重放证据"
    },
    "fault": "把虚拟线程当成共享状态安全方案，或取消后仍留下线程、锁和外部连接",
    "task": "对阻塞任务切换线程模型并注入取消，核对结果、共享计数与关闭状态",
    "invariant": "任务结果、取消传播和资源关闭在所有线程模型下语义一致",
    "probe": "Thread.startVirtualThread(task)",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV110ConcurrencyMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV110ConcurrencyExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV110ConcurrencyEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
