import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-part-2-memory-management",
  "title": "第二部分 自动内存管理",
  "concepts": [
    "第二部分 自动内存管理",
    "第二部分 自动内存管理：失败边界",
    "第二部分 自动内存管理：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "内存—GC诊断路线台",
    "boundary": "allocation → reachability → collection → native memory → evidence",
    "axisA": {
      "label": "资源区域",
      "levels": [
        "堆",
        "元空间",
        "本地内存"
      ]
    },
    "axisB": {
      "label": "压力场景",
      "levels": [
        "稳态",
        "突发",
        "泄漏"
      ]
    },
    "fault": "把进程RSS全部归因于Java堆",
    "invariant": "堆、非堆、线程、代码缓存和本地分配使用同一时间线解释",
    "probe": "java -XX:NativeMemoryTracking=summary -Xlog:gc*=info App\njcmd PID VM.native_memory summary",
    "signal": "GC日志、NMT与进程资源",
    "practiceMode": "design",
    "metric": "内存—GC诊断路线台复现度",
    "risk": "压力场景失真风险",
    "task": "把运行时数据区、对象生命周期、收集器、诊断工具和调优案例串成内存问题的因果链；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "内存区域地图、对象生命周期、GC证据矩阵、采集风险预算"
  }
} as const;

export function Duj3Part2MemoryManagementStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3Part2MemoryManagementExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3Part2MemoryManagementEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
