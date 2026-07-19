import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-01-introduction-java",
  "title": "卷I 第1章 Java 概述",
  "concepts": [
    "Chapter 1: An Introduction to Java",
    "1.1 Java as a Programming Platform",
    "1.2 The Java \"White Paper\" Buzzwords",
    "1.3 Java Applets and the Internet",
    "1.4 A Short History of Java",
    "1.5 Common Misconceptions about Java"
  ],
  "stages": [
    "拆分平台层",
    "核对主张",
    "定位历史",
    "运行探针",
    "驳斥误解"
  ],
  "focuses": [
    "语言规范",
    "平台API",
    "JVM实现",
    "Applet历史",
    "可移植边界",
    "性能主张"
  ],
  "model": {
    "studio": "Java 平台主张核验台",
    "axisA": {
      "label": "主张层级",
      "levels": [
        "营销词",
        "规范保证",
        "实现观测"
      ]
    },
    "axisB": {
      "label": "验证坐标",
      "levels": [
        "单机一次",
        "双环境",
        "规范加反例"
      ]
    },
    "outcomes": {
      "success": "主张可证度",
      "risk": "历史误读率",
      "evidence": "可重放证据"
    },
    "fault": "把 Applet 时代能力或某个 JVM 实现现象写成 Java 25 语言保证",
    "task": "选择一条 Java 常见说法，分别给出规范依据、运行探针和适用边界",
    "invariant": "语言保证、API合同和JVM实现观测始终分栏记录",
    "probe": "Runtime.version().feature() == 25",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV101IntroductionJavaMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV101IntroductionJavaExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV101IntroductionJavaEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
