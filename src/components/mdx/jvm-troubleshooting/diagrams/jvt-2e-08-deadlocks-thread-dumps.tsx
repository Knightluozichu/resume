import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-08-deadlocks-thread-dumps",
  "unitTitle": "第8章 用线程转储调查死锁",
  "concepts": [
    "8 Investigating deadlocks with thread dumps",
    "8.1 Getting a thread dump",
    "8.1.1 Getting a thread dump using a profiler",
    "8.1.2 Generating a thread dump from the command line",
    "8.2 Reading thread dumps",
    "8.2.1 Reading plain-text thread dumps",
    "8.2.2 Using tools to better grasp thread dumps",
    "Summary"
  ],
  "stages": [
    "选择时刻",
    "生成转储",
    "解析栈帧",
    "构建锁环",
    "验证修复"
  ],
  "focuses": [
    "jcmd Thread.print",
    "plain text",
    "locked",
    "waiting to lock",
    "deadlock cycle",
    "连续转储"
  ],
  "model": {
    "studio": "线程转储锁环重建台",
    "axisA": {
      "label": "转储来源",
      "levels": [
        "IDE/剖析器",
        "jcmd",
        "容器信号"
      ]
    },
    "axisB": {
      "label": "分析方法",
      "levels": [
        "搜索状态",
        "手工锁图",
        "工具与手工互证"
      ]
    },
    "outcomes": {
      "signal": "锁环还原度",
      "risk": "死锁误报率",
      "evidence": "证据闭环度"
    },
    "fault": "只凭大量BLOCKED线程宣称死锁，没有形成线程—锁—线程的闭合等待环",
    "task": "从纯文本转储画出锁环，并用第二次转储确认环未自行解除",
    "invariant": "死锁结论包含至少一个闭合等待环及各线程持有/请求关系",
    "command": "jcmd <pid> Thread.print -l",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e08DeadlocksThreadDumpsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e08DeadlocksThreadDumpsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e08DeadlocksThreadDumpsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
