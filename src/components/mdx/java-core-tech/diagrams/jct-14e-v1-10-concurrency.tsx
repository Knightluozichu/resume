import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV110ConcurrencyMapLab() { return <JctContractMapLab title="卷I 第10章 并发 · 合同图" focus="比较平台线程与虚拟线程，建立任务协调、同步、线程安全集合、异步计算和进程边界" stages={stages} />; }
export function Jct14eV110ConcurrencyExperimentLab() { return <JctCapacityExperimentLab title="卷I 第10章 并发 · 容量实验" focus="线程模型决策、happens-before 图、压力测试与关闭验收" stages={stages} />; }
export function Jct14eV110ConcurrencyEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第10章 并发 · 失败证据" focus="把虚拟线程当作共享状态安全方案，或忽略取消、超时、背压和资源上限" stages={stages} />; }
