import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "附录A 函数原型",
  label: "附录",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "定位功能族",
    "确认头文件",
    "展开宏条件",
    "核对原型",
    "编译告警",
    "记录平台差异",
  ],
  concepts: ["附录A 函数原型"],
} as const;

export function UapAppendixAFunctionPrototypesMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapAppendixAFunctionPrototypesExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapAppendixAFunctionPrototypesEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
