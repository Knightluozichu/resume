"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "final-review",
  title: "《AUTOSAR规范与车用控制器软件开发》全书总复习",
  decision:
    "从 A/B 型车灯需求一路重建 SWC、系统映射、ECU 栈、硬件输出、安全机制和发布证据",
  invariant:
    "最终演示的每个灯态、诊断和安全反应都能双向追溯到批准需求、版本化配置、同一次构建和可重放测试",
  fault:
    "只保留能工作的目标板和演示视频，丢失 ARXML、生成输入、构建哈希与故障轨迹",
  evidence:
    "需求—组件—系统—ECU—硬件追踪矩阵、冻结输入、干净构建、二进制哈希、故障注入和独立复核",
  concepts: [
    "需求与变体",
    "SWC 与系统",
    "RTE/BSW/OS",
    "MCAL 与集成",
    "安全与生命周期",
  ],
  pipeline: [
    {
      label: "需求与变体",
      artifact: "A/B 型车灯功能、时序、诊断与安全反应",
    },
    {
      label: "SWC 与系统",
      artifact: "合同、Composition、通信与 ECU 映射",
    },
    {
      label: "ECU 实现",
      artifact: "RTE、BSW、OS、MCAL 配置和生成代码",
    },
    {
      label: "目标验证",
      artifact: "编译、下载、灯态测量与故障注入",
    },
    {
      label: "发布证据",
      artifact: "版本、追踪、残余风险、回滚与签核",
    },
  ],
  scenarios: [
    {
      label: "全链干净重建",
      input: "从冻结需求和 ARXML 清空生成目录，重新生成、构建、下载并重放",
      expected: "A/B 场景与原验收一致，所有输出可双向追溯",
    },
    {
      label: "单点故障复核",
      input: "分别注入输入超时、端口错配、引脚冲突或重复通信帧",
      expected: "门禁在声明层捕获故障，恢复后同输入轨迹回到基线",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc2OfficialFinalReviewArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc2OfficialFinalReviewTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc2OfficialFinalReviewFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
