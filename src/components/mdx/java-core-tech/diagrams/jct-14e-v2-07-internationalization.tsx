import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV207InternationalizationMapLab() { return <JctContractMapLab title="卷II 第7章 国际化 · 合同图" focus="把 Locale、数字、日期、排序、规范化、消息、文本边界、编码和资源包作为数据合同" stages={stages} />; }
export function Jct14eV207InternationalizationExperimentLab() { return <JctCapacityExperimentLab title="卷II 第7章 国际化 · 容量实验" focus="Locale 矩阵、Unicode 规范化测试、消息资源与回退验收" stages={stages} />; }
export function Jct14eV207InternationalizationEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第7章 国际化 · 失败证据" focus="用默认 Locale/字符集处理持久数据，或按 UTF-16 code unit 截断用户可见字符" stages={stages} />; }
