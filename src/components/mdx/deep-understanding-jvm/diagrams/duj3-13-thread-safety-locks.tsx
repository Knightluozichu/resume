import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-13-thread-safety-locks",
  "title": "第13章 线程安全与锁优化",
  "concepts": [
    "第13章 线程安全与锁优化",
    "13.1 概述",
    "13.2 线程安全",
    "13.2.1 Java语言中的线程安全",
    "13.2.2 线程安全的实现方法",
    "13.3 锁优化",
    "13.3.1 自旋锁与自适应自旋",
    "13.3.2 锁消除",
    "13.3.3 锁粗化",
    "13.3.4 轻量级锁",
    "13.3.5 偏向锁",
    "13.4 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "锁竞争与优化台",
    "boundary": "entry → acquire/park → critical section → release/unpark",
    "axisA": {
      "label": "同步原语",
      "levels": [
        "synchronized",
        "ReentrantLock",
        "CAS"
      ]
    },
    "axisB": {
      "label": "竞争强度",
      "levels": [
        "无",
        "中",
        "高"
      ]
    },
    "fault": "只比较平均吞吐，忽略饥饿、尾延迟和正确性",
    "invariant": "临界区不变量成立，拥有者和等待者可解释，失败路径必定释放",
    "probe": "jcmd PID Thread.print -l\njcmd PID JFR.start duration=30s filename=locks.jfr",
    "signal": "monitor事件、等待时长与业务不变量",
    "practiceMode": "diagnosis",
    "task": "从不可变、互斥与非阻塞实现线程安全，理解自旋、消除、粗化、轻量级锁与偏向锁的版本化实现；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "安全性定义、线性化点、竞争基准、锁状态记录、版本适用域与回归测试"
  }
} as const;

export function Duj313ThreadSafetyLocksStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj313ThreadSafetyLocksExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj313ThreadSafetyLocksEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
