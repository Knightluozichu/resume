import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3eIndexMapLab() { return <EjvDecisionMapLab title="索引 · 决策图" focus="按症状、API、合同和Item编号双向检索建议，并把反例路由到正确章节" stages={stages} />; }
export function Ejv3eIndexExperimentLab() { return <EjvTradeoffExperimentLab title="索引 · 取舍实验" focus="症状索引、同义词表、Item反向链接与盲检索测试" stages={stages} />; }
export function Ejv3eIndexEvidenceLab() { return <EjvEvidenceLab title="索引 · 反例证据" focus="索引只重复关键词而不能从heap pollution、failure atomicity或scheduler依赖找到决策路径" stages={stages} />; }
