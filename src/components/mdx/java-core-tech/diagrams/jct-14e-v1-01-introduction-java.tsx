import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV101IntroductionJavaMapLab() { return <JctContractMapLab title="卷I 第1章 Java 概述 · 合同图" focus="从平台、语言设计目标、历史包袱和常见误解建立 Java 25 的能力边界" stages={stages} />; }
export function Jct14eV101IntroductionJavaExperimentLab() { return <JctCapacityExperimentLab title="卷I 第1章 Java 概述 · 容量实验" focus="平台事实表、版本时间线与误解反例集" stages={stages} />; }
export function Jct14eV101IntroductionJavaEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第1章 Java 概述 · 失败证据" focus="把 Java 等同于 JVM、浏览器 Applet 或单一实现，导致版本和部署判断失真" stages={stages} />; }
