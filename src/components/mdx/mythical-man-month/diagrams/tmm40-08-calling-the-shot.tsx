import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-08-calling-the-shot",
  title: "第8章 胸有成竹",
  question: "经理把五组历史生产率直接平均后承诺新项目日期",
  roles: ["历史数据负责人", "规模口径执行者", "独立项目评审者"],
  phases: ["筛选案例", "统一单位", "校准模型", "给出区间", "记录偏差"],
  concepts: [
    "第8章 胸有成竹",
    "Portman的数据",
    "Aron的数据",
    "Harr的数据",
    "OS/360的数据",
    "Corbató的数据",
  ],
  actions: [
    {
      label: "公开历史数据",
      detail:
        "让评审者先看到历史数据的定义和负责人，保持规模口径与人员口径不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验人员口径",
      detail: "在人员口径进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过不确定性",
      detail: "跳过不确定性直接追求重估条件，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["历史数据延期暴露", "人员口径清晰度", "重估条件风险"],
  boundaryNote: "历史数据只有在对象和口径可比时才提供先验，不产生确定承诺。",
  failureNote:
    "拒绝原因：不同产品阶段、规模单位和人员定义被合并成一个精确单点。",
} as const;

export function Tmm4008CallingTheShotDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4008CallingTheShotScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4008CallingTheShotEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
