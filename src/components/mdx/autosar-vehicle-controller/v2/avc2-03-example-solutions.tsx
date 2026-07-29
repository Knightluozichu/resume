"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-03-example-solutions",
  title: "第3章：本书示例及AUTOSAR系统解决方案介绍",
  decision:
    "把 A/B 型车灯示例写成需求变体、组合结构、ECU 映射、生成栈和输出轨迹，而不是只展示工具截图",
  invariant:
    "A 型与 B 型差异必须在需求或变体配置中显式出现，共享组件合同不得被隐式复制成两套不一致实现",
  fault: "为 B 型车灯临时改写生成代码，导致模型、ARXML 与 ECU 二进制无法追溯",
  evidence:
    "变体需求、Composition 连接、ECU 分配、ARXML 差异、生成哈希与两型输出轨迹",
  concepts: [
    "第3章 本书示例及AUTOSAR系统解决方案介绍",
    "3.1 本书示例介绍",
    "3.1.1 示例开发需求介绍",
    "3.1.2 示例总体方案设计",
    "3.1.3 示例系统设计",
    "3.1.4 示例系统AUTOSAR架构",
    "3.2 ETAS AUTOSAR系统解决方案介绍",
    "3.3 本书AUTOSAR系统解决方案介绍",
    "3.4 本章小结",
  ],
  pipeline: [
    {
      label: "需求变体",
      artifact: "A/B 型车灯输入、输出与时序差异",
    },
    {
      label: "组合设计",
      artifact: "共享 SWC、变体点与端口连接",
    },
    {
      label: "ECU 映射",
      artifact: "实例、通信信号与控制器分配",
    },
    {
      label: "生成栈",
      artifact: "RTE、BSW、OS、MCAL 配置与代码",
    },
    {
      label: "输出轨迹",
      artifact: "两型灯态、诊断与测量对比",
    },
  ],
  scenarios: [
    {
      label: "A 型基线",
      input: "选择 A 型需求与对应配置，从冻结输入生成并运行",
      expected: "灯态轨迹符合 A 型预期且每个输出可回溯到共享合同",
    },
    {
      label: "B 型变体",
      input: "只切换批准的 B 型变体工件，禁止手改生成代码",
      expected: "差异限定在声明的变体点，公共行为和证据链保持一致",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc203ExampleSolutionsArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc203ExampleSolutionsTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc203ExampleSolutionsFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
