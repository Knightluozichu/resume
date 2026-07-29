"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-01-automotive-electronics",
  title: "第1章：汽车电子控制系统介绍",
  decision:
    "把汽车电子从器件清单还原成传感输入、控制意图、ECU 软件、驱动输出和物理反馈的闭环",
  invariant:
    "控制输出只能由版本化需求、有效输入和显式降级状态共同决定，反馈必须能关联到同一次控制周期",
  fault: "传感器输入失效后继续沿用旧值驱动车灯，却没有质量位、超时或降级记录",
  evidence:
    "需求编号、输入有效性、控制周期、状态迁移、驱动命令、反馈值与诊断事件",
  concepts: [
    "第1章 汽车电子控制系统介绍",
    "1.1 电子技术在汽车上的应用",
    "1.1.1 汽车电子技术的发展历史",
    "1.1.2 汽车电子技术的应用现状",
    "1.2 汽车电子控制系统的基本构成",
    "1.3 车用控制器软件标准（从OSEK到AUTOSAR）",
    "1.4 本章小结",
  ],
  pipeline: [
    {
      label: "感知输入",
      artifact: "开关、总线信号与传感器质量",
    },
    {
      label: "控制意图",
      artifact: "A/B 车灯需求、优先级与降级",
    },
    {
      label: "ECU 软件",
      artifact: "应用算法、状态机与接口合同",
    },
    {
      label: "驱动输出",
      artifact: "I/O 抽象、MCAL 命令与执行器",
    },
    {
      label: "物理反馈",
      artifact: "灯态、电气测量与诊断记录",
    },
  ],
  scenarios: [
    {
      label: "正常点灯",
      input: "有效开关请求在规定周期进入 ECU，硬件条件满足",
      expected: "车灯按需求点亮，命令、反馈和时间戳属于同一追踪链",
    },
    {
      label: "输入超时",
      input: "车灯请求超过允许的新鲜度窗口且没有新样本",
      expected: "控制器进入定义的安全或降级状态并留下诊断证据",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc201AutomotiveElectronicsArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc201AutomotiveElectronicsTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc201AutomotiveElectronicsFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
