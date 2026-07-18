import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV105InheritanceMapLab() { return <JctContractMapLab title="卷I 第5章 继承 · 合同图" focus="在继承、多态、抽象类、密封层级、模式匹配与反射之间维持类型合同" stages={stages} />; }
export function Jct14eV105InheritanceExperimentLab() { return <JctCapacityExperimentLab title="卷I 第5章 继承 · 容量实验" focus="密封类型树、动态分派轨迹与反射访问边界测试" stages={stages} />; }
export function Jct14eV105InheritanceEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第5章 继承 · 失败证据" focus="为代码复用滥用继承，或以无约束反射绕过封装和模块开放边界" stages={stages} />; }
