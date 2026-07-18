import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e03CommonObjectMethodsMapLab() { return <EjvDecisionMapLab title="第3章 所有对象都通用的方法 · 决策图" focus="维护equals、hashCode、toString、clone与Comparable之间的代数和集合合同" stages={stages} />; }
export function Ejv3e03CommonObjectMethodsExperimentLab() { return <EjvTradeoffExperimentLab title="第3章 所有对象都通用的方法 · 取舍实验" focus="相等性性质测试、哈希集合实验、字符串诊断与排序一致性检查" stages={stages} />; }
export function Ejv3e03CommonObjectMethodsEvidenceLab() { return <EjvEvidenceLab title="第3章 所有对象都通用的方法 · 反例证据" focus="用字段列表机械生成方法却破坏对称、传递、hash一致或compareTo与equals一致性" stages={stages} />; }
