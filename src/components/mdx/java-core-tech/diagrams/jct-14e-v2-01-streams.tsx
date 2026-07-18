import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV201StreamsMapLab() { return <JctContractMapLab title="卷II 第1章 Stream · 合同图" focus="从迭代迁移到惰性管道，掌握创建、转换、归约、Collector、Gatherer 与并行语义" stages={stages} />; }
export function Jct14eV201StreamsExperimentLab() { return <JctCapacityExperimentLab title="卷II 第1章 Stream · 容量实验" focus="管道阶段图、惰性观察、Collector/Gatherer 性质测试与并行基准" stages={stages} />; }
export function Jct14eV201StreamsEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第1章 Stream · 失败证据" focus="在 Stream 中隐藏副作用、误用 Optional.get，或未测量就启用并行" stages={stages} />; }
