import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV208CompilingScriptingMapLab() { return <JctContractMapLab title="卷II 第8章 编译与脚本 · 合同图" focus="用 Compiler API 和脚本引擎处理动态代码，同时隔离来源、权限、缓存和诊断" stages={stages} />; }
export function Jct14eV208CompilingScriptingExperimentLab() { return <JctCapacityExperimentLab title="卷II 第8章 编译与脚本 · 容量实验" focus="编译任务合同、诊断收集器与不可信代码威胁模型" stages={stages} />; }
export function Jct14eV208CompilingScriptingEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第8章 编译与脚本 · 失败证据" focus="把用户文本直接送入编译器/脚本引擎，或不记录生成代码与产物哈希" stages={stages} />; }
