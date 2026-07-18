import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e10ExceptionsMapLab() { return <EjvDecisionMapLab title="第10章 异常 · 决策图" focus="把异常限定于异常条件，选择可恢复/编程错误类型，翻译抽象、保留诊断并维持失败原子性" stages={stages} />; }
export function Ejv3e10ExceptionsExperimentLab() { return <EjvTradeoffExperimentLab title="第10章 异常 · 取舍实验" focus="异常分类、翻译链、failure-capture字段与原子性故障注入" stages={stages} />; }
export function Ejv3e10ExceptionsEvidenceLab() { return <EjvEvidenceLab title="第10章 异常 · 反例证据" focus="把异常用于流程控制、吞掉cause或在失败后留下半更新对象" stages={stages} />; }
