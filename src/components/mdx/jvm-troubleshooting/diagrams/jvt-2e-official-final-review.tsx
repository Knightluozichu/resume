import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-official-final-review",
  "unitTitle": "《Troubleshooting Java（第2版）》全书总复习",
  "concepts": [
    "Freeze the incident baseline",
    "Build competing root-cause hypotheses",
    "Capture low-overhead runtime evidence",
    "Escalate to thread or heap artifacts safely",
    "Correlate services and data side effects",
    "Replay the original failure"
  ],
  "stages": [
    "冻结事件",
    "建立时间线",
    "定位首错",
    "修复反证",
    "恢复交接"
  ],
  "focuses": [
    "baseline",
    "logs",
    "JFR",
    "dump",
    "trace",
    "reconciliation"
  ],
  "model": {
    "studio": "Java故障综合答辩台",
    "axisA": {
      "label": "证据层级",
      "levels": [
        "单JVM",
        "资源与转储",
        "跨服务与数据"
      ]
    },
    "axisB": {
      "label": "闭环程度",
      "levels": [
        "定位",
        "修复",
        "同输入重放与恢复"
      ]
    },
    "outcomes": {
      "signal": "根因复现率",
      "risk": "证据缺口率",
      "evidence": "证据闭环度"
    },
    "fault": "修复后只看告警消失，没有重放原负载、反例和数据对账",
    "task": "向未参与者交付可独立推翻或复现根因的完整事件包",
    "invariant": "原始症状由最小修复消失且正常基线、资源和数据状态全部恢复",
    "command": "incident bundle: versions + timeline + raw evidence + replay",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eOfficialFinalReviewInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eOfficialFinalReviewTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eOfficialFinalReviewEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
