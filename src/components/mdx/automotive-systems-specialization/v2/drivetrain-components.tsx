"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-04",
  title: "传动系统与驱动布局",
  focus:
    "沿动力源、接合元件、变速器、主减速器、差速器、半轴和轮胎追踪扭矩，并比较前驱、后驱与全驱的边界",
  invariant:
    "左右轮允许转速差但轮端扭矩受最弱附着与差速器策略约束；所有布局都必须满足轴系强度、万向节角度和热边界",
  fault:
    "把 AWD 解释成任何路面都能等额获得四轮牵引，忽略中央与轴间差速、轮胎差异、限滑策略和可用附着",
  evidence:
    "各轴转速扭矩、差速状态、离合器锁止、轮速、滑移、传动损失、温度和轮胎周长一致性",
  concepts: [
    "接合元件",
    "主减速与差速器",
    "传动轴与半轴",
    "前置前驱",
    "前置后驱",
    "全轮驱动",
  ],
  zones: [
    {
      label: "动力输入",
      detail: "动力源、离合器或液力接合与变速器",
    },
    {
      label: "轴系分配",
      detail: "主减速、中央/轴间差速、传动轴和半轴",
    },
    {
      label: "轮胎接地",
      detail: "轮速差、附着、滑移、热与结构载荷",
    },
  ],
  trace: [
    "请求轮端扭矩",
    "沿轴系分配",
    "允许轮速差",
    "识别附着瓶颈",
    "记录限扭证据",
  ],
  scenarios: [
    {
      label: "单轮冰面",
      input: "一个驱动轮附着突然降低，其余轮仍处于高附着路面",
      expected:
        "开放式差速会暴露传扭限制；限滑或制动控制只能在硬件和热边界内重新分配",
    },
    {
      label: "弯道加速",
      input: "内外轮路径长度不同且驾驶员请求较大驱动扭矩",
      expected: "允许必要轮速差并约束滑移，不能用刚性锁止破坏转向与传动系",
    },
  ],
} satisfies VehicleSystemModel;

export function DrivetrainComponentsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function DrivetrainComponentsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function DrivetrainComponentsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
