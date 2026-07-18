import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV111AnnotationsMapLab() { return <JctContractMapLab title="卷I 第11章 注解 · 合同图" focus="定义注解语义并比较运行时反射、源码处理和字节码工程的处理阶段" stages={stages} />; }
export function Jct14eV111AnnotationsExperimentLab() { return <JctCapacityExperimentLab title="卷I 第11章 注解 · 容量实验" focus="注解合同、处理阶段图、生成源码快照与字节码差异" stages={stages} />; }
export function Jct14eV111AnnotationsEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第11章 注解 · 失败证据" focus="把注解当作无成本元数据，忽略保留策略、目标位置、增量构建和生成代码可追踪性" stages={stages} />; }
