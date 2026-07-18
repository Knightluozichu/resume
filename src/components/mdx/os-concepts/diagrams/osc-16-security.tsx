"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "识别资产威胁",
  "认证主体",
  "建立安全通信",
  "阻断程序威胁",
  "监测系统攻击",
  "审计响应",
] as const;
const concepts = [
  "第16章 安全",
  "16.1 安全问题",
  "16.2 程序威胁",
  "16.2.1 恶意软件",
  "16.2.2 代码注入",
  "16.2.3 病毒和蠕虫",
  "16.3 系统和网络威胁",
  "16.3.1 攻击网络传输",
  "16.3.2 拒绝服务",
  "16.3.3 端口扫描",
  "16.4 作为安全工具的密码学",
  "16.4.1 加密",
  "16.4.2 密码学的实现",
  "16.4.3 示例：TLS",
  "16.5 用户认证",
  "16.5.1 密码",
  "16.5.2 密码漏洞",
  "16.5.3 密码安全",
  "16.5.4 一次性密码",
  "16.5.5 生物识别技术",
  "16.6 实现安全防御",
  "16.6.1 安全策略",
  "16.6.2 漏洞评估",
  "16.6.3 入侵防御",
  "16.6.4 病毒防护",
  "16.6.5 审计、记账与日志",
  "16.6.6 保护系统和网络的防火墙",
  "16.6.7 其他解决方案",
  "16.6.8 安全防御总结",
  "16.7 示例：Windows 10",
  "16.8 本章小结",
] as const;
const common = {
  title: "第 16 章 安全",
  label: "第七部分 安全与保护",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Osc16SecurityMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc16SecurityExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc16SecurityEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
