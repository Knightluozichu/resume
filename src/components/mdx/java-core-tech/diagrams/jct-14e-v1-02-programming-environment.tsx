import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-02-programming-environment",
  "title": "卷I 第2章 Java 编程环境",
  "concepts": [
    "Chapter 2: The Java Programming Environment",
    "2.1 Installing the Java Development Kit",
    "2.2 Using the Command-Line Tools",
    "2.3 Using an Integrated Development Environment",
    "2.4 JShell"
  ],
  "stages": [
    "识别JDK",
    "编译源码",
    "检查字节码",
    "运行类",
    "交互验证"
  ],
  "focuses": [
    "JAVA_HOME",
    "javac",
    "classpath",
    "IDE SDK",
    "JShell",
    "诊断输出"
  ],
  "model": {
    "studio": "JDK 工具链复现台",
    "axisA": {
      "label": "执行入口",
      "levels": [
        "JShell",
        "命令行",
        "IDE构建"
      ]
    },
    "axisB": {
      "label": "环境显式度",
      "levels": [
        "依赖默认值",
        "固定JDK",
        "固定命令与类路径"
      ]
    },
    "outcomes": {
      "success": "环境一致率",
      "risk": "隐式配置风险",
      "evidence": "可重放证据"
    },
    "fault": "IDE 使用 JDK 25 而终端仍调用旧 javac，导致同一源码得到不同诊断",
    "task": "在终端和IDE各编译一次同一文件，并用版本、命令和字节码哈希证明环境一致",
    "invariant": "源码、JDK版本、编译选项和运行类路径四项均可重建",
    "probe": "javac --release 25 Hello.java && java Hello",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV102ProgrammingEnvironmentMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV102ProgrammingEnvironmentExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV102ProgrammingEnvironmentEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
