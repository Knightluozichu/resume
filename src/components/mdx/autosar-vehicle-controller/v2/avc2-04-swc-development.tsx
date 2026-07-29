"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-04-swc-development",
  title: "第4章：AUTOSAR软件组件级设计与开发",
  decision:
    "把 Simulink 行为、AUTOSAR 类型接口、runnable 事件、映射和 C/ARXML 生成组织成可往返核对的软件组件流水线",
  invariant:
    "模型、AUTOSAR 映射、生成代码和 ARXML 对同一端口、数据类型、runnable 周期与初始化值给出一致定义",
  fault: "修改生成后的 C 文件修复行为，却不回写模型或映射，下一次生成覆盖修复",
  evidence:
    "模型版本、求解器设置、端口映射、runnable 事件、生成报告、C 代码与 ARXML 差异",
  concepts: [
    "第4章 AUTOSAR软件组件级设计与开发",
    "4.1 Matlab/Simulink与Embedded Coder工具简介",
    "4.1.1 Matlab/Simulink工具简介",
    "4.1.2 Embedded Coder工具简介",
    "4.2 基于Matlab/Simulink的软件组件开发",
    "4.2.1 Matlab/Simulink与AUTOSAR基本概念的对应关系",
    "4.2.2 软件组件内部行为建模方法",
    "4.2.3 AUTOSAR客户端/服务器机制的实现方法",
    "4.3 软件组件代码及描述文件配置生成",
    "4.3.1 求解器及代码生成相关属性配置",
    "4.3.2 模型配置",
    "4.3.3 AUTOSAR Properties配置",
    "4.3.4 Simulink-AUTOSAR Mapping配置",
    "4.3.5 符合AUTOSAR规范的代码及描述文件生成",
    "4.4 在Simulink中导入软件组件描述文件——“自上而下”的工作流程",
    "4.5 本章小结",
  ],
  pipeline: [
    {
      label: "行为模型",
      artifact: "Simulink 逻辑、状态与测试向量",
    },
    {
      label: "AUTOSAR 合同",
      artifact: "类型、接口、端口与服务调用",
    },
    {
      label: "执行语义",
      artifact: "runnable、事件、周期与初始化",
    },
    {
      label: "模型映射",
      artifact: "Simulink 元素到 AUTOSAR 属性",
    },
    {
      label: "生成工件",
      artifact: "C 源码、头文件、ARXML 与报告",
    },
  ],
  scenarios: [
    {
      label: "自下而上创建",
      input: "从新模型定义算法并完成 AUTOSAR 映射和测试",
      expected: "生成代码与 ARXML 通过接口和行为一致性核对",
    },
    {
      label: "自上而下导入",
      input: "导入既有组件 ARXML 后补充内部行为并往返导出",
      expected: "外部合同不被悄然改写，差异报告只包含批准变更",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc204SwcDevelopmentArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc204SwcDevelopmentTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc204SwcDevelopmentFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
