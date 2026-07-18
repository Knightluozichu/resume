import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV108GenericProgrammingMapLab() { return <JctContractMapLab title="卷I 第8章 泛型程序设计 · 合同图" focus="理解类型参数、擦除、继承规则、通配符限制与反射中的泛型信息" stages={stages} />; }
export function Jct14eV108GenericProgrammingExperimentLab() { return <JctCapacityExperimentLab title="卷I 第8章 泛型程序设计 · 容量实验" focus="泛型 API 合同、PECS 对照、擦除字节码观察与堆污染反例" stages={stages} />; }
export function Jct14eV108GenericProgrammingEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第8章 泛型程序设计 · 失败证据" focus="把泛型集合协变使用，或通过原始类型和未检查转换把错误推迟到运行时" stages={stages} />; }
