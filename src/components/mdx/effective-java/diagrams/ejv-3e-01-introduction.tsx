import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e01IntroductionMapLab() { return <EjvDecisionMapLab title="第1章 导言 · 决策图" focus="把90条建议视为带前提和取舍的工程判断，而不是脱离情境的Java戒律" stages={stages} />; }
export function Ejv3e01IntroductionExperimentLab() { return <EjvTradeoffExperimentLab title="第1章 导言 · 取舍实验" focus="Item决策记录模板、Java 9基线与Java 25复核清单" stages={stages} />; }
export function Ejv3e01IntroductionEvidenceLab() { return <EjvEvidenceLab title="第1章 导言 · 反例证据" focus="只背结论，不记录适用前提、替代方案、代价和推翻结论的反例" stages={stages} />; }
