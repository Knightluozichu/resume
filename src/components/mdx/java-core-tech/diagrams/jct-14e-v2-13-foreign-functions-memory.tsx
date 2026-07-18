import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV213ForeignFunctionsMemoryMapLab() { return <JctContractMapLab title="卷II 第13章 外部函数与内存 API · 合同图" focus="比较 JNI 与 FFM，管理 Arena、MemorySegment、MemoryLayout、下调句柄和回调生命周期" stages={stages} />; }
export function Jct14eV213ForeignFunctionsMemoryExperimentLab() { return <JctCapacityExperimentLab title="卷II 第13章 外部函数与内存 API · 容量实验" focus="ABI 合同、内存布局图、Arena 生命周期与越界/回调压力测试" stages={stages} />; }
export function Jct14eV213ForeignFunctionsMemoryEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第13章 外部函数与内存 API · 失败证据" focus="让 MemorySegment 逃逸 Arena，或以错误 ABI 布局调用本地函数造成内存破坏" stages={stages} />; }
