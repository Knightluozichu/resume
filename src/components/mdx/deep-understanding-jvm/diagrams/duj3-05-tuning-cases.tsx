import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-05-tuning-cases",
  "title": "第5章 调优案例分析与实战",
  "concepts": [
    "第5章 调优案例分析与实战",
    "5.1 概述",
    "5.2 案例分析",
    "5.2.1 大内存硬件上的程序部署策略",
    "5.2.2 集群间同步导致的内存溢出",
    "5.2.3 堆外内存导致的溢出错误",
    "5.2.4 外部命令导致系统缓慢",
    "5.2.5 服务器虚拟机进程崩溃",
    "5.2.6 不恰当数据结构导致内存占用过大",
    "5.2.7 由Windows虚拟内存导致的长时间停顿",
    "5.2.8 由安全点导致长时间停顿",
    "5.3 实战：Eclipse运行速度调优",
    "5.3.1 调优前的程序运行状态",
    "5.3.2 升级JDK版本的性能变化及兼容问题",
    "5.3.3 编译时间和类加载时间的优化",
    "5.3.4 调整内存设置控制垃圾收集频率",
    "5.3.5 选择收集器降低延迟",
    "5.4 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "症状—证据—参数台",
    "boundary": "SLO symptom → timeline → bottleneck → one change → rollback",
    "axisA": {
      "label": "调优动作",
      "levels": [
        "观察",
        "单变量",
        "回滚"
      ]
    },
    "axisB": {
      "label": "负载形态",
      "levels": [
        "CPU",
        "内存",
        "延迟"
      ]
    },
    "fault": "先抄参数再定义问题和停止条件",
    "invariant": "每项参数变化都对应一个假设、原始对照、收益与回滚阈值",
    "probe": "jcmd PID VM.flags\njcmd PID Thread.print -l\njcmd PID GC.class_histogram",
    "signal": "SLO、JFR、GC和线程证据",
    "practiceMode": "diagnosis",
    "metric": "症状—证据—参数台复现度",
    "risk": "负载形态失真风险",
    "task": "用多类真实案例练习从现象到证据，再以Eclipse案例建立版本、类加载、编译、内存和收集器的受控调优流程；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "案例因果图、基线报告、单变量变更、兼容清单、收益与回滚阈值"
  }
} as const;

export function Duj305TuningCasesStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj305TuningCasesExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj305TuningCasesEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
