import { EjvDecisionMapLab, EjvTradeoffExperimentLab, EjvEvidenceLab } from "./official-ejv-lab";

const stages = ["声明情境", "比较方案", "构造反例", "度量取舍", "记录决议"];

export function Ejv3e07LambdasStreamsMapLab() { return <EjvDecisionMapLab title="第7章 Lambda 和 Stream · 决策图" focus="用标准函数接口、方法引用和无副作用管道表达行为，并审慎选择返回与并行策略" stages={stages} />; }
export function Ejv3e07LambdasStreamsExperimentLab() { return <EjvTradeoffExperimentLab title="第7章 Lambda 和 Stream · 取舍实验" focus="函数形状表、Stream副作用探针、Collection/Stream返回对照与并行基准" stages={stages} />; }
export function Ejv3e07LambdasStreamsEvidenceLab() { return <EjvEvidenceLab title="第7章 Lambda 和 Stream · 反例证据" focus="为了短代码把状态修改藏入Stream，或在未知分割成本和共享副作用时并行化" stages={stages} />; }
