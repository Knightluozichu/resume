"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "调用系统接口",
  "检查返回值",
  "保存错误码",
  "补充调用上下文",
  "清理已获资源",
  "传播或终止",
] as const;
const concepts = [
  "附录A 错误处理",
  "A.1 Unix系统中的错误处理",
  "A.2 错误处理包装函数",
] as const;
const common = {
  title: "附录 A 错误处理",
  label: "附录 · Unix 错误处理",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;

export function CapAppendixAErrorHandlingMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function CapAppendixAErrorHandlingExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function CapAppendixAErrorHandlingEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
