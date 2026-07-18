import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e04ClassesInterfacesMapLab() { return <EjvDecisionMapLab title="第4章 类和接口 · 决策图" focus="缩小可访问面、保持不可变性、优先组合和接口，并为继承与嵌套类型建立合同" stages={stages} />; }
export function Ejv3e04ClassesInterfacesExperimentLab() { return <EjvTradeoffExperimentLab title="第4章 类和接口 · 取舍实验" focus="API表面积清单、组合/继承对照、密封边界与二进制兼容测试" stages={stages} />; }
export function Ejv3e04ClassesInterfacesEvidenceLab() { return <EjvEvidenceLab title="第4章 类和接口 · 反例证据" focus="暴露字段和实现类型，或在没有继承文档时允许子类依赖可变内部细节" stages={stages} />; }
