import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-07-class-loading",
  "title": "第7章 虚拟机类加载机制",
  "concepts": [
    "第7章 虚拟机类加载机制",
    "7.1 概述",
    "7.2 类加载的时机",
    "7.3 类加载的过程",
    "7.3.1 加载",
    "7.3.2 验证",
    "7.3.3 准备",
    "7.3.4 解析",
    "7.3.5 初始化",
    "7.4 类加载器",
    "7.4.1 类与类加载器",
    "7.4.2 双亲委派模型",
    "7.4.3 破坏双亲委派模型",
    "7.5 Java模块化系统",
    "7.5.1 模块的兼容性",
    "7.5.2 模块化下的类加载器",
    "7.6 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "加载链接初始化台",
    "boundary": "loader identity → load → verify → prepare → resolve → initialize",
    "axisA": {
      "label": "触发方式",
      "levels": [
        "主动使用",
        "被动引用",
        "反射"
      ]
    },
    "axisB": {
      "label": "加载器",
      "levels": [
        "bootstrap",
        "platform",
        "custom"
      ]
    },
    "fault": "把类名相同误当运行时类型相同，忽略定义加载器",
    "invariant": "类身份由二进制名和定义加载器共同决定，初始化顺序符合JVMS",
    "probe": "java -Xlog:class+load=info,class+init=debug LoaderProbe",
    "signal": "定义加载器、初始化日志与错误类型",
    "practiceMode": "diagnosis",
    "metric": "加载链接初始化台复现度",
    "risk": "加载器失真风险",
    "task": "掌握加载、验证、准备、解析、初始化五阶段，理解类身份由名称与加载器共同决定，并纳入JPMS模块边界；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "加载状态机、初始化触发矩阵、加载器委派图、类身份实验、模块可读性与导出表"
  }
} as const;

export function Duj307ClassLoadingStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj307ClassLoadingExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj307ClassLoadingEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
