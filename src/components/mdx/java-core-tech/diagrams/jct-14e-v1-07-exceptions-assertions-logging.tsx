import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV107ExceptionsAssertionsLoggingMapLab() { return <JctContractMapLab title="卷I 第7章 异常、断言与日志 · 合同图" focus="区分可恢复失败、程序错误和诊断信息，设计异常传播、断言和结构化日志" stages={stages} />; }
export function Jct14eV107ExceptionsAssertionsLoggingExperimentLab() { return <JctCapacityExperimentLab title="卷I 第7章 异常、断言与日志 · 容量实验" focus="异常分类表、失败注入测试、日志字段与调试决策树" stages={stages} />; }
export function Jct14eV107ExceptionsAssertionsLoggingEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第7章 异常、断言与日志 · 失败证据" focus="捕获根类型后继续运行，或用日志文本替代异常合同和可测试状态" stages={stages} />; }
