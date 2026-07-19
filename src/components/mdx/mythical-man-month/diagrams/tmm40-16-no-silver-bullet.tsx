import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-16-no-silver-bullet",
  title: "第16章 没有银弹——软件工程中的根本和次要问题",
  question: "供应商宣称一种新技术将在十年内把复杂软件生产率提高十倍",
  roles: ["复杂性负责人", "一致性执行者", "独立项目评审者"],
  phases: ["拆分困难", "声明基线", "应用技术", "测量收益", "寻找反例"],
  concepts: [
    "第16章 没有银弹——软件工程中的根本和次要问题",
    "摘要",
    "介绍",
    "根本困难",
    "以往解决次要困难的一些突破",
    "银弹的希望",
    "针对概念上根本问题的颇具前途的方法",
  ],
  actions: [
    {
      label: "公开复杂性",
      detail: "让评审者先看到复杂性的定义和负责人，保持一致性与可变性不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验可变性",
      detail: "在可变性进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过不可见性",
      detail: "跳过不可见性直接追求次要困难，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["复杂性延期暴露", "可变性清晰度", "次要困难风险"],
  boundaryNote: "工具进步可以巨大，但数量级承诺必须说明它消除了哪一类困难。",
  failureNote:
    "拒绝原因：用消除一种工具摩擦的结果推断需求关系和概念结构也已消失。",
} as const;

export function Tmm4016NoSilverBulletDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4016NoSilverBulletScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4016NoSilverBulletEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
