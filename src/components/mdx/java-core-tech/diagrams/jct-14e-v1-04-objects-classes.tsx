import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV104ObjectsClassesMapLab() { return <JctContractMapLab title="卷I 第4章 对象与类 · 合同图" focus="设计类不变量、构造过程、参数传递、record、包、JAR 和文档合同" stages={stages} />; }
export function Jct14eV104ObjectsClassesExperimentLab() { return <JctCapacityExperimentLab title="卷I 第4章 对象与类 · 容量实验" focus="类职责卡、构造器测试、包/JAR 清单与 API 文档" stages={stages} />; }
export function Jct14eV104ObjectsClassesEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第4章 对象与类 · 失败证据" focus="公开可变状态或让构造后对象仍不完整，随后靠调用顺序维持隐藏前提" stages={stages} />; }
