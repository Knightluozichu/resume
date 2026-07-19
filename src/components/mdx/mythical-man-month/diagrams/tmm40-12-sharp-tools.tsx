import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-12-sharp-tools",
  title: "第12章 干将莫邪",
  question: "团队准备换整套工具，却说不清当前等待时间和错误来自哪一环",
  roles: ["目标环境负责人", "辅助环境执行者", "独立项目评审者"],
  phases: ["测量等待", "定位瓶颈", "比较工具", "小范围试用", "验证收益"],
  concepts: [
    "第12章 干将莫邪",
    "目标机器",
    "辅助机器和数据服务",
    "高级语言和交互式编程",
  ],
  actions: [
    {
      label: "公开目标环境",
      detail:
        "让评审者先看到目标环境的定义和负责人，保持辅助环境与数据服务不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验数据服务",
      detail: "在数据服务进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过编程语言",
      detail: "跳过编程语言直接追求反馈周期，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["目标环境延期暴露", "数据服务清晰度", "反馈周期风险"],
  boundaryNote: "锋利工具改善附属工作，但不能替代问题建模和接口设计。",
  failureNote:
    "拒绝原因：工具采购缩短局部操作，却增加格式转换、环境漂移和维护负担。",
} as const;

export function Tmm4012SharpToolsDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4012SharpToolsScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4012SharpToolsEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
