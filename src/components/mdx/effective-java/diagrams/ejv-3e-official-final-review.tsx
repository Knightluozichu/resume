import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3eOfficialFinalReviewMapLab() { return <EjvDecisionMapLab title="《Effective Java（第3版）》全书总复习 · 决策图" focus="用公共API评审贯通90条Item的对象、类型、错误、并发与兼容性取舍" stages={stages} />; }
export function Ejv3eOfficialFinalReviewExperimentLab() { return <EjvTradeoffExperimentLab title="《Effective Java（第3版）》全书总复习 · 取舍实验" focus="90条Item验收矩阵、105节点覆盖表与冲突建议裁决记录" stages={stages} />; }
export function Ejv3eOfficialFinalReviewEvidenceLab() { return <EjvEvidenceLab title="《Effective Java（第3版）》全书总复习 · 反例证据" focus="机械套用单条建议，却没有处理Item之间、Java 9原始边界与Java 25现状之间的冲突" stages={stages} />; }
