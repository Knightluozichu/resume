import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-translator-preface",
  title: "译者序",
  question: "评审者核对中英文目录时发现同一术语在三个章节出现不同译法",
  roles: ["版次负责人", "译名执行者", "独立项目评审者"],
  phases: ["锁定版本", "对齐目录", "核对译名", "标注角色", "发布勘误"],
  concepts: ["译者序"],
  actions: [
    {
      label: "公开版次",
      detail: "让评审者先看到版次的定义和负责人，保持译名与目录位置不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验目录位置",
      detail: "在目录位置进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过编辑角色",
      detail: "跳过编辑角色直接追求证据链，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["版次延期暴露", "目录位置清晰度", "证据链风险"],
  boundaryNote: "译名一致不代表概念等价，结论必须保留英文术语和上下文。",
  failureNote: "拒绝原因：译者观点、出版社增补与作者正文被标成同一来源层级。",
} as const;

export function Tmm40TranslatorPrefaceDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40TranslatorPrefaceScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40TranslatorPrefaceEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
