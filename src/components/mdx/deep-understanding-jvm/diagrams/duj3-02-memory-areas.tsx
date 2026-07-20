import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-02-memory-areas",
  "title": "第2章 Java内存区域与内存溢出异常",
  "concepts": [
    "第2章 Java内存区域与内存溢出异常",
    "2.1 概述",
    "2.2 运行时数据区域",
    "2.2.1 程序计数器",
    "2.2.2 Java虚拟机栈",
    "2.2.3 本地方法栈",
    "2.2.4 Java堆",
    "2.2.5 方法区",
    "2.2.6 运行时常量池",
    "2.2.7 直接内存",
    "2.3 HotSpot虚拟机对象探秘",
    "2.3.1 对象的创建",
    "2.3.2 对象的内存布局",
    "2.3.3 对象的访问定位",
    "2.4 实战：OutOfMemoryError异常",
    "2.4.1 Java堆溢出",
    "2.4.2 虚拟机栈和本地方法栈溢出",
    "2.4.3 方法区和运行时常量池溢出",
    "2.4.4 本机直接内存溢出",
    "2.5 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "运行时数据区与OOM台",
    "boundary": "thread/frame/heap/metaspace/direct → failure",
    "axisA": {
      "label": "受限区域",
      "levels": [
        "堆",
        "栈",
        "直接内存"
      ]
    },
    "axisB": {
      "label": "故障类型",
      "levels": [
        "OOM",
        "SOE",
        "分配失败"
      ]
    },
    "fault": "在宿主进程无资源限制地制造OOM",
    "invariant": "每种故障都能映射到具体区域、限制参数、异常与清理记录",
    "probe": "java -Xmx64m -Xss256k -XX:MaxDirectMemorySize=32m MemoryProbe",
    "signal": "退出码、异常类型与NMT差值",
    "practiceMode": "diagnosis",
    "task": "区分线程私有与共享运行时区域，理解HotSpot对象创建和布局，并为每类内存异常建立可控复现；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "区域所有权图、对象布局记录、四类OOM最小案例、限制参数与转储证据"
  }
} as const;

export function Duj302MemoryAreasStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj302MemoryAreasExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj302MemoryAreasEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
