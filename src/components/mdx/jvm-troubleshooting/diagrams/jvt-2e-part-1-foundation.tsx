import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-part-1-foundation",
  "unitTitle": "Part 1 重访代码调查基础",
  "concepts": [
    "Part 1 Revisiting the foundation for code investigation"
  ],
  "stages": [
    "建立地图",
    "读代码",
    "动态调试",
    "日志审计",
    "互证结论"
  ],
  "focuses": [
    "入口",
    "依赖",
    "调用栈",
    "控制流",
    "日志字段",
    "正常基线"
  ],
  "model": {
    "studio": "基础调查证据梯",
    "axisA": {
      "label": "代码熟悉度",
      "levels": [
        "黑箱",
        "入口已知",
        "依赖与状态已知"
      ]
    },
    "axisB": {
      "label": "动态证据",
      "levels": [
        "无轨迹",
        "单次调试",
        "调试与日志互证"
      ]
    },
    "outcomes": {
      "signal": "行为解释度",
      "risk": "工具先行偏差",
      "evidence": "证据闭环度"
    },
    "fault": "没有正常基线就把第一个异常日志或断点值定义为根因",
    "task": "为陌生应用提交入口、关键依赖、正常请求与失败请求四张证据卡",
    "invariant": "调查结论必须同时解释正常路径与故障路径的首个分叉",
    "command": "git rev-parse HEAD && java --version",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2ePart1FoundationInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2ePart1FoundationTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2ePart1FoundationEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
