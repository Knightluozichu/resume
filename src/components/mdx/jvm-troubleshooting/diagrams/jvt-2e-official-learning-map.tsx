import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-official-learning-map",
  "unitTitle": "《Troubleshooting Java（第2版）》权威学习地图",
  "concepts": [
    "Part 1 Revisiting the foundation for code investigation",
    "1 Starting to know your apps",
    "2 Understanding your app’s logic through debugging techniques",
    "3 Finding problem root causes using advanced debugging techniques",
    "4 Making the most of logs: Auditing an app’s behavior",
    "Part 2 Deep diagnosing an app’s execution",
    "5 Identifying resource consumption problems using profiling techniques",
    "6 Finding hidden problems using profiling techniques",
    "7 Investigating locks in multithreaded architectures",
    "8 Investigating deadlocks with thread dumps",
    "Part 3 Diagnosing memory-related problems",
    "9 Profiling memory-related problems",
    "10 Investigating memory problems with heap dumps",
    "11 Analyzing potential JVM problems with GC logs",
    "Part 4 Finding problems in large systems",
    "12 Uncovering system-level failures and service communication problems",
    "13 Measuring data consistency and transactions",
    "Appendices",
    "Appendix A: Tools you’ll need",
    "Appendix B: Opening a project",
    "Appendix C: Recommended further reading",
    "Appendix D: Understanding Java threads",
    "Appendix E: Memory management in Java apps",
    "Appendix F: references"
  ],
  "stages": [
    "冻结事件",
    "提出假设",
    "低扰动采证",
    "定向深挖",
    "修复重放"
  ],
  "focuses": [
    "事件窗口",
    "版本基线",
    "假设树",
    "原始信号",
    "反例",
    "交接包"
  ],
  "model": {
    "studio": "全书调查路径编排台",
    "axisA": {
      "label": "故障可复现度",
      "levels": [
        "只见一次",
        "可控回放",
        "最小稳定复现"
      ]
    },
    "axisB": {
      "label": "证据侵入度",
      "levels": [
        "直接暂停",
        "低频采样",
        "持续事件流"
      ]
    },
    "outcomes": {
      "signal": "路径定位率",
      "risk": "观测扰动风险",
      "evidence": "证据闭环度"
    },
    "fault": "一开始就用最高侵入工具，改变时序后把观测结果误当原始故障",
    "task": "为未知Java故障选择第一项低扰动证据、升级条件和停止条件",
    "invariant": "任何根因都能由冻结基线、原始信号、反例与修复重放共同支持",
    "command": "jcmd -l",
    "practiceMode": "design",
    "riskEffects": [
      -1,
      1
    ]
  }
} as const;

export function Jvt2eOfficialLearningMapInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eOfficialLearningMapTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eOfficialLearningMapEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
