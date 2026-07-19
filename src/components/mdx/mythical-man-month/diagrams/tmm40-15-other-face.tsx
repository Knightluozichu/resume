import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-15-other-face",
  title: "第15章 另外一面",
  question: "接口实现正确，但新用户无法从文档完成首次配置和故障恢复",
  roles: ["用户任务负责人", "运行环境执行者", "独立项目评审者"],
  phases: ["识别读者", "描述任务", "提供示例", "演练错误", "验证更新"],
  concepts: ["第15章 另外一面", "需要什么样的文档", "流程图", "自文档化的程序"],
  actions: [
    {
      label: "公开用户任务",
      detail:
        "让评审者先看到用户任务的定义和负责人，保持运行环境与输入输出不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验输入输出",
      detail: "在输入输出进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过错误恢复",
      detail: "跳过错误恢复直接追求维护说明，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["用户任务延期暴露", "输入输出清晰度", "维护说明风险"],
  boundaryNote: "自解释代码服务维护者，不能替代面向使用者的行为合同。",
  failureNote:
    "拒绝原因：代码命名清晰，却缺少用户目的、约束、错误语义和迁移说明。",
} as const;

export function Tmm4015OtherFaceDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4015OtherFaceScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4015OtherFaceEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
