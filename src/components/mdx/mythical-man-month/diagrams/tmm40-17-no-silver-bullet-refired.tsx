import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-17-no-silver-bullet-refired",
  title: "第17章 再论“没有银弹”",
  question: "评审会把重用率提升当成已经推翻没有银弹论断的充分证据",
  roles: ["原始论断负责人", "Harel 分析执行者", "独立项目评审者"],
  phases: ["复述命题", "限定尺度", "整理证据", "测试反例", "形成回应"],
  concepts: [
    "第17章 再论“没有银弹”",
    "人狼和其他恐怖传说",
    "存在着银弹——就在这里",
    "含糊的表达将会导致误解",
    "Harel的分析",
    "Jones的观点——质量带来生产率",
    "那么，生产率的情形如何",
    "面向对象编程——这颗铜质子弹可以吗",
    "重用的情况怎样",
    "学习大量的词汇——对软件重用的一个可预见但还没有被预言的问题",
    "子弹的本质——形势没有发生改变",
  ],
  actions: [
    {
      label: "公开原始论断",
      detail:
        "让评审者先看到原始论断的定义和负责人，保持Harel 分析与质量收益不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验质量收益",
      detail: "在质量收益进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过面向对象",
      detail: "跳过面向对象直接追求软件重用，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["原始论断延期暴露", "质量收益清晰度", "软件重用风险"],
  boundaryNote: "局部成功既不能被忽略，也不能未经尺度换算就升级为普遍银弹。",
  failureNote: "拒绝原因：反驳改变原命题的时间、尺度或对象，形成稻草人比较。",
} as const;

export function Tmm4017NoSilverBulletRefiredDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4017NoSilverBulletRefiredScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4017NoSilverBulletRefiredEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
