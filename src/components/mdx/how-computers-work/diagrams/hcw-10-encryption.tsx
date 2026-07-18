"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "定义安全目标",
  "编码明文",
  "选择算法密钥",
  "生成密文或签名",
  "验证解密与来源",
  "测试篡改和错钥",
] as const;
const concepts = [
  "第10章 试着加密数据吧",
  "10.1 先来明确一下什么是加密",
  "10.2 错开字符编码的加密方式",
  "10.3 密钥越长，解密越困难",
  "10.4 适用于互联网的公开密钥加密技术",
  "10.5 数字签名可以证明数据的发送者是谁",
] as const;
const common = {
  title: "第 10 章 试着加密数据吧",
  label: "计算机怎样运行 · 网络与数据交换",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Hcw10EncryptionMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw10EncryptionExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw10EncryptionEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
