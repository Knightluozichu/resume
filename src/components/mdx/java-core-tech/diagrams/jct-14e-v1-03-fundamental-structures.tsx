import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV103FundamentalStructuresMapLab() { return <JctContractMapLab title="卷I 第3章 Java 基本程序结构 · 合同图" focus="掌握数据类型、表达式、字符串、输入输出、控制流、大数与数组的精确语义" stages={stages} />; }
export function Jct14eV103FundamentalStructuresExperimentLab() { return <JctCapacityExperimentLab title="卷I 第3章 Java 基本程序结构 · 容量实验" focus="类型/溢出表、控制流测试与数组边界实验" stages={stages} />; }
export function Jct14eV103FundamentalStructuresEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第3章 Java 基本程序结构 · 失败证据" focus="依赖隐式转换、浮点精确相等或字符串引用身份，制造数据边界缺陷" stages={stages} />; }
