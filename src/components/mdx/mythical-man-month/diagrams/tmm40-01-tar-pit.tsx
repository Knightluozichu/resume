import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-01-tar-pit",
  title: "第1章 焦油坑",
  question: "一个可运行原型被要求两周内变成多人维护、跨环境交付的产品",
  roles: ["程序负责人", "产品化执行者", "独立项目评审者"],
  phases: ["运行原型", "明确用户", "组合系统", "产品加固", "交付维护"],
  concepts: ["第1章 焦油坑", "编程系统产品", "职业的乐趣", "职业的苦恼"],
  actions: [
    {
      label: "公开程序",
      detail: "让评审者先看到程序的定义和负责人，保持产品化与系统集成不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验系统集成",
      detail: "在系统集成进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过职业乐趣",
      detail: "跳过职业乐趣直接追求工程苦恼，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["程序延期暴露", "系统集成清晰度", "工程苦恼风险"],
  boundaryNote: "原型价值真实存在，但不能用原型完成度代替产品完成度。",
  failureNote:
    "拒绝原因：只计算编码工时，遗漏测试、文档、接口、运维和用户约束。",
} as const;

export function Tmm4001TarPitDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4001TarPitScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4001TarPitEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
