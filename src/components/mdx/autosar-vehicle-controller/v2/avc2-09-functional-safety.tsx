"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-09-functional-safety",
  title: "第9章：AUTOSAR与功能安全",
  decision:
    "把安全要求映射到分区与 MPU、程序流监控、E2E 和故障证据，同时明确 AUTOSAR 机制不等于 ISO 26262 合规结论",
  invariant:
    "每个安全机制都对应明确故障假设、检测覆盖、反应、残余风险和验证证据，不能以模块存在替代安全论证",
  fault:
    "启用内存保护后宣称已满足 FFI，却没有验证共享资源、特权代码、配置错误和故障反应",
  evidence:
    "安全需求、分区映射、MPU 区域、任务与看门狗轨迹、E2E 状态、故障注入、覆盖与残余风险",
  concepts: [
    "第9章 AUTOSAR与功能安全",
    "9.1 AUTOSAR对ISO 26262中支持部分的要求概述",
    "9.1.1 ISO 26262对架构设计的要求",
    "9.1.2 ISO 26262对硬件验证的要求",
    "9.1.3 ISO 26262对通信验证的要求",
    "9.1.4 ISO 26262对FFI的要求",
    "9.1.5 ISO 26262对编码风格的要求",
    "9.2 AUTOSAR中实现FFI的安全机制",
    "9.2.1 AUTOSAR安全机制的存储空间分区",
    "9.2.2 AUTOSAR安全机制的存储空间保护",
    "9.2.3 AUTOSAR安全机制的程序流监控",
    "9.2.4 AUTOSAR安全机制的E2E保护",
    "9.3 本章小结",
  ],
  pipeline: [
    {
      label: "安全要求",
      artifact: "危害、故障假设、ASIL 与技术安全需求",
    },
    {
      label: "隔离机制",
      artifact: "分区、OS 应用、MPU 与访问控制",
    },
    {
      label: "流监控",
      artifact: "alive、deadline、logical supervision",
    },
    {
      label: "E2E",
      artifact: "数据 ID、计数器、CRC、新鲜度与状态",
    },
    {
      label: "安全证据",
      artifact: "故障注入、覆盖、反应与残余风险",
    },
  ],
  scenarios: [
    {
      label: "受控分区故障",
      input: "低完整性任务越界写入受保护区域",
      expected: "保护机制阻止或捕获访问，并按安全概念执行可追踪反应",
    },
    {
      label: "通信重复帧",
      input: "接收端得到 CRC 正确但计数器重复的受保护数据",
      expected: "E2E 状态报告序列异常，应用按定义处理而不是静默采用",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc209FunctionalSafetyArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc209FunctionalSafetyTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc209FunctionalSafetyFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
