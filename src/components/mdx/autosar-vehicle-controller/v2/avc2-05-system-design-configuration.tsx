"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-05-system-design-configuration",
  title: "第5章：AUTOSAR系统级设计与配置",
  decision:
    "从共享数据类型和端口接口建立 SWC 与 Composition，再完成系统通信、ECU 映射和 ECU Extract",
  invariant:
    "系统级每条连接的两端类型兼容、实例唯一、通信映射闭合，ECU Extract 只包含目标 ECU 所需且可追溯的系统信息",
  fault:
    "两个团队分别定义同名但不兼容的数据类型，直到 RTE 生成阶段才发现端口无法连接",
  evidence:
    "类型字典、端口接口、SWC 原型、Composition 连接、系统信号、ECU 映射和 ECU Extract 差异",
  concepts: [
    "第5章 AUTOSAR系统级设计与配置",
    "5.1 ETAS ISOLAR-A工具简介",
    "5.2 ETAS ISOLAR-A工具入门",
    "5.2.1 ISOLAR-A安装方法",
    "5.2.2 ISOLAR-A界面说明",
    "5.3 基于ISOLAR-A的软件组件设计方法",
    "5.3.1 AUTOSAR工程创建",
    "5.3.2 数据类型定义",
    "5.3.3 端口接口设计",
    "5.3.4 软件组件设计",
    "5.3.5 I/O硬件抽象层软件组件设计",
    "5.3.6 软件组件模板生成",
    "5.4 基于ISOLAR-A的系统级设计与配置方法",
    "5.4.1 系统配置输入文件创建与导入",
    "5.4.2 Composition SWC建立",
    "5.4.3 系统配置",
    "5.4.4 ECU信息抽取",
    "5.5 本章小结",
  ],
  pipeline: [
    {
      label: "共享类型",
      artifact: "应用与实现数据类型、约束和单位",
    },
    {
      label: "端口与 SWC",
      artifact: "接口、端口原型、组件类型与模板",
    },
    {
      label: "Composition",
      artifact: "组件原型、连接器与层级边界",
    },
    {
      label: "系统映射",
      artifact: "通信、实例与 ECU 分配",
    },
    {
      label: "ECU Extract",
      artifact: "目标 ECU 的系统配置输入",
    },
  ],
  scenarios: [
    {
      label: "完整系统映射",
      input: "导入批准类型与组件，建立车灯 Composition 并映射目标 ECU",
      expected: "连接检查通过且 ECU Extract 可独立供 ECU 配置使用",
    },
    {
      label: "类型冲突",
      input: "发送端与接收端使用不同范围或单位的同名数据类型",
      expected: "系统门禁在生成前报告不兼容引用并阻止 Extract 发布",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc205SystemDesignConfigurationArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc205SystemDesignConfigurationTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc205SystemDesignConfigurationFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
