"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-05",
  title: "悬架系统与车身姿态控制",
  focus:
    "用簧载—非簧载质量、弹簧、阻尼器和轮胎组成的动态模型解释舒适、接地、侧倾与俯仰之间的取舍",
  invariant:
    "悬架必须在可用行程内维持轮胎接地与车身可控，弹簧储能、阻尼耗能，两者职责不能互换",
  fault:
    "把更硬弹簧或更大阻尼直接等同于更好操控，忽略路面输入频率、轮胎载荷变化、行程和乘员加速度",
  evidence:
    "车身与车轮位移速度、悬架行程、垂向轮胎力、阻尼器速度、侧倾角、俯仰角和撞限位事件",
  concepts: [
    "簧载与非簧载质量",
    "弹簧刚度与静挠度",
    "阻尼与能量耗散",
    "麦弗逊与双叉臂",
    "多连杆与空气弹簧",
    "侧倾、俯仰与载荷转移",
  ],
  zones: [
    {
      label: "路面与车轮",
      detail: "轮胎变形、非簧载运动和接地力",
    },
    {
      label: "弹簧与阻尼",
      detail: "储能、耗能、行程、几何和热",
    },
    {
      label: "车身与乘员",
      detail: "垂向加速度、侧倾、俯仰和可控性",
    },
  ],
  trace: [
    "施加路面输入",
    "计算轮胎响应",
    "传递弹簧力",
    "耗散振动",
    "检查行程与接地",
  ],
  scenarios: [
    {
      label: "单轮短凸起",
      input: "一侧车轮快速越过短凸起，输入频率高且左右路面不同",
      expected:
        "车轮跟随路面同时限制车身冲击，阻尼使振动衰减且悬架不触底或离地",
    },
    {
      label: "紧急变线",
      input: "车辆快速建立横向加速度并发生左右载荷转移",
      expected:
        "姿态控制限制过渡速度并保留四轮有效接地，不能以完全刚性车身为目标",
    },
  ],
} satisfies VehicleSystemModel;

export function SuspensionSystemsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function SuspensionSystemsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function SuspensionSystemsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
