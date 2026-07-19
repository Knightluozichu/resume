import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-07-babel",
  title: "第7章 为什么巴比伦塔会失败",
  question: "跨四地团队共享代码仓库，却对目标、接口和完成定义理解不同",
  roles: ["共同目标负责人", "沟通路径执行者", "独立项目评审者"],
  phases: ["声明目标", "识别接口", "发布决定", "确认理解", "修订组织"],
  concepts: [
    "第7章 为什么巴比伦塔会失败",
    "巴比伦塔的管理教训",
    "大型编程项目中的交流",
    "项目工作手册",
    "大型编程项目的组织架构",
  ],
  actions: [
    {
      label: "公开共同目标",
      detail:
        "让评审者先看到共同目标的定义和负责人，保持沟通路径与项目手册不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验项目手册",
      detail: "在项目手册进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过组织结构",
      detail: "跳过组织结构直接追求确认回路，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["共同目标延期暴露", "项目手册清晰度", "确认回路风险"],
  boundaryNote: "更多会议不等于更好沟通，路径必须对应责任和可验证回执。",
  failureNote:
    "拒绝原因：消息数量持续增加，但关键决定没有所有者、版本和确认回路。",
} as const;

export function Tmm4007BabelDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4007BabelScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4007BabelEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
