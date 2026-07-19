import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-11-annotations",
  "title": "卷I 第11章 注解",
  "concepts": [
    "Chapter 11: Annotations",
    "11.1 Using Annotations",
    "11.2 Defining Annotations",
    "11.3 Annotations in the Java API",
    "11.4 Processing Annotations at Runtime",
    "11.5 Source-Level Annotation Processing",
    "11.6 Bytecode Engineering"
  ],
  "stages": [
    "定义注解",
    "选择目标",
    "保留元数据",
    "处理模型",
    "检查产物"
  ],
  "focuses": [
    "Target",
    "Retention",
    "重复注解",
    "反射处理",
    "Processor",
    "字节码"
  ],
  "model": {
    "studio": "注解生命周期处理台",
    "axisA": {
      "label": "处理阶段",
      "levels": [
        "SOURCE",
        "CLASS",
        "RUNTIME"
      ]
    },
    "axisB": {
      "label": "目标范围",
      "levels": [
        "TYPE",
        "METHOD",
        "TYPE_USE"
      ]
    },
    "outcomes": {
      "success": "元数据可用率",
      "risk": "阶段错配风险",
      "evidence": "可重放证据"
    },
    "fault": "选择SOURCE保留却在运行时反射读取，或处理器生成不稳定源码造成重复构建差异",
    "task": "切换Retention并分别检查源处理输出、class文件和运行时反射结果",
    "invariant": "使用方只在声明的目标与保留阶段读取注解",
    "probe": "element.getAnnotation(Audited.class)",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV111AnnotationsMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV111AnnotationsExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV111AnnotationsEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
