import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV202InputOutputMapLab() { return <JctContractMapLab title="卷II 第2章 输入与输出 · 合同图" focus="统一字节/字符流、二进制数据、文件、内存映射、锁、序列化与正则边界" stages={stages} />; }
export function Jct14eV202InputOutputExperimentLab() { return <JctCapacityExperimentLab title="卷II 第2章 输入与输出 · 容量实验" focus="I/O 所有权图、格式合同、文件锁实验与损坏输入恢复测试" stages={stages} />; }
export function Jct14eV202InputOutputEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第2章 输入与输出 · 失败证据" focus="混淆字符编码与字节协议，或依赖 Java 序列化作为长期跨版本格式" stages={stages} />; }
