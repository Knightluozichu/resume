import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e06EnumsAnnotationsMapLab() { return <EjvDecisionMapLab title="第6章 枚举和注解 · 决策图" focus="以枚举、EnumSet/EnumMap、注解与标记接口表达有限状态、元数据和类型边界" stages={stages} />; }
export function Ejv3e06EnumsAnnotationsExperimentLab() { return <EjvTradeoffExperimentLab title="第6章 枚举和注解 · 取舍实验" focus="状态模型、ordinal反例、注解处理测试与标记接口适用表" stages={stages} />; }
export function Ejv3e06EnumsAnnotationsEvidenceLab() { return <EjvEvidenceLab title="第6章 枚举和注解 · 反例证据" focus="把ordinal或命名模式当稳定协议，或用注解替代真正需要编译期类型约束的接口" stages={stages} />; }
