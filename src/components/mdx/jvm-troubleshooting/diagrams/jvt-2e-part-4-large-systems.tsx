import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-part-4-large-systems",
  "unitTitle": "Part 4 在大型系统中寻找问题",
  "concepts": [
    "Part 4 Finding problems in large systems"
  ],
  "stages": [
    "传播标识",
    "串联跨度",
    "核对协议",
    "识别级联",
    "对账恢复"
  ],
  "focuses": [
    "trace id",
    "span",
    "schema version",
    "retry",
    "timeout",
    "reconciliation"
  ],
  "model": {
    "studio": "跨服务故障关联门",
    "axisA": {
      "label": "关联范围",
      "levels": [
        "单日志",
        "单服务trace",
        "跨服务与数据"
      ]
    },
    "axisB": {
      "label": "故障传播",
      "levels": [
        "单点",
        "重试放大",
        "级联与恢复"
      ]
    },
    "outcomes": {
      "signal": "端到端还原度",
      "risk": "局部归因风险",
      "evidence": "证据闭环度"
    },
    "fault": "只优化最慢服务，却忽略上游超时和重试造成的系统放大",
    "task": "为一次跨服务失败画出时间线、重试次数、状态变更和补偿动作",
    "invariant": "同一业务动作可从入口追踪到每个副作用及最终对账结果",
    "command": "trace-id -> spans -> audit-event -> reconciliation",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2ePart4LargeSystemsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2ePart4LargeSystemsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2ePart4LargeSystemsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
