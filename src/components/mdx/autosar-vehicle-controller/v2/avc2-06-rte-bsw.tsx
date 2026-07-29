"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-06-rte-bsw",
  title: "第6章：AUTOSAR ECU级开发之RTE与BSW（除MCAL外）",
  decision:
    "从 ECU Extract 驱动 CAN、EcuM、BswM、RTE 与 OS 配置，把合同阶段和生成阶段分开验收",
  invariant:
    "通信周期、模式、runnable 事件、任务映射和生成 API 对同一系统工件保持引用闭合，启动顺序不读未初始化服务",
  fault:
    "先生成 RTE，再修改端口与任务映射却继续链接旧 RTE 源码，得到表面可编译的混合版本",
  evidence:
    "ECU Extract 哈希、BSW 配置引用、RTE contract 头文件、任务事件表、生成日志与链接映射",
  concepts: [
    "第6章 AUTOSAR ECU级开发之RTE与BSW（除MCAL外）",
    "6.1 ETAS RTA系列工具简介",
    "6.1.1 RTA-BSW简介",
    "6.1.2 RTA-RTE简介",
    "6.1.3 RTA-OS简介",
    "6.2 ETAS RTA系列工具入门",
    "6.2.1 RTA系列工具安装方法",
    "6.2.2 RTA系列工具界面说明",
    "6.3 CAN通信协议栈概念与配置方法介绍",
    "6.3.1 CAN通信协议栈概念",
    "6.3.2 CAN通信协议栈配置方法",
    "6.4 EcuM模块概念与配置方法介绍",
    "6.5 BswM模块概念与配置方法介绍",
    "6.6 BSW模块代码生成",
    "6.7 服务软件组件与应用层软件组件端口连接",
    "6.8 RTE配置与代码生成",
    "6.8.1 RTE Contract阶段生成",
    "6.8.2 RTE配置",
    "6.8.3 RTE Generation阶段生成",
    "6.9 AUTOSAR操作系统概念与配置方法介绍",
    "6.9.1 AUTOSAR操作系统概念",
    "6.9.2 RTA-OS工程创建",
    "6.9.3 AUTOSAR操作系统配置方法",
    "6.9.4 RTA-OS工程编译",
    "6.10 本章小结",
  ],
  pipeline: [
    {
      label: "ECU Extract",
      artifact: "目标 ECU 的组件、通信与资源输入",
    },
    {
      label: "BSW 配置",
      artifact: "CAN、EcuM、BswM 和服务模块",
    },
    {
      label: "RTE Contract",
      artifact: "应用可编译的接口合同",
    },
    {
      label: "RTE Generation",
      artifact: "完成映射后的 RTE 实现代码",
    },
    {
      label: "OS 构建",
      artifact: "任务、事件、资源、优先级与可执行文件",
    },
  ],
  scenarios: [
    {
      label: "一致生成",
      input:
        "冻结 ECU Extract 后依次配置 BSW、生成 contract、映射 OS 再生成 RTE",
      expected: "API、任务和通信引用闭合，冷启动轨迹符合模式设计",
    },
    {
      label: "混合版本",
      input: "在 contract 后修改端口映射但复用旧生成目录",
      expected: "版本门禁识别输入哈希变化并要求清理后重新生成",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc206RteBswArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc206RteBswTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc206RteBswFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
