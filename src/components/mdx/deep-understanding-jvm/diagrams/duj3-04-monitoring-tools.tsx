import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-04-monitoring-tools",
  "title": "第4章 虚拟机性能监控、故障处理工具",
  "concepts": [
    "第4章 虚拟机性能监控、故障处理工具",
    "4.1 概述",
    "4.2 基础故障处理工具",
    "4.2.1 jps：虚拟机进程状况工具",
    "4.2.2 jstat：虚拟机统计信息监视工具",
    "4.2.3 jinfo：Java配置信息工具",
    "4.2.4 jmap：Java内存映像工具",
    "4.2.5 jhat：虚拟机堆转储快照分析工具",
    "4.2.6 jstack：Java堆栈跟踪工具",
    "4.2.7 基础工具总结",
    "4.3 可视化故障处理工具",
    "4.3.1 JHSDB：基于服务性代理的调试工具",
    "4.3.2 JConsole：Java监视与管理控制台",
    "4.3.3 VisualVM：多合一故障处理工具",
    "4.3.4 Java Mission Control：可持续在线的监控工具",
    "4.4 HotSpot虚拟机插件及工具",
    "4.5 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "jcmd与JFR证据台",
    "boundary": "question → low-impact probe → raw recording → corroboration",
    "axisA": {
      "label": "采集工具",
      "levels": [
        "jcmd",
        "JFR",
        "jhsdb"
      ]
    },
    "axisB": {
      "label": "探针成本",
      "levels": [
        "低",
        "受控",
        "高"
      ]
    },
    "fault": "没有问题定义就采集完整堆并泄露业务数据",
    "invariant": "探针回答明确问题，原始证据最小授权并由第二种信号交叉验证",
    "probe": "jcmd PID JFR.start name=duj settings=profile duration=60s filename=duj.jfr\njfr summary duj.jfr",
    "signal": "JFR事件、采集窗口与探针影响",
    "practiceMode": "diagnosis",
    "metric": "jcmd与JFR证据台复现度",
    "risk": "探针成本失真风险",
    "task": "按问题选择jps、jstat、jinfo、jmap、jstack、JHSDB、JConsole、VisualVM、JFR与JMC，并记录探针效应；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "工具选择矩阵、命令与版本、原始输出、采集开销、敏感数据处置记录"
  }
} as const;

export function Duj304MonitoringToolsStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj304MonitoringToolsExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj304MonitoringToolsEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
