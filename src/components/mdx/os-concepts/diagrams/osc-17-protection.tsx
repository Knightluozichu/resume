"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "定义保护对象",
  "识别访问主体",
  "查询访问矩阵",
  "执行权利检查",
  "传播或限制权利",
  "撤销并审计",
] as const;
const concepts = [
  "第17章 保护",
  "17.1 保护目标",
  "17.2 保护原则",
  "17.3 保护环",
  "17.4 保护域",
  "17.4.1 域结构",
  "17.4.2 示例：UNIX",
  "17.4.3 示例：Android应用程序ID",
  "17.5 访问矩阵",
  "17.6 访问矩阵的实现",
  "17.6.1 全局表",
  "17.6.2 访问对象列表",
  "17.6.3 域能力列表",
  "17.6.4 锁-钥匙机制",
  "17.6.5 比较",
  "17.7 撤回访问权限",
  "17.8 基于角色的访问控制",
  "17.9 强制访问控制",
  "17.10 基于能力的系统",
  "17.10.1 Linux能力",
  "17.10.2 Darwin权利",
  "17.11 其他保护改进方法",
  "17.11.1 系统完整性保护",
  "17.11.2 系统调用过滤",
  "17.11.3 沙箱",
  "17.11.4 代码签名",
  "17.12 基于语言的保护",
  "17.12.1 基于编译器的实现",
  "17.12.2 基于运行时的强制执行——Java中的保护",
  "17.13 本章小结",
] as const;
const common = {
  title: "第 17 章 保护",
  label: "第七部分 安全与保护",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;
export function Osc17ProtectionMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc17ProtectionExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc17ProtectionEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
