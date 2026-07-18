"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "声明文档语义",
  "构造树状标签",
  "绑定命名空间",
  "校验结构约束",
  "解析节点或事件",
  "交换并验证数据",
] as const;
const concepts = [
  "第11章 XML是什么",
  "11.1 XML是标记语言",
  "11.2 XML是可扩展的语言",
  "11.3 XML是元语言",
  "11.4 XML可以为信息赋予意义",
  "11.5 XML是通用的数据交换格式",
  "11.6 可以为XML标签设定命名空间",
  "11.7 可以严格地定义XML的文档结构",
  "11.8 用于解析XML的组件",
  "11.9 XML可用于各种各样的领域",
] as const;
const common = {
  title: "第 11 章 XML是什么",
  label: "计算机怎样运行 · 网络与数据交换",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain,
  concepts,
} as const;
export function Hcw11XmlMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw11XmlExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw11XmlEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
