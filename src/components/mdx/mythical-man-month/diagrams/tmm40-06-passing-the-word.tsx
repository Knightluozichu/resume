import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-06-passing-the-word",
  title: "第6章 贯彻执行",
  question: "接口规范更新后，五个实现团队对兼容行为产生三种解释",
  roles: ["规范手册负责人", "形式定义执行者", "独立项目评审者"],
  phases: ["提出变更", "修订规范", "广播决定", "实现对齐", "一致性测试"],
  concepts: [
    "第6章 贯彻执行",
    "文档化的规格说明——手册",
    "形式化定义",
    "直接整合",
    "会议和大会",
    "多重实现",
    "电话日志",
    "产品测试",
  ],
  actions: [
    {
      label: "公开规范手册",
      detail:
        "让评审者先看到规范手册的定义和负责人，保持形式定义与争议决定不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验争议决定",
      detail: "在争议决定进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过多重实现",
      detail: "跳过多重实现直接追求产品测试，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["规范手册延期暴露", "争议决定清晰度", "产品测试风险"],
  boundaryNote: "形式化与会议各补一类缺口，任何单一媒介都不能独占一致性。",
  failureNote:
    "拒绝原因：规范正文已更新，但示例、实现、测试和争议决定仍停留在旧版本。",
} as const;

export function Tmm4006PassingTheWordDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4006PassingTheWordScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4006PassingTheWordEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
