import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-official-final-review",
  title: "《人月神话》40周年版全书总复习",
  question: "综合评审要判断延期项目应该缩范围、换组织、补证据还是继续交付",
  roles: ["项目范围负责人", "概念完整性执行者", "独立项目评审者"],
  phases: ["重建范围", "运行诊断", "执行干预", "验证性质", "形成决策"],
  concepts: [
    "译者序",
    "20周年纪念版序言",
    "第1版序言",
    "第1章 焦油坑",
    "第2章 人月神话",
    "第3章 外科手术队伍",
    "第4章 贵族专制、民主政治和系统设计",
    "第5章 画蛇添足",
    "第6章 贯彻执行",
    "第7章 为什么巴比伦塔会失败",
    "第8章 胸有成竹",
    "第9章 削足适履",
    "第10章 提纲挈领",
    "第11章 未雨绸缪",
    "第12章 干将莫邪",
    "第13章 整体部分",
    "第14章 祸起萧墙",
    "第15章 另外一面",
    "第16章 没有银弹——软件工程中的根本和次要问题",
    "第17章 再论“没有银弹”",
    "第18章 《人月神话》的观点：是与非",
    "第19章 20年后的《人月神话》",
    "注解与参考文献",
    "附录 人月落地实战体验",
  ],
  actions: [
    {
      label: "公开项目范围",
      detail:
        "让评审者先看到项目范围的定义和负责人，保持概念完整性与进度证据不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验进度证据",
      detail: "在进度证据进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过系统验证",
      detail: "跳过系统验证直接追求独立复核，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["项目范围延期暴露", "进度证据清晰度", "独立复核风险"],
  boundaryNote: "任何硬阻断项失败都必须单独处理，不能由其他维度的高分抵消。",
  failureNote: "拒绝原因：用总分平均掉关键路径、概念分叉或系统验证的单项失败。",
} as const;

export function Tmm40OfficialFinalReviewDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40OfficialFinalReviewScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40OfficialFinalReviewEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
