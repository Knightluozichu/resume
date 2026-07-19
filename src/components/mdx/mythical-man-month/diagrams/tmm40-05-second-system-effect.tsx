import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-05-second-system-effect",
  title: "第5章 画蛇添足",
  question: "完成首版后，架构师准备一次加入所有曾被推迟的高级能力",
  roles: ["第二系统负责人", "功能预算执行者", "独立项目评审者"],
  phases: ["收集愿望", "声明预算", "比较组合", "删除延后", "验证主路径"],
  concepts: [
    "第5章 画蛇添足",
    "结构师的交互准则和机制",
    "自律——开发第二个系统所带来的后果",
  ],
  actions: [
    {
      label: "公开第二系统",
      detail:
        "让评审者先看到第二系统的定义和负责人，保持功能预算与架构自律不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验架构自律",
      detail: "在架构自律进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过删除清单",
      detail: "跳过删除清单直接追求用户证据，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["第二系统延期暴露", "架构自律清晰度", "用户证据风险"],
  boundaryNote: "经验能暴露首版缺口，却不自动证明所有补偿性功能都值得加入。",
  failureNote:
    "拒绝原因：每项功能单独合理，但组合后破坏性能、可学性和交付窗口。",
} as const;

export function Tmm4005SecondSystemEffectDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4005SecondSystemEffectScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4005SecondSystemEffectEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
