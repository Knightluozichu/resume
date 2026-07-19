import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-a-tools",
  "unitTitle": "附录A 所需工具",
  "concepts": [
    "Appendix A: Tools you’ll need"
  ],
  "stages": [
    "列出工具",
    "锁定版本",
    "验证权限",
    "测试采集",
    "清理数据"
  ],
  "focuses": [
    "JDK",
    "IDE debugger",
    "VisualVM",
    "jcmd",
    "JFR",
    "访问权限"
  ],
  "model": {
    "studio": "诊断工具就绪台",
    "axisA": {
      "label": "工具来源",
      "levels": [
        "未知下载",
        "官方发行",
        "校验和锁定"
      ]
    },
    "axisB": {
      "label": "采集权限",
      "levels": [
        "管理员常开",
        "按需授权",
        "最小权限加审计"
      ]
    },
    "outcomes": {
      "signal": "工具可信度",
      "risk": "权限暴露风险",
      "evidence": "证据闭环度"
    },
    "fault": "为方便长期开放attach或管理员权限，并把转储留在共享目录",
    "task": "验证工具版本、最小权限、输出位置和清理动作",
    "invariant": "工具身份和采集数据生命周期均可追踪",
    "command": "java --version && jcmd -l && jfr --version",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixAToolsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixAToolsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixAToolsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
