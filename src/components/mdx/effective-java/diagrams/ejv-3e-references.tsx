import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3eReferencesMapLab() { return <EjvDecisionMapLab title="参考文献 · 决策图" focus="把每条建议追溯到语言规范、JDK文档、论文或工程证据，并区分原书与后续版本事实" stages={stages} />; }
export function Ejv3eReferencesExperimentLab() { return <EjvTradeoffExperimentLab title="参考文献 · 取舍实验" focus="Item-来源-版本证据矩阵与引用复核记录" stages={stages} />; }
export function Ejv3eReferencesEvidenceLab() { return <EjvEvidenceLab title="参考文献 · 反例证据" focus="用博客共识替代规范，或引用当前API来证明Java 9时代原书没有提出的结论" stages={stages} />; }
