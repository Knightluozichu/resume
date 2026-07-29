import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-index",
  title: "索引",
  question: "从‘透明性’定位定义、案例、反例和相关章节",
  nodes: ["提出检索", "匹配索引", "跳转正文", "核对语境", "补充交叉引用"],
  concepts: ["Index"],
  actions: [
    {
      label: "收窄索引词",
      detail: "只改变索引词，保留别名与锚点的原始基线。",
    },
    {
      label: "显式化锚点",
      detail: "把锚点的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过召回率",
      detail: "跳过召回率直接追求误报，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "索引只能帮助定位证据，不能替代正文解释与实践验证。",
  faultNote:
    "拒绝原因：关键词在目录中出现就判定已解释，忽略正文语境和练习证据。",
} as const;

export function TaoupIndexTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupIndexRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupIndexEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
