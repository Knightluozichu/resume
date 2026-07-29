"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-09",
  title: "车身电子系统",
  focus:
    "以 BCM 为功能协调者，连接开关输入、照明和门锁负载、LIN 子网、CAN 网关以及整车睡眠唤醒与电源预算",
  invariant:
    "每个车身功能都必须有明确的电源域、网络所有者、唤醒源、超时、故障降级和静态电流预算",
  fault:
    "把 BCM 当成所有负载的单体控制器，忽略分布式节点、网关隔离、局部 LIN 调度和休眠唤醒依赖",
  evidence:
    "输入状态、BCM 状态机、CAN/LIN 帧、负载电流、驱动反馈、唤醒原因、网络管理状态和休眠电流",
  concepts: [
    "BCM 功能所有权",
    "照明与负载驱动",
    "访问与安防状态机",
    "LIN commander/responder",
    "CAN 网关与信号边界",
    "睡眠、唤醒与静态电流",
  ],
  zones: [
    {
      label: "人机与本地负载",
      detail: "开关、门锁、灯、雨刮、电机与功率驱动",
    },
    {
      label: "BCM 与子网",
      detail: "状态机、LIN 调度、CAN 网关和诊断",
    },
    {
      label: "供电与休眠",
      detail: "电源域、唤醒源、超时和静态电流",
    },
  ],
  trace: ["接收事件", "验证状态", "调度网络", "驱动并反馈", "超时后休眠"],
  scenarios: [
    {
      label: "遥控解锁",
      input: "车辆休眠时收到合法钥匙请求，需要点亮迎宾灯并解锁指定车门",
      expected:
        "记录唤醒源、完成认证、按网络边界下发动作、确认负载反馈并在超时后重新休眠",
    },
    {
      label: "异常反复唤醒",
      input: "一个门模块周期性唤醒 LIN 子网和 CAN 网关但没有有效用户事件",
      expected: "定位唤醒源并隔离异常节点，验证整车能回到静态电流预算内",
    },
  ],
} satisfies VehicleSystemModel;

export function BodyElectronicsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function BodyElectronicsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function BodyElectronicsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
