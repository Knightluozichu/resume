import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-12-modules",
  "title": "卷I 第12章 Java 平台模块系统",
  "concepts": [
    "Chapter 12: The Java Platform Module System",
    "12.1 The Module Concept",
    "12.2 Naming Modules",
    "12.3 The Modular \"Hello, World!\" Program",
    "12.4 Requiring Modules",
    "12.5 Exporting Packages",
    "12.6 Modular JARs",
    "12.7 Modules and Reflective Access",
    "12.8 Automatic Modules",
    "12.9 The Unnamed Module",
    "12.10 Command-Line Flags for Migration",
    "12.11 Transitive and Static Requirements",
    "12.12 Importing Modules",
    "12.13 Qualified Exporting and Opening",
    "12.14 Service Loading",
    "12.15 Tools for Working with Modules"
  ],
  "stages": [
    "命名模块",
    "声明依赖",
    "导出API",
    "开放反射",
    "链接运行时"
  ],
  "focuses": [
    "module-info",
    "requires",
    "exports",
    "opens",
    "ServiceLoader",
    "jdeps"
  ],
  "model": {
    "studio": "模块可读性图验证台",
    "axisA": {
      "label": "依赖声明",
      "levels": [
        "未命名模块",
        "自动模块",
        "显式模块"
      ]
    },
    "axisB": {
      "label": "包暴露",
      "levels": [
        "封闭",
        "exports",
        "opens"
      ]
    },
    "outcomes": {
      "success": "边界可解释度",
      "risk": "封装穿透风险",
      "evidence": "可重放证据"
    },
    "fault": "为修复反射错误直接open整个模块，或依赖自动模块名却没有迁移记录",
    "task": "从类路径应用迁到模块路径，逐项解释可读性、导出和反射失败",
    "invariant": "编译期可读性与运行时反射权限分别最小化声明",
    "probe": "jdeps --print-module-deps app.jar",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV112ModulesMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV112ModulesExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV112ModulesEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
