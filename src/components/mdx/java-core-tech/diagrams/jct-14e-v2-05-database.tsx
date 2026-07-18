import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV205DatabaseMapLab() { return <JctContractMapLab title="卷II 第5章 数据库编程 · 合同图" focus="从 JDBC、SQL、配置、语句、结果集、元数据、事务到连接池建立资源与一致性合同" stages={stages} />; }
export function Jct14eV205DatabaseExperimentLab() { return <JctCapacityExperimentLab title="卷II 第5章 数据库编程 · 容量实验" focus="SQL 参数化清单、事务时序、连接池预算与故障恢复测试" stages={stages} />; }
export function Jct14eV205DatabaseEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第5章 数据库编程 · 失败证据" focus="拼接 SQL 或在异常路径遗漏 rollback/close，造成注入、部分提交和连接耗尽" stages={stages} />; }
