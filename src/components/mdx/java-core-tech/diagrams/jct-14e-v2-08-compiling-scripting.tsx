import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-08-compiling-scripting",
  "title": "卷II 第8章 编译与脚本",
  "concepts": [
    "Chapter 8: Compiling and Scripting",
    "8.1 The Compiler API",
    "8.2 Scripting for the Java Platform"
  ],
  "stages": [
    "接收源码",
    "调用编译器",
    "收集诊断",
    "隔离加载",
    "限制执行"
  ],
  "focuses": [
    "JavaCompiler",
    "DiagnosticCollector",
    "JavaFileObject",
    "类加载",
    "ScriptEngine",
    "不可信代码"
  ],
  "model": {
    "studio": "动态编译诊断台",
    "axisA": {
      "label": "代码来源",
      "levels": [
        "内置模板",
        "已签名插件",
        "用户文本"
      ]
    },
    "axisB": {
      "label": "执行隔离",
      "levels": [
        "同进程",
        "独立类加载器",
        "独立受限进程"
      ]
    },
    "outcomes": {
      "success": "诊断完备率",
      "risk": "代码执行风险",
      "evidence": "可重放证据"
    },
    "fault": "把用户文本直接送入编译或脚本引擎，并在同进程共享文件、网络和凭证",
    "task": "编译一段合法与一段非法源码，保存结构化诊断并说明为什么编译成功不等于可信",
    "invariant": "源码身份、编译选项、产物哈希和执行权限均可审计",
    "probe": "ToolProvider.getSystemJavaCompiler()",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV208CompilingScriptingMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV208CompilingScriptingExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV208CompilingScriptingEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
