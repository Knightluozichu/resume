import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3eSecondEditionCrosswalkMapLab() { return <EjvDecisionMapLab title="第二版条目对照 · 决策图" focus="把第三版90条与第二版条目映射，识别新增、拆分、合并和因Java 7-9产生的建议变化" stages={stages} />; }
export function Ejv3eSecondEditionCrosswalkExperimentLab() { return <EjvTradeoffExperimentLab title="第二版条目对照 · 取舍实验" focus="版次映射表、迁移决策与过时建议清单" stages={stages} />; }
export function Ejv3eSecondEditionCrosswalkEvidenceLab() { return <EjvEvidenceLab title="第二版条目对照 · 反例证据" focus="按旧条目编号引用却不声明版次，导致评审、培训和代码规范指向不同规则" stages={stages} />; }
