import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-09-ten-pounds",
  title: "第9章 削足适履",
  question: "固件已经集成才发现镜像超出目标设备容量 18%",
  roles: ["空间预算负责人", "构件配额执行者", "独立项目评审者"],
  phases: ["声明上限", "分配预算", "选择表示", "持续测量", "处理超限"],
  concepts: [
    "第9章 削足适履",
    "作为成本的程序空间",
    "规模控制",
    "空间技能",
    "数据的表现形式是编程的根本",
  ],
  actions: [
    {
      label: "公开空间预算",
      detail:
        "让评审者先看到空间预算的定义和负责人，保持构件配额与数据表示不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验数据表示",
      detail: "在数据表示进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过共享开销",
      detail: "跳过共享开销直接追求增长余量，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["空间预算延期暴露", "数据表示清晰度", "增长余量风险"],
  boundaryNote: "局部优化不能破坏正确性和可维护性，预算必须预留演进空间。",
  failureNote:
    "拒绝原因：所有构件单独满足目标，但共享开销和数据表示让总体超限。",
} as const;

export function Tmm4009TenPoundsDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4009TenPoundsScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4009TenPoundsEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
