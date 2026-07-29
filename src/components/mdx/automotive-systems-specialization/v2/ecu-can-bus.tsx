"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-07",
  title: "ECU 与 CAN 总线",
  focus:
    "从差分物理层、位级仲裁、帧校验、确认、错误计数到 bus-off，解释多 ECU 如何共享总线并限制故障节点",
  invariant:
    "同一仲裁期间显性位覆盖隐性位且低数值标识符获胜；消息成功发送、被确认和被应用层接受是三个不同事实",
  fault:
    "把 CAN 标识符当节点地址，或由 ACK 推断所有目标 ECU 都理解并执行了消息语义",
  evidence:
    "CAN_H/CAN_L 波形、终端阻抗、标识符、帧字段、CRC、ACK、错误帧、发送/接收错误计数和 bus-off 状态",
  concepts: [
    "差分物理层与终端",
    "多主无损仲裁",
    "标识符与优先级",
    "帧、CRC 与 ACK",
    "错误状态与 bus-off",
    "CAN FD 边界",
  ],
  zones: [
    {
      label: "物理总线",
      detail: "差分电平、双绞线、终端、拓扑和采样",
    },
    {
      label: "数据链路",
      detail: "仲裁、帧字段、CRC、ACK 和错误限制",
    },
    {
      label: "应用语义",
      detail: "信号缩放、超时、滚动计数、诊断与动作",
    },
  ],
  trace: [
    "检查终端",
    "采样差分位",
    "执行仲裁",
    "验证帧与错误",
    "解码并验收动作",
  ],
  scenarios: [
    {
      label: "两帧同时发送",
      input: "制动状态帧与舒适功能帧在总线空闲后同时开始发送",
      expected: "较高优先级标识符无损获胜，另一节点退出并在总线再次空闲后重试",
    },
    {
      label: "持续位错误",
      input: "一个节点收发器故障，连续制造位错误并发送错误帧",
      expected:
        "错误计数推动其进入受限状态直至 bus-off，网络隔离故障而不是无限重试占满总线",
    },
  ],
} satisfies VehicleSystemModel;

export function EcuCanBusSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function EcuCanBusTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function EcuCanBusFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
