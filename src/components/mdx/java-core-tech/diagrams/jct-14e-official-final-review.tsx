import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eOfficialFinalReviewMapLab() { return <JctContractMapLab title="《Java核心技术（第14版·全两卷）》全书总复习 · 合同图" focus="以一个模块化服务贯通 Java 25 类型、Stream、虚拟线程、I/O、HTTP、JDBC、安全、国际化与 FFM" stages={stages} />; }
export function Jct14eOfficialFinalReviewExperimentLab() { return <JctCapacityExperimentLab title="《Java核心技术（第14版·全两卷）》全书总复习 · 容量实验" focus="25章验收矩阵、214节点追踪表与跨层故障档案" stages={stages} />; }
export function Jct14eOfficialFinalReviewEvidenceLab() { return <JctFailureEvidenceLab title="《Java核心技术（第14版·全两卷）》全书总复习 · 失败证据" focus="单章示例都能运行，但跨层故障时无法定位类型、协议、事务、线程、密钥和本地内存所有权" stages={stages} />; }
