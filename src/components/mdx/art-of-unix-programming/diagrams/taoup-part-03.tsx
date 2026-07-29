import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-part-03",
  title: "第三部分 实现",
  question: "为解析器、构建流水线与网络服务分别选择实现策略",
  nodes: ["任务分类", "语言选择", "工具反馈", "重用调查", "替换演练"],
  concepts: ["III. Implementation"],
  actions: [
    {
      label: "收窄运行模型",
      detail: "只改变运行模型，保留开发效率与自动化的原始基线。",
    },
    {
      label: "显式化自动化",
      detail: "把自动化的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过依赖证据",
      detail: "跳过依赖证据直接追求退出成本，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "当迁移成本超过预期收益且没有退出路径时，不应追逐新工具。",
  faultNote: "拒绝原因：因团队熟悉某语言而忽略运行环境、库生态和部署边界。",
} as const;

export function TaoupPart03TopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupPart03RepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupPart03EvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
