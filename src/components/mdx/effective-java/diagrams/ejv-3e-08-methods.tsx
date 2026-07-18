import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e08MethodsMapLab() { return <EjvDecisionMapLab title="第8章 方法 · 决策图" focus="以参数验证、防御复制、清晰签名、谨慎重载/varargs、空集合、Optional和文档设计API" stages={stages} />; }
export function Ejv3e08MethodsExperimentLab() { return <EjvTradeoffExperimentLab title="第8章 方法 · 取舍实验" focus="方法合同表、突变攻击测试、重载解析样例与API文档验收" stages={stages} />; }
export function Ejv3e08MethodsEvidenceLab() { return <EjvEvidenceLab title="第8章 方法 · 反例证据" focus="让null、可变别名或含糊重载进入API，迫使调用者猜测正常和失败语义" stages={stages} />; }
