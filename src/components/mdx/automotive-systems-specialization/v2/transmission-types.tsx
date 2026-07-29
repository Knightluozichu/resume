"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-03",
  title: "变速器类型与原理",
  focus:
    "用传动比把动力源转速扭矩映射到轮端，再比较 MT、液力自动、DCT 与 CVT 如何完成接合和换比",
  invariant:
    "换挡前后必须满足动力源允许转速、离合元件扭矩容量、轮端需求和热负荷边界，传动比不会凭空增加功率",
  fault:
    "只按挡位数量或宣称的换挡速度排序，忽略接合元件滑摩、液压控制、效率、热容量和低速可控性",
  evidence:
    "输入输出转速、目标与实际传动比、离合器压力、滑差、液力变矩器锁止、轮端扭矩和油温",
  concepts: [
    "传动比与轮端扭矩",
    "MT 与干式离合器",
    "液力自动变速器",
    "双离合变速器",
    "无级变速器",
    "换挡质量与热",
  ],
  zones: [
    {
      label: "动力源侧",
      detail: "允许转速、输入扭矩和目标高效区",
    },
    {
      label: "换比与接合",
      detail: "齿轮、带轮、离合器、制动器和液力元件",
    },
    {
      label: "轮端与热",
      detail: "牵引力、连续性、冲击、滑摩和油温",
    },
  ],
  trace: [
    "确定轮端需求",
    "选择目标速比",
    "准备接合元件",
    "交接扭矩",
    "验证同步与热",
  ],
  scenarios: [
    {
      label: "坡道起步",
      input: "车辆静止、轮端需求大，动力源必须从可运行转速向车轮零转速传递扭矩",
      expected:
        "离合器或液力元件受控滑动并限制热累积，不能把高挡效率当作起步能力",
    },
    {
      label: "高速降挡",
      input: "驾驶员请求超车，目标低挡会显著提高动力源转速",
      expected:
        "先验证目标转速与扭矩容量，再同步转速并完成扭矩交接，拒绝超转目标",
    },
  ],
} satisfies VehicleSystemModel;

export function TransmissionTypesSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function TransmissionTypesTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function TransmissionTypesFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
