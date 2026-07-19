import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-05-inheritance",
  "title": "卷I 第5章 继承",
  "concepts": [
    "Chapter 5: Inheritance",
    "5.1 Classes, Superclasses, and Subclasses",
    "5.2 Object: The Cosmic Superclass",
    "5.3 Generic Array Lists",
    "5.4 Object Wrappers and Autoboxing",
    "5.5 Methods with a Variable Number of Arguments",
    "5.6 Abstract Classes",
    "5.7 Enumeration Classes",
    "5.8 Sealed Classes",
    "5.9 Pattern Matching",
    "5.10 Reflection",
    "5.11 Design Hints for Inheritance"
  ],
  "stages": [
    "声明层级",
    "建立子类型",
    "动态分派",
    "模式覆盖",
    "反射审计"
  ],
  "focuses": [
    "is-a关系",
    "Object合同",
    "自动装箱",
    "sealed",
    "模式匹配",
    "反射访问"
  ],
  "model": {
    "studio": "子类型与分派决策台",
    "axisA": {
      "label": "层级开放度",
      "levels": [
        "final封闭",
        "sealed枚举",
        "开放继承"
      ]
    },
    "axisB": {
      "label": "分派方式",
      "levels": [
        "类型判断",
        "虚方法",
        "穷尽模式"
      ]
    },
    "outcomes": {
      "success": "替换一致度",
      "risk": "脆弱基类风险",
      "evidence": "可重放证据"
    },
    "fault": "子类破坏父类不变量，或反射绕开访问边界后仍宣称层级安全",
    "task": "给封闭层级增加一个变体，观察编译器如何暴露未穷尽分支并修复",
    "invariant": "任何父类型可接受位置都保持父合同与穷尽处理",
    "probe": "sealed-switch-probe",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV105InheritanceMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV105InheritanceExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV105InheritanceEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
