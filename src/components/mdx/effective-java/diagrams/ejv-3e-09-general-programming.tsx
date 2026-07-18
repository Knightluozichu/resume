import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e09GeneralProgrammingMapLab() { return <EjvDecisionMapLab title="第9章 通用程序设计 · 决策图" focus="控制变量作用域、循环、库、精确数值、装箱、字符串、接口、反射、本地方法、优化和命名" stages={stages} />; }
export function Ejv3e09GeneralProgrammingExperimentLab() { return <EjvTradeoffExperimentLab title="第9章 通用程序设计 · 取舍实验" focus="通用代码审查表、精度/装箱反例、基准与命名一致性检查" stages={stages} />; }
export function Ejv3e09GeneralProgrammingEvidenceLab() { return <EjvEvidenceLab title="第9章 通用程序设计 · 反例证据" focus="在没有测量和正确性合同前微优化，或用String、反射、native绕过更强类型和标准库" stages={stages} />; }
