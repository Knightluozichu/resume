import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-13-whole-and-parts",
  title: "第13章 整体部分",
  question: "所有单元测试通过，系统联调仍持续暴露接口和时序缺陷",
  roles: ["防错设计负责人", "单元测试执行者", "独立项目评审者"],
  phases: ["设计防错", "验证构件", "冻结接口", "逐层集成", "系统回归"],
  concepts: [
    "第13章 整体部分",
    "剔除bug的设计",
    "构件单元调试",
    "系统集成调试",
  ],
  actions: [
    {
      label: "公开防错设计",
      detail:
        "让评审者先看到防错设计的定义和负责人，保持单元测试与接口契约不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验接口契约",
      detail: "在接口契约进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过集成顺序",
      detail: "跳过集成顺序直接追求系统验证，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["防错设计延期暴露", "接口契约清晰度", "系统验证风险"],
  boundaryNote: "单元正确是必要条件，不是系统行为正确的充分条件。",
  failureNote: "拒绝原因：构件各自正确，却对协议、资源和故障假设没有共同测试。",
} as const;

export function Tmm4013WholeAndPartsDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4013WholeAndPartsScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4013WholeAndPartsEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
