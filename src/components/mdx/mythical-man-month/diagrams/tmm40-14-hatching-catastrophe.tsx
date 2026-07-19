import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-14-hatching-catastrophe",
  title: "第14章 祸起萧墙",
  question: "每个小组只报告晚一两天，项目总体关键路径已经滑移一个月",
  roles: ["可判定里程碑负责人", "偏差趋势执行者", "独立项目评审者"],
  phases: ["定义完成", "采集事实", "重算路径", "公开偏差", "执行恢复"],
  concepts: [
    "第14章 祸起萧墙",
    "里程碑还是沉重的负担",
    "“其他的部分反正会落后”",
    "地毯的下面",
  ],
  actions: [
    {
      label: "公开可判定里程碑",
      detail:
        "让评审者先看到可判定里程碑的定义和负责人，保持偏差趋势与隐藏工作不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验隐藏工作",
      detail: "在隐藏工作进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过关键路径",
      detail: "跳过关键路径直接追求升级动作，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["可判定里程碑延期暴露", "隐藏工作清晰度", "升级动作风险"],
  boundaryNote: "透明偏差不是惩罚依据，而是及时改变范围和计划的控制信号。",
  failureNote:
    "拒绝原因：百分比长期接近完成，未完成条件和依赖阻塞却被藏在地毯下。",
} as const;

export function Tmm4014HatchingCatastropheDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4014HatchingCatastropheScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4014HatchingCatastropheEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
