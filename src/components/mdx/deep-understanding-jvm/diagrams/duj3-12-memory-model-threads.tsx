import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-12-memory-model-threads",
  "title": "第12章 Java内存模型与线程",
  "concepts": [
    "第12章 Java内存模型与线程",
    "12.1 概述",
    "12.2 硬件的效率与一致性",
    "12.3 Java内存模型",
    "12.3.1 主内存与工作内存",
    "12.3.2 内存间交互操作",
    "12.3.3 对于volatile型变量的特殊规则",
    "12.3.4 针对long和double型变量的特殊规则",
    "12.3.5 原子性、可见性与有序性",
    "12.3.6 先行发生原则",
    "12.4 Java与线程",
    "12.4.1 线程的实现",
    "12.4.2 Java线程调度",
    "12.4.3 状态转换",
    "12.5 Java与协程",
    "12.5.1 内核线程的局限",
    "12.5.2 协程的复苏",
    "12.5.3 Java的解决方案",
    "12.6 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "happens-before与线程台",
    "boundary": "actions → synchronization order → visibility/ordering",
    "axisA": {
      "label": "共享方式",
      "levels": [
        "普通字段",
        "volatile",
        "锁保护"
      ]
    },
    "axisB": {
      "label": "线程载体",
      "levels": [
        "平台",
        "虚拟",
        "混合"
      ]
    },
    "fault": "只依赖sleep和一次输出判断可见性",
    "invariant": "所有共享读都由明确happens-before边或安全发布支撑",
    "probe": "mvn -q -Dtest=JmmProbeTest test\njcmd PID Thread.print -l",
    "signal": "反例计数、线程转储与同步边",
    "practiceMode": "diagnosis",
    "task": "从缓存一致性过渡到JMM的原子性、可见性、有序性和happens-before，再比较内核线程与协程；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "JMM动作图、重排序反例、happens-before证明、线程状态轨迹、协程版本边界"
  }
} as const;

export function Duj312MemoryModelThreadsStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj312MemoryModelThreadsExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj312MemoryModelThreadsEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
