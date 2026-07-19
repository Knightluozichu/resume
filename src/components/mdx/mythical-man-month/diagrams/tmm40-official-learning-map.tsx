import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-official-learning-map",
  title: "《人月神话》40周年版权威学习地图",
  question: "学习者需要选择先修路径并说明每一页怎样留下项目证据",
  roles: ["24 个单元负责人", "143 个节点执行者", "独立项目评审者"],
  phases: ["锁定版次", "选择主题", "运行实验", "保存证据", "回到复习"],
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
      label: "公开24 个单元",
      detail:
        "让评审者先看到24 个单元的定义和负责人，保持143 个节点与项目命题不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验项目命题",
      detail: "在项目命题进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过实践证据",
      detail: "跳过实践证据直接追求复习路径，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["24 个单元延期暴露", "项目命题清晰度", "复习路径风险"],
  boundaryNote: "学习地图只组织范围，不把目录标题当作已经掌握的正文知识。",
  failureNote:
    "拒绝原因：只按页码浏览，却不能从项目现象定位到命题、实验和反例。",
} as const;

export function Tmm40OfficialLearningMapDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40OfficialLearningMapScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40OfficialLearningMapEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
