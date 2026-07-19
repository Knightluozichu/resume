import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-03-fundamental-structures",
  "title": "卷I 第3章 Java 基本程序结构",
  "concepts": [
    "Chapter 3: Fundamental Programming Structures in Java",
    "3.1 A Simple Java Program",
    "3.2 Comments",
    "3.3 Data Types",
    "3.4 Variables and Constants",
    "3.5 Operators",
    "3.6 Strings",
    "3.7 Input and Output",
    "3.8 Control Flow",
    "3.9 Big Numbers",
    "3.10 Arrays"
  ],
  "stages": [
    "词法与类型",
    "表达式求值",
    "控制路径",
    "输入输出",
    "边界断言"
  ],
  "focuses": [
    "基本类型",
    "变量作用域",
    "运算转换",
    "String不可变",
    "控制流",
    "数组边界"
  ],
  "model": {
    "studio": "表达式与控制流单步台",
    "axisA": {
      "label": "输入边界",
      "levels": [
        "正常值",
        "零与空",
        "极值与溢出"
      ]
    },
    "axisB": {
      "label": "数值表示",
      "levels": [
        "primitive",
        "BigInteger",
        "BigDecimal"
      ]
    },
    "outcomes": {
      "success": "结果正确率",
      "risk": "隐式转换风险",
      "evidence": "可重放证据"
    },
    "fault": "整数溢出、浮点金额比较或数组越界被一次正常输出掩盖",
    "task": "修改输入与数值类型，解释编译期转换、运行结果和边界诊断的首个差异",
    "invariant": "每条控制路径都产生明确类型的结果或明确失败",
    "probe": "Math.addExact(Integer.MAX_VALUE, 1)",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV103FundamentalStructuresMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV103FundamentalStructuresExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV103FundamentalStructuresEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
