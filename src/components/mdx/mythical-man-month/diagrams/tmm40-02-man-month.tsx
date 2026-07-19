import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-02-man-month",
  title: "第2章 人月神话",
  question: "已延期六周的项目准备在集成前把团队从 7 人扩到 14 人",
  roles: ["工作量负责人", "关键路径执行者", "独立项目评审者"],
  phases: ["分解任务", "绘制依赖", "计算路径", "评估增员", "重排范围"],
  concepts: [
    "第2章 人月神话",
    "乐观主义",
    "人月",
    "系统测试",
    "空泛的估算",
    "重复产生的进度灾难",
  ],
  actions: [
    {
      label: "公开工作量",
      detail:
        "让评审者先看到工作量的定义和负责人，保持关键路径与沟通通道不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验沟通通道",
      detail: "在沟通通道进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过系统测试",
      detail: "跳过系统测试直接追求进度恢复，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["工作量延期暴露", "沟通通道清晰度", "进度恢复风险"],
  boundaryNote: "只有真正独立且接口稳定的工作，增加人员才可能缩短日历时间。",
  failureNote: "拒绝原因：把人月当成可任意交换的人数与日历时间乘积。",
} as const;

export function Tmm4002ManMonthDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4002ManMonthScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4002ManMonthEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
