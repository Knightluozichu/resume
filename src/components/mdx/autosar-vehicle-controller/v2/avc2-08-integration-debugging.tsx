"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-08-integration-debugging",
  title: "第8章：AUTOSAR工程代码集成与调试",
  decision:
    "把各层生成源文件、编译链接、下载、A/B 型车灯调试和证据归档组成可重复集成闭环",
  invariant:
    "下载到控制器的二进制、map 文件、配置输入和源码提交属于同一次构建，调试修改必须回到受控源工件",
  fault:
    "调试器内临时改内存让车灯正常后直接截图结项，却没有把修正写回模型、配置或源码",
  evidence:
    "干净构建日志、编译选项、链接 map、二进制哈希、下载记录、断点轨迹、A/B 测量与修复提交",
  concepts: [
    "第8章 AUTOSAR工程代码集成与调试",
    "8.1 AUTOSAR工程代码架构与集成方法介绍",
    "8.2 代码编译链接",
    "8.3 代码调试",
    "8.3.1 单片机可执行文件下载",
    "8.3.2 A型车灯调试现象",
    "8.3.3 B型车灯调试现象",
    "8.4 本章小结",
  ],
  pipeline: [
    {
      label: "集成输入",
      artifact: "应用、RTE、BSW、OS、MCAL 生成源",
    },
    {
      label: "编译链接",
      artifact: "工具链、选项、内存布局与 map 文件",
    },
    {
      label: "下载启动",
      artifact: "目标连接、镜像哈希、复位与启动轨迹",
    },
    {
      label: "车灯调试",
      artifact: "A/B 型断点、信号、端口和硬件现象",
    },
    {
      label: "证据归档",
      artifact: "故障、修复、重放与发布制品",
    },
  ],
  scenarios: [
    {
      label: "A 型干净构建",
      input: "清空生成与构建目录，以冻结输入重新生成、编译、下载",
      expected: "目标二进制与记录哈希一致，A 型车灯轨迹可重放",
    },
    {
      label: "B 型无输出",
      input: "B 型需求有效但目标引脚没有预期波形",
      expected: "沿 runnable、RTE、BSW、MCAL、引脚顺序找到首个分岔并回写修正",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc208IntegrationDebuggingArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc208IntegrationDebuggingTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc208IntegrationDebuggingFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
