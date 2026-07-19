import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-19-open-source",
  title: "第19章 开放源码：在Unix新社区中编程",
  question: "为一个新工具准备首个外部贡献，从问题到发布完整走查",
  nodes: ["问题共识", "补丁制作", "评审沟通", "发布分发", "许可治理"],
  concepts: [
    "19. Open Source",
    "Unix and Open Source",
    "Best Practices for Working with Open-Source Developers",
    "Good Patching Practice",
    "Good Project- and Archive-Naming Practice",
    "Good Development Practice",
    "Good Distribution-Making Practice",
    "Good Communication Practice",
    "The Logic of Licenses: How to Pick One",
    "Why You Should Use a Standard License",
    "Varieties of Open-Source Licensing",
    "MIT or X Consortium License",
    "BSD Classic License",
    "Artistic License",
    "General Public License",
    "Mozilla Public License",
  ],
  actions: [
    {
      label: "收窄补丁粒度",
      detail: "只改变补丁粒度，保留项目命名与版本发布的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化版本发布",
      detail: "把版本发布的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过沟通规范",
      detail: "跳过沟通规范直接追求许可证，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["补丁粒度风险", "版本发布可见度", "许可证恢复度"],
  boundaryNote: "公开仓库不自动形成开放项目；贡献入口和决策规则必须可见。",
  faultNote:
    "拒绝原因：接受来源不明的大补丁，既无法审查变更意图也无法确认授权。",
} as const;

export function TaoupChapter19OpenSourceTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter19OpenSourceRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter19OpenSourceEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
