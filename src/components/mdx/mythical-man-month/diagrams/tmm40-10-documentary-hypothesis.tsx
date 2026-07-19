import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-10-documentary-hypothesis",
  title: "第10章 提纲挈领",
  question: "项目成员都很忙，关键日期和设计决定只存在聊天与个人记忆中",
  roles: ["产品基线负责人", "组织职责执行者", "独立项目评审者"],
  phases: ["识别读者", "定义文档", "指定所有者", "执行评审", "重建决定"],
  concepts: [
    "第10章 提纲挈领",
    "计算机产品的文档",
    "大学科系的文档",
    "软件项目的文档",
    "为什么要有正式的文档",
  ],
  actions: [
    {
      label: "公开产品基线",
      detail:
        "让评审者先看到产品基线的定义和负责人，保持组织职责与项目计划不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验项目计划",
      detail: "在项目计划进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过决定记录",
      detail: "跳过决定记录直接追求评审节奏，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["产品基线延期暴露", "项目计划清晰度", "评审节奏风险"],
  boundaryNote: "文档的价值在于控制和沟通，不以页数或模板完整度衡量。",
  failureNote:
    "拒绝原因：文档数量很多，却没有一份能回答当前基线、负责人和变更理由。",
} as const;

export function Tmm4010DocumentaryHypothesisDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4010DocumentaryHypothesisScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4010DocumentaryHypothesisEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
