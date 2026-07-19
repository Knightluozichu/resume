import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-02-debugging-techniques",
  "unitTitle": "第2章 用调试技术理解应用逻辑",
  "concepts": [
    "2 Understanding your app’s logic through debugging techniques",
    "2.1 When analyzing code is not enough",
    "2.2 Investigating code with a debugger",
    "2.2.1 What is the execution stack trace, and how do I use it?",
    "2.2.2 Navigating code with the debugger",
    "2.3 When using the debugger might not be enough",
    "Summary"
  ],
  "stages": [
    "复现输入",
    "设置断点",
    "读取调用栈",
    "单步分叉",
    "退出验证"
  ],
  "focuses": [
    "断点",
    "stack frame",
    "step over",
    "step into",
    "变量快照",
    "暂停扰动"
  ],
  "model": {
    "studio": "调试器控制流回放台",
    "axisA": {
      "label": "断点位置",
      "levels": [
        "入口",
        "分支前",
        "首错后"
      ]
    },
    "axisB": {
      "label": "暂停范围",
      "levels": [
        "暂停全部",
        "暂停线程",
        "日志断点"
      ]
    },
    "outcomes": {
      "signal": "控制流还原度",
      "risk": "暂停时序扰动",
      "evidence": "证据闭环度"
    },
    "fault": "全局暂停让锁竞争或外部超时消失，产生无法在线上复现的调试结论",
    "task": "沿执行栈找到值第一次偏离不变量的位置，并证明断点没有制造该偏离",
    "invariant": "相同输入在无调试器运行时仍出现同一首错",
    "command": "debug-breakpoint-at-first-divergence",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e02DebuggingTechniquesInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e02DebuggingTechniquesTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e02DebuggingTechniquesEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
