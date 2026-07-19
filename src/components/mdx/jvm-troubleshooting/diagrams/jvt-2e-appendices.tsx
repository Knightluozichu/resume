import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendices",
  "unitTitle": "附录总览",
  "concepts": [
    "Appendices"
  ],
  "stages": [
    "准备工具",
    "打开项目",
    "补齐知识",
    "核对线程",
    "核对内存"
  ],
  "focuses": [
    "工具版本",
    "构建命令",
    "阅读来源",
    "线程模型",
    "内存区域",
    "参考身份"
  ],
  "model": {
    "studio": "附录就绪度检查台",
    "axisA": {
      "label": "环境就绪度",
      "levels": [
        "只有源码",
        "可构建",
        "可复现故障"
      ]
    },
    "axisB": {
      "label": "基础知识",
      "levels": [
        "名词",
        "状态图",
        "可运行反例"
      ]
    },
    "outcomes": {
      "signal": "调查就绪率",
      "risk": "基础缺口率",
      "evidence": "证据闭环度"
    },
    "fault": "没有项目版本和运行命令就直接比较不同人的剖析结果",
    "task": "提交一份新调查者可在30分钟内复现的工具与项目清单",
    "invariant": "未参与准备的人能从空环境重建同一基线",
    "command": "java --version && git rev-parse HEAD",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendicesInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendicesTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendicesEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
