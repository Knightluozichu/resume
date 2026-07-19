import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-official-learning-map",
  "title": "《Java核心技术（第14版·全两卷）》权威学习地图",
  "concepts": [
    "Volume I, Chapter 1: An Introduction to Java",
    "Volume I, Chapter 2: The Java Programming Environment",
    "Volume I, Chapter 3: Fundamental Programming Structures in Java",
    "Volume I, Chapter 4: Objects and Classes",
    "Volume I, Chapter 5: Inheritance",
    "Volume I, Chapter 6: Interfaces, Lambda Expressions, and Inner Classes",
    "Volume I, Chapter 7: Exceptions, Assertions, and Logging",
    "Volume I, Chapter 8: Generic Programming",
    "Volume I, Chapter 9: Collections",
    "Volume I, Chapter 10: Concurrency",
    "Volume I, Chapter 11: Annotations",
    "Volume I, Chapter 12: The Java Platform Module System",
    "Volume II, Chapter 1: Streams",
    "Volume II, Chapter 2: Input and Output",
    "Volume II, Chapter 3: XML",
    "Volume II, Chapter 4: Networking",
    "Volume II, Chapter 5: Database Programming",
    "Volume II, Chapter 6: The Date and Time API",
    "Volume II, Chapter 7: Internationalization",
    "Volume II, Chapter 8: Compiling and Scripting",
    "Volume II, Chapter 9: Security",
    "Volume II, Chapter 10: Graphical User Interface Programming",
    "Volume II, Chapter 11: User Interface Components with Swing",
    "Volume II, Chapter 12: Advanced Swing and Graphics",
    "Volume II, Chapter 13: The Foreign Functions and Memory API"
  ],
  "stages": [
    "冻结工具链",
    "语言与对象",
    "库与并发",
    "外部边界",
    "综合交接"
  ],
  "focuses": [
    "Java 25",
    "JLS语义",
    "JVM运行",
    "模块边界",
    "证据链",
    "迁移顺序"
  ],
  "model": {
    "studio": "两卷学习路径编排器",
    "axisA": {
      "label": "起点知识层",
      "levels": [
        "语法入门",
        "对象与类型",
        "系统边界"
      ]
    },
    "axisB": {
      "label": "证据强度",
      "levels": [
        "只读解释",
        "运行正常例",
        "故障与恢复"
      ]
    },
    "outcomes": {
      "success": "路径闭环度",
      "risk": "跨层跳跃风险",
      "evidence": "可重放证据"
    },
    "fault": "直接进入FFM或并发，却没有建立类型、生命周期和关闭合同",
    "task": "为目标项目选择首读章、依赖章与最终验收章，并给出不可跳过的先修证据",
    "invariant": "每条学习路径都能回到一个可编译探针、一个反例和一次复位",
    "probe": "java --version && javac --version",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eOfficialLearningMapMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eOfficialLearningMapExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eOfficialLearningMapEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
