import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV109CollectionsMapLab() { return <JctContractMapLab title="卷I 第9章 集合 · 合同图" focus="按顺序、唯一性、键值、并发和算法复杂度选择集合及视图" stages={stages} />; }
export function Jct14eV109CollectionsExperimentLab() { return <JctCapacityExperimentLab title="卷I 第9章 集合 · 容量实验" focus="集合决策表、equals/hashCode 性质测试与视图修改轨迹" stages={stages} />; }
export function Jct14eV109CollectionsEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第9章 集合 · 失败证据" focus="只按熟悉度选择 ArrayList/HashMap，忽略顺序、重复、视图联动和复杂度边界" stages={stages} />; }
