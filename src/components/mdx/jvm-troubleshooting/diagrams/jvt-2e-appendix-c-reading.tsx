import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-c-reading",
  "unitTitle": "附录C 延伸阅读",
  "concepts": [
    "Appendix C: Recommended further reading"
  ],
  "stages": [
    "定义问题",
    "选择一手源",
    "锁定版本",
    "提取合同",
    "运行验证"
  ],
  "focuses": [
    "JLS/JVMS",
    "Oracle guide",
    "tool manual",
    "版本日期",
    "适用边界",
    "引用证据"
  ],
  "model": {
    "studio": "一手资料路由台",
    "axisA": {
      "label": "资料层级",
      "levels": [
        "二手文章",
        "厂商指南",
        "规范与实现文档"
      ]
    },
    "axisB": {
      "label": "验证动作",
      "levels": [
        "只摘录",
        "核对版本",
        "最小实验"
      ]
    },
    "outcomes": {
      "signal": "主张可追溯度",
      "risk": "过时资料风险",
      "evidence": "证据闭环度"
    },
    "fault": "用旧版本博客解释当前JDK行为，却没有核对命令和事件名称",
    "task": "为一条JVM主张找到一手来源并设计最小反例",
    "invariant": "每条外部主张都绑定版本、原始链接和本地验证",
    "command": "record URL, JDK version, claim, counterexample",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixCReadingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixCReadingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixCReadingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
