import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-20th-anniversary-preface",
  title: "20周年纪念版序言",
  question: "课程维护者要说明纪念版新增内容怎样检验而非改写 1975 年命题",
  roles: ["初版命题负责人", "新增文章执行者", "独立项目评审者"],
  phases: ["列出旧文", "识别增补", "冻结年代", "比较判断", "形成索引"],
  concepts: ["20周年纪念版序言"],
  actions: [
    {
      label: "公开初版命题",
      detail:
        "让评审者先看到初版命题的定义和负责人，保持新增文章与时间证据不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验时间证据",
      detail: "在时间证据进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过修订判断",
      detail: "跳过修订判断直接追求保留边界，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["初版命题延期暴露", "时间证据清晰度", "保留边界风险"],
  boundaryNote: "回顾能够更新适用条件，却不能改变历史文本发生的年代。",
  failureNote: "拒绝原因：把二十年后的评论倒灌成初版项目当时已经知道的事实。",
} as const;

export function Tmm4020thAnniversaryPrefaceDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4020thAnniversaryPrefaceScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4020thAnniversaryPrefaceEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
