import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e11ConcurrencyMapLab() { return <EjvDecisionMapLab title="第11章 并发 · 决策图" focus="同步共享可变状态，缩小锁范围，优先并发工具，并明确线程安全、初始化和调度边界" stages={stages} />; }
export function Ejv3e11ConcurrencyExperimentLab() { return <EjvTradeoffExperimentLab title="第11章 并发 · 取舍实验" focus="happens-before图、锁/任务清单、线程安全文档与调度压力测试" stages={stages} />; }
export function Ejv3e11ConcurrencyEvidenceLab() { return <EjvEvidenceLab title="第11章 并发 · 反例证据" focus="依赖线程调度或可见性偶然，或在锁内调用外部方法造成活性和性能缺陷" stages={stages} />; }
