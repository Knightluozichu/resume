import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-04-objects-classes",
  "title": "卷I 第4章 对象与类",
  "concepts": [
    "Chapter 4: Objects and Classes",
    "4.1 Introduction to Object-Oriented Programming",
    "4.2 Using Predefined Classes",
    "4.3 Defining Your Own Classes",
    "4.4 Static Fields and Methods",
    "4.5 Method Parameters",
    "4.6 Object Construction",
    "4.7 Records",
    "4.8 Packages",
    "4.9 JAR Files",
    "4.10 Documentation Comments",
    "4.11 Class Design Hints"
  ],
  "stages": [
    "声明状态",
    "构造对象",
    "调用方法",
    "封装包",
    "发布合同"
  ],
  "focuses": [
    "对象身份",
    "构造器",
    "参数传值",
    "record",
    "包可见性",
    "JAR元数据"
  ],
  "model": {
    "studio": "对象状态与别名观察台",
    "axisA": {
      "label": "状态暴露度",
      "levels": [
        "公开可变",
        "封装修改",
        "不可变值对象"
      ]
    },
    "axisB": {
      "label": "构造验证",
      "levels": [
        "无检查",
        "入口检查",
        "全路径不变量"
      ]
    },
    "outcomes": {
      "success": "不变量保持率",
      "risk": "别名泄漏风险",
      "evidence": "可重放证据"
    },
    "fault": "把对象引用的按值传递误说成对象复制，或让可变集合从访问器直接逃逸",
    "task": "构造两个共享引用的对象，修改一处并用身份、相等性与状态快照解释结果",
    "invariant": "所有公开操作前后对象不变量都成立",
    "probe": "System.identityHashCode(object)",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV104ObjectsClassesMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV104ObjectsClassesExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV104ObjectsClassesEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
