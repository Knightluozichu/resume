import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e12SerializationMapLab() { return <EjvDecisionMapLab title="第12章 序列化 · 决策图" focus="优先显式格式；必须序列化时控制可攻击面、自定义表示、readObject、不变量和代理" stages={stages} />; }
export function Ejv3e12SerializationExperimentLab() { return <EjvTradeoffExperimentLab title="第12章 序列化 · 取舍实验" focus="格式威胁模型、反序列化攻击测试、代理往返与版本迁移方案" stages={stages} />; }
export function Ejv3e12SerializationEvidenceLab() { return <EjvEvidenceLab title="第12章 序列化 · 反例证据" focus="把Serializable当无成本标记，允许不可信字节直接构造违反不变量的对象图" stages={stages} />; }
