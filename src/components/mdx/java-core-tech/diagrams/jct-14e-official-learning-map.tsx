import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eOfficialLearningMapMapLab() { return <JctContractMapLab title="《Java核心技术（第14版·全两卷）》权威学习地图 · 合同图" focus="从语言与类型系统，经集合、并发和模块，到 I/O、网络、数据库、安全、UI 与 FFM 的 Java 25 工程链" stages={stages} />; }
export function Jct14eOfficialLearningMapExperimentLab() { return <JctCapacityExperimentLab title="《Java核心技术（第14版·全两卷）》权威学习地图 · 容量实验" focus="两卷25章路线、214节点覆盖表与 Java 25 工程证据档案" stages={stages} />; }
export function Jct14eOfficialLearningMapEvidenceLab() { return <JctFailureEvidenceLab title="《Java核心技术（第14版·全两卷）》权威学习地图 · 失败证据" focus="沿旧10页主题跳读，遗漏模块、Gatherer、虚拟线程、内置HTTP服务器、Class File API和FFM边界" stages={stages} />; }
