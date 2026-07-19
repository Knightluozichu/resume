import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-f-references",
  "unitTitle": "附录F 参考资料",
  "concepts": [
    "Appendix F: references"
  ],
  "stages": [
    "登记来源",
    "核对身份",
    "绑定主张",
    "保存版本",
    "审计引用"
  ],
  "focuses": [
    "ISBN",
    "URL",
    "文档版本",
    "命令版本",
    "事实主张",
    "本地推断"
  ],
  "model": {
    "studio": "调查引用审计台",
    "axisA": {
      "label": "来源身份",
      "levels": [
        "无出处",
        "稳定链接",
        "版本化一手源"
      ]
    },
    "axisB": {
      "label": "本地验证",
      "levels": [
        "未验证",
        "单次命令",
        "反例与输出"
      ]
    },
    "outcomes": {
      "signal": "引用可追溯度",
      "risk": "权威误借风险",
      "evidence": "证据闭环度"
    },
    "fault": "把目录或工具页面的存在误报为对本地根因的直接证明",
    "task": "为三个调查主张分别登记一手来源、最小命令与实际输出",
    "invariant": "引用只支持其直接陈述的事实，本地因果结论仍由运行证据承担",
    "command": "claim -> source -> version -> local evidence",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixFReferencesInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixFReferencesTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixFReferencesEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
