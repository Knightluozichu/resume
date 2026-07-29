"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-10-outlook",
  title: "第10章：AUTOSAR技术展望",
  decision:
    "从威胁模型、密码与安全通信进入 Classic/Adaptive 选型、服务部署和生命周期，并给所有展望绑定当前版本",
  invariant:
    "平台、通信安全与部署方案由实时性、故障运行、硬件、更新和威胁需求驱动，不能按新旧标签替代工程论证",
  fault:
    "把 Adaptive 当作 Classic 的新版本，直接迁移硬实时车灯控制而没有任务时序、服务失效和平台资源分析",
  evidence:
    "威胁模型、密钥与新鲜度策略、SecOC 配置、CP/AP 需求矩阵、服务清单、部署与更新失败轨迹",
  concepts: [
    "第10章 AUTOSAR技术展望",
    "10.1 AUTOSAR与信息安全",
    "10.1.1 密码协议栈",
    "10.1.2 安全车载通信",
    "10.2 Adaptive AUTOSAR平台",
    "10.2.1 Adaptive AUTOSAR缘起",
    "10.2.2 AP和CP",
    "10.2.3 Adaptive AUTOSAR平台新概念介绍",
    "10.3 本章小结",
  ],
  pipeline: [
    {
      label: "威胁模型",
      artifact: "资产、攻击面、信任边界与失效后果",
    },
    {
      label: "安全通信",
      artifact: "密码服务、密钥、新鲜度与 SecOC",
    },
    {
      label: "平台选择",
      artifact: "Classic 硬实时与 Adaptive 高性能需求",
    },
    {
      label: "服务部署",
      artifact: "ARA、功能集群、服务发现与动态绑定",
    },
    {
      label: "生命周期",
      artifact: "版本、更新、回滚、监控与退役",
    },
  ],
  scenarios: [
    {
      label: "Classic 保留",
      input: "车灯控制要求受限资源上的确定性周期与成熟 BSW 集成",
      expected: "保留 Classic，并把安全通信与更新作为显式扩展需求",
    },
    {
      label: "Adaptive 服务",
      input: "高性能计算节点需要动态发现的更新服务与故障运行能力",
      expected: "基于 Adaptive 功能集群设计服务，同时隔离硬实时控制边界",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc210OutlookArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc210OutlookTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc210OutlookFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
