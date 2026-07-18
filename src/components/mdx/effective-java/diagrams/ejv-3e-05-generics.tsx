import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e05GenericsMapLab() { return <EjvDecisionMapLab title="第5章 泛型 · 决策图" focus="用可具体化类型、泛型类型/方法、通配符和异构容器把类型错误前移到编译期" stages={stages} />; }
export function Ejv3e05GenericsExperimentLab() { return <EjvTradeoffExperimentLab title="第5章 泛型 · 取舍实验" focus="unchecked清零记录、数组/列表对照、PECS测试与堆污染反例" stages={stages} />; }
export function Ejv3e05GenericsEvidenceLab() { return <EjvEvidenceLab title="第5章 泛型 · 反例证据" focus="保留raw type或unchecked警告，随后用强转把类型错误推迟到远离根因的位置" stages={stages} />; }
