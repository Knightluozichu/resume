import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-part-5-concurrency",
  "title": "第五部分 高效并发",
  "concepts": [
    "第五部分 高效并发",
    "第五部分 高效并发：失败边界",
    "第五部分 高效并发：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "JMM—线程—锁路线台",
    "boundary": "program order → synchronization order → happens-before → observation",
    "axisA": {
      "label": "线程模型",
      "levels": [
        "平台线程",
        "虚拟线程",
        "线程池"
      ]
    },
    "axisB": {
      "label": "同步方式",
      "levels": [
        "volatile",
        "monitor",
        "lock/CAS"
      ]
    },
    "fault": "把一次未复现数据竞争当线程安全证明",
    "invariant": "正确性由happens-before与不变量证明，性能另报告竞争和尾延迟",
    "probe": "java -version\njcmd PID Thread.print -l",
    "signal": "线程状态、锁拥有者与顺序证据",
    "practiceMode": "design",
    "metric": "JMM—线程—锁路线台复现度",
    "risk": "同步方式失真风险",
    "task": "把硬件一致性、Java内存模型、线程实现、协程与锁优化统一到可证明的并发正确性和性能边界；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "共享状态模型、happens-before图、并发反例、锁状态与公平性证据"
  }
} as const;

export function Duj3Part5ConcurrencyStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3Part5ConcurrencyExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3Part5ConcurrencyEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
