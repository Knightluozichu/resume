import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-18-propositions",
  title: "第18章 《人月神话》的观点：是与非",
  question: "团队引用书中一句名言，却无法说明项目边界和什么事实会推翻它",
  roles: ["命题范围负责人", "支持证据执行者", "独立项目评审者"],
  phases: ["提取命题", "限定对象", "寻找证据", "运行反例", "更新状态"],
  concepts: [
    "第18章 《人月神话》的观点：是与非",
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
    "第1版结束语",
  ],
  actions: [
    {
      label: "公开命题范围",
      detail:
        "让评审者先看到命题范围的定义和负责人，保持支持证据与反对证据不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验反对证据",
      detail: "在反对证据进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过未知项",
      detail: "跳过未知项直接追求复现实验，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["命题范围延期暴露", "反对证据清晰度", "复现实验风险"],
  boundaryNote: "经典观点的价值来自可检验性，不来自作者或读者的权威。",
  failureNote: "拒绝原因：把经验性命题当作身份口号，既不测量也不允许反例。",
} as const;

export function Tmm4018PropositionsDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4018PropositionsScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4018PropositionsEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
