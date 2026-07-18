import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV102ProgrammingEnvironmentMapLab() { return <JctContractMapLab title="卷I 第2章 Java 编程环境 · 合同图" focus="安装并验证 JDK，用命令行、IDE 与 JShell 构造同一可复现编译运行链" stages={stages} />; }
export function Jct14eV102ProgrammingEnvironmentExperimentLab() { return <JctCapacityExperimentLab title="卷I 第2章 Java 编程环境 · 容量实验" focus="JDK 25 环境清单、命令记录与 IDE/CLI 等价性测试" stages={stages} />; }
export function Jct14eV102ProgrammingEnvironmentEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第2章 Java 编程环境 · 失败证据" focus="只记录 IDE 绿色按钮而没有 javac/java 命令，导致他人无法复现构建" stages={stages} />; }
