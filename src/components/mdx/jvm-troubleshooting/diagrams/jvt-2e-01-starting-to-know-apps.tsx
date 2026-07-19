import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-01-starting-to-know-apps",
  "unitTitle": "第1章 开始认识应用",
  "concepts": [
    "1 Starting to know your apps",
    "1.1 How to more easily understand your app",
    "1.2 Typical scenarios for using investigation techniques",
    "1.2.1 Demystifying the unexpected output",
    "1.2.2 Getting familiar with your external libraries",
    "1.2.3 Clarifying slowness",
    "1.2.4 Understanding app crashes",
    "1.3 AI as a game changer in troubleshooting apps",
    "1.4 What you will learn in this book",
    "Summary"
  ],
  "stages": [
    "识别入口",
    "绘制依赖",
    "定义正常",
    "采集异常",
    "验证假设"
  ],
  "focuses": [
    "意外输出",
    "外部库",
    "慢调用",
    "崩溃",
    "AI假设",
    "学习范围"
  ],
  "model": {
    "studio": "陌生应用侦察台",
    "axisA": {
      "label": "应用地图深度",
      "levels": [
        "只有进程",
        "入口与依赖",
        "请求到资源"
      ]
    },
    "axisB": {
      "label": "假设证据",
      "levels": [
        "AI猜测",
        "单条信号",
        "反例互证"
      ]
    },
    "outcomes": {
      "signal": "首错定位率",
      "risk": "臆测扩散率",
      "evidence": "证据闭环度"
    },
    "fault": "把AI摘要、第三方库名称或最后一行异常直接当成根因",
    "task": "对一条意外输出建立三种竞争假设，并用一项证据排除其中两项",
    "invariant": "AI不接收秘密且不产生最终结论，所有主张回到源码或运行证据",
    "command": "jcmd <pid> VM.command_line",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e01StartingToKnowAppsInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e01StartingToKnowAppsTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e01StartingToKnowAppsEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
