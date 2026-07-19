import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-appendix-practice",
  title: "附录 人月落地实战体验",
  question: "读者把附录感言中的项目经验直接标为 Brooks 在原书提出的结论",
  roles: ["编辑角色负责人", "项目背景执行者", "独立项目评审者"],
  phases: ["识别作者", "还原背景", "提取命题", "寻找结果", "限定迁移"],
  concepts: [
    "附录：人月落地实战体验",
    "一、名家谈人月",
    "1. 年金",
    "2. 《人月神话》与实践",
    "3. Frank Chance评人月",
    "4. 软件尚方宝剑（Silver Bullet）何在",
    "二、名著评人月",
    "三、读者感言",
    "1. 读书有感——人月神话",
    "2. 我这几天很烦（产品概念完整性）",
    "3. 关于我们的思考——“项目开发”及读《人月神话》有感",
    "4. 我的“人月神话”",
    "5. 《人月神话》软玉生香",
  ],
  actions: [
    {
      label: "公开编辑角色",
      detail:
        "让评审者先看到编辑角色的定义和负责人，保持项目背景与实践命题不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验实践命题",
      detail: "在实践命题进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过观察结果",
      detail: "跳过观察结果直接追求反例条件，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["编辑角色延期暴露", "实践命题清晰度", "反例条件风险"],
  boundaryNote: "附录提供接受史与实践线索，不自动获得原书作者论断的地位。",
  failureNote: "拒绝原因：作者、译者、评论者和普通读者的声音失去角色标记。",
} as const;

export function Tmm40AppendixPracticeDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40AppendixPracticeScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40AppendixPracticeEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
