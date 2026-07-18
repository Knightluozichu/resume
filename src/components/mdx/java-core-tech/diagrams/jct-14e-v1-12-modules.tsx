import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV112ModulesMapLab() { return <JctContractMapLab title="卷I 第12章 Java 平台模块系统 · 合同图" focus="用 requires/exports/opens/services 建立可检查依赖图，并规划类路径迁移" stages={stages} />; }
export function Jct14eV112ModulesExperimentLab() { return <JctCapacityExperimentLab title="卷I 第12章 Java 平台模块系统 · 容量实验" focus="module-info 清单、可读性图、反射开放测试与迁移命令记录" stages={stages} />; }
export function Jct14eV112ModulesEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第12章 Java 平台模块系统 · 失败证据" focus="以 automatic/unnamed module 长期掩盖边界，或把 exports 与 opens 混为一谈" stages={stages} />; }
