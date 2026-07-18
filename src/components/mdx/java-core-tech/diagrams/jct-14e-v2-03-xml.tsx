import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV203XmlMapLab() { return <JctContractMapLab title="卷II 第3章 XML · 合同图" focus="在 DOM、流式解析、Schema、XPath、命名空间、生成和 XSLT 之间选择并加固解析器" stages={stages} />; }
export function Jct14eV203XmlExperimentLab() { return <JctCapacityExperimentLab title="卷II 第3章 XML · 容量实验" focus="XML 格式合同、解析器安全配置、XPath/命名空间测试与往返验证" stages={stages} />; }
export function Jct14eV203XmlEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第3章 XML · 失败证据" focus="解析不可信 XML 时允许外部实体，或用无命名空间 XPath 得到静默空结果" stages={stages} />; }
