"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-07-mcal",
  title: "第7章：AUTOSAR ECU级开发之MCAL",
  decision:
    "把时钟、引脚、定时器、I/O、采样、波形、捕获和 CAN 配置约束到同一硬件资源图，再生成初始化代码并实测",
  invariant:
    "每个外设时钟、引脚复用、中断与 DMA 资源只有一个批准所有者，配置值可由芯片手册和板级测量复算",
  fault:
    "PWM 与 DIO 同时占用同一引脚复用，两个模块各自生成成功但集成后灯态不确定",
  evidence:
    "芯片变体、时钟树、引脚复用表、中断/DMA 分配、MCAL 配置、生成代码与示波器或总线测量",
  concepts: [
    "第7章 AUTOSAR ECU级开发之MCAL",
    "7.1 MCAL配置工具入门",
    "7.1.1 MCAL配置工具安装方法",
    "7.1.2 MCAL配置工具界面说明",
    "7.1.3 MCAL配置工程创建方法",
    "7.2 MCAL模块配置方法及常用接口函数介绍",
    "7.2.1 Mcu模块",
    "7.2.2 Gpt模块",
    "7.2.3 Port模块",
    "7.2.4 Dio模块",
    "7.2.5 Adc模块",
    "7.2.6 Pwm模块",
    "7.2.7 Icu模块",
    "7.2.8 Can模块",
    "7.2.9 Base与Resource模块",
    "7.3 MCAL配置验证与代码生成",
    "7.4 本章小结",
  ],
  pipeline: [
    {
      label: "硬件基线",
      artifact: "芯片变体、时钟、封装与板级连接",
    },
    {
      label: "资源配置",
      artifact: "Mcu、Port、Base 与共享资源所有权",
    },
    {
      label: "驱动模块",
      artifact: "Gpt、Dio、Adc、Pwm、Icu、Can",
    },
    {
      label: "生成初始化",
      artifact: "配置校验、初始化顺序与驱动代码",
    },
    {
      label: "硬件测量",
      artifact: "引脚电平、周期、捕获值与 CAN 帧",
    },
  ],
  scenarios: [
    {
      label: "车灯 PWM",
      input: "配置时钟、Port 与 Pwm 通道，以固定占空比驱动车灯",
      expected: "生成值可复算且测得频率、占空比和极性符合配置",
    },
    {
      label: "引脚冲突",
      input: "让同一物理引脚同时分配给 Dio 输出与 Pwm 通道",
      expected: "资源门禁在生成或集成前拒绝双重所有权",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc207McalArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc207McalTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc207McalFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
