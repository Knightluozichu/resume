import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3eOfficialLearningMapMapLab() { return <EjvDecisionMapLab title="《Effective Java（第3版）》权威学习地图 · 决策图" focus="沿对象生命周期、类型/API合同、函数式处理、异常、并发和序列化风险组织90条工程建议" stages={stages} />; }
export function Ejv3eOfficialLearningMapExperimentLab() { return <EjvTradeoffExperimentLab title="《Effective Java（第3版）》权威学习地图 · 取舍实验" focus="12章90条Item路线、105节点追踪表与Item决策档案" stages={stages} />; }
export function Ejv3eOfficialLearningMapEvidenceLab() { return <EjvEvidenceLab title="《Effective Java（第3版）》权威学习地图 · 反例证据" focus="按九个泛主题阅读而丢失Item编号、相互引用、前提取舍和序列化/通用编程完整章节" stages={stages} />; }
