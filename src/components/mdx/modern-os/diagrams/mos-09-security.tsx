"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "识别威胁主体",
  "认证访问者",
  "检查保护域",
  "执行密码协议",
  "阻断漏洞利用",
  "审计并恢复",
] as const;
const concepts = [
  "第9章 安全",
  "9.1 环境安全",
  "9.1.1 威胁",
  "9.1.2 入侵者",
  "9.2 操作系统完全",
  "9.2.1 可信系统",
  "9.2.2 可信计算基",
  "9.3 保护机制",
  "9.3.1 保护域",
  "9.3.2 访问控制列表",
  "9.3.3 权能字",
  "9.4 安全系统的形式化模型",
  "9.4.1 多级安全",
  "9.4.2 隐蔽信道",
  "9.5 密码学原理",
  "9.5.1 私钥加密技术",
  "9.5.2 公钥加密技术",
  "9.5.3 单向函数",
  "9.5.4 数字签名",
  "9.5.5 可信平台模块",
  "9.6 认证",
  "9.6.1 使用物理识别的认证方式",
  "9.6.2 使用生物识别的认证方式",
  "9.7 软件漏洞",
  "9.7.1 缓冲区溢出攻击",
  "9.7.2 格式化字符串攻击",
  "9.7.3 悬垂指针",
  "9.7.4 空指针间接引用攻击",
  "9.7.5 整数溢出攻击",
  "9.7.6 命令注入攻击",
  "9.7.7 检查时间/使用时间攻击",
  "9.8 内部攻击",
  "9.8.1 逻辑炸弹",
  "9.8.2 后门陷阱",
  "9.8.3 登录欺骗",
  "9.9 恶意软件",
  "9.9.1 特洛伊木马",
  "9.9.2 病毒",
  "9.9.3 蠕虫",
  "9.9.4 间谍软件",
  "9.9.5 rootkit",
  "9.10 防御",
  "9.10.1 防火墙",
  "9.10.2 反病毒和抑制反病毒技术",
  "9.10.3 代码签名",
  "9.10.4 囚禁",
  "9.10.5 基于模型的入侵检测",
  "9.10.6 封装移动代码",
  "9.10.7 Java安全性",
  "9.11 有关安全的研究",
  "9.12 小结",
] as const;
const common = {
  title: "第 9 章 安全",
  label: "现代操作系统 · 安全与防御",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;

export function Mos09SecurityMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos09SecurityExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos09SecurityEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
