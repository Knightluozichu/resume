import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-09-loading-execution-cases",
  "title": "第9章 类加载及执行子系统的案例与实战",
  "concepts": [
    "第9章 类加载及执行子系统的案例与实战",
    "9.1 概述",
    "9.2 案例分析",
    "9.2.1 Tomcat：正统的类加载器架构",
    "9.2.2 OSGi：灵活的类加载器架构",
    "9.2.3 字节码生成技术与动态代理的实现",
    "9.2.4 Backport工具：Java的时光机器",
    "9.3 实战：自己动手实现远程执行功能",
    "9.3.1 目标",
    "9.3.2 思路",
    "9.3.3 实现",
    "9.3.4 验证",
    "9.4 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "类加载故障案例台",
    "boundary": "container/module loader graph → linkage → execution",
    "axisA": {
      "label": "隔离机制",
      "levels": [
        "classpath",
        "module",
        "OSGi/容器"
      ]
    },
    "axisB": {
      "label": "失败样本",
      "levels": [
        "缺类",
        "版本冲突",
        "类型隔离"
      ]
    },
    "fault": "用修改全局classpath掩盖容器类加载冲突",
    "invariant": "加载器图、代码来源、模块边界和LinkageError能够共同解释故障",
    "probe": "java -Xlog:class+load=debug -verbose:class CaseApp",
    "signal": "code source、加载器图与LinkageError",
    "practiceMode": "diagnosis",
    "task": "比较Tomcat、OSGi、动态代理和Backport的类隔离与字节码改写，再实现受约束的远程执行实验；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "类加载拓扑、隔离用例、代理字节码、远程执行威胁模型、沙箱与清理验证"
  }
} as const;

export function Duj309LoadingExecutionCasesStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj309LoadingExecutionCasesExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj309LoadingExecutionCasesEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
