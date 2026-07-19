import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-08-generic-programming",
  "title": "卷I 第8章 泛型程序设计",
  "concepts": [
    "Chapter 8: Generic Programming",
    "8.1 Type Parameters",
    "8.2 Generic Code and the Virtual Machine",
    "8.3 Inheritance Rules for Generic Types",
    "8.4 Wildcard Types",
    "8.5 Restrictions and Limitations",
    "8.6 Reflection and Generics"
  ],
  "stages": [
    "声明类型参数",
    "施加界限",
    "检查变型",
    "执行擦除",
    "反射复核"
  ],
  "focuses": [
    "类型界限",
    "擦除",
    "不变性",
    "PECS",
    "桥方法",
    "Type令牌"
  ],
  "model": {
    "studio": "泛型约束与擦除观察台",
    "axisA": {
      "label": "类型约束",
      "levels": [
        "raw type",
        "无界参数",
        "有界通配符"
      ]
    },
    "axisB": {
      "label": "数据方向",
      "levels": [
        "只生产",
        "读写混合",
        "只消费"
      ]
    },
    "outcomes": {
      "success": "编译期约束率",
      "risk": "堆污染风险",
      "evidence": "可重放证据"
    },
    "fault": "通过 raw type 或未检查转换制造堆污染，再把延迟出现的 ClassCastException 当成偶发错误",
    "task": "从不安全raw调用开始，加入类型参数和PECS边界，比较编译诊断与运行失败位置",
    "invariant": "集合元素类型在所有写入路径上保持一致",
    "probe": "bounded-wildcard-probe",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV108GenericProgrammingMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV108GenericProgrammingExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV108GenericProgrammingEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
