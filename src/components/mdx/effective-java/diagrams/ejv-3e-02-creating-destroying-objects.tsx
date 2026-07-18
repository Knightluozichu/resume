import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e02CreatingDestroyingObjectsMapLab() { return <EjvDecisionMapLab title="第2章 创建和销毁对象 · 决策图" focus="控制构造入口、依赖、实例数量、对象分配、引用寿命与资源关闭" stages={stages} />; }
export function Ejv3e02CreatingDestroyingObjectsExperimentLab() { return <EjvTradeoffExperimentLab title="第2章 创建和销毁对象 · 取舍实验" focus="构造策略矩阵、对象生命周期图与资源泄漏测试" stages={stages} />; }
export function Ejv3e02CreatingDestroyingObjectsEvidenceLab() { return <EjvEvidenceLab title="第2章 创建和销毁对象 · 反例证据" focus="追求语法简短而制造非法中间状态、硬编码依赖、陈旧引用或不可预测清理" stages={stages} />; }
