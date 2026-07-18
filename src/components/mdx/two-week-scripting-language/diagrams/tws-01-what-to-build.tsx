import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第1天 来，我们一起做些什么吧",
  label: "基础篇 · 语言前端",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结语言目标",
    "写出样例程序",
    "定义词法语法",
    "建立AST",
    "选择执行方式",
    "回归最小语言",
  ],
  concepts: [
    "第1部分 基础篇",
    "第1天 来，我们一起做些什么吧",
    "1.1 机器语言与汇编语言",
    "1.2 解释器与编译器",
    "1.3 开发语言处理器",
    "1.4 语言处理器的结构与本书的框架",
  ],
} as const;

export function Tws01WhatToBuildMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws01WhatToBuildExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws01WhatToBuildEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
