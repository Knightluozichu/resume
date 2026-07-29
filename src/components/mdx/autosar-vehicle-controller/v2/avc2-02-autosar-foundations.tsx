"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-02-autosar-foundations",
  title: "第2章：AUTOSAR规范基础理论",
  decision:
    "用软件组件合同、VFB、部署映射、RTE 和 BSW 五层关系解释 Classic Platform，而不是背诵缩写",
  invariant:
    "应用组件不依赖具体 ECU 通信实现，部署变化由映射、RTE 与 BSW 配置吸收且端口语义保持一致",
  fault:
    "在 SWC 内直接读写某个 CAN 控制器寄存器，使 VFB 合同与部署独立性同时失效",
  evidence:
    "组件类型、端口接口、内部行为、VFB 连接、系统映射、RTE API 与 BSW 配置引用",
  concepts: [
    "第2章 AUTOSAR规范基础理论",
    "2.1 AUTOSAR的由来与发展历程",
    "2.1.1 AUTOSAR的由来",
    "2.1.2 AUTOSAR的原则及核心思想",
    "2.1.3 AUTOSAR的发展历程及应用现状",
    "2.2 AUTOSAR分层架构",
    "2.2.1 AUTOSAR应用软件层",
    "2.2.2 AUTOSAR运行时环境",
    "2.2.3 AUTOSAR基础软件层",
    "2.3 AUTOSAR软件组件",
    "2.3.1 软件组件的数据类型",
    "2.3.2 软件组件的端口与端口接口",
    "2.3.3 软件组件的内部行为",
    "2.4 AUTOSAR虚拟功能总线",
    "2.5 AUTOSAR方法论",
    "2.6 AUTOSAR应用接口",
    "2.7 本章小结",
  ],
  pipeline: [
    {
      label: "SWC 合同",
      artifact: "数据类型、端口、接口与内部行为",
    },
    {
      label: "VFB",
      artifact: "部署无关的逻辑通信关系",
    },
    {
      label: "系统映射",
      artifact: "实例、通信与 ECU 分配",
    },
    {
      label: "RTE",
      artifact: "组件到组件及基础软件的生成接口",
    },
    {
      label: "BSW",
      artifact: "服务、ECU 抽象、MCAL 与复杂驱动",
    },
  ],
  scenarios: [
    {
      label: "部署迁移",
      input: "保持 SWC 端口合同不变，把接收组件迁到另一 ECU",
      expected: "系统通信和 RTE/BSW 配置变化，应用行为合同不变",
    },
    {
      label: "越层访问",
      input: "让应用 runnable 直接调用硬件寄存器地址",
      expected: "架构门禁拒绝该依赖，并要求经标准服务或明确复杂驱动边界",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc202AutosarFoundationsArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc202AutosarFoundationsTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc202AutosarFoundationsFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
