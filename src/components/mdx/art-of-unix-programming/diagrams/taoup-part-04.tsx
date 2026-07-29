import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-part-04",
  title: "第四部分 社区",
  question: "评估一个工具在新平台、新维护者和新需求下能否延续",
  nodes: ["标准边界", "知识传递", "贡献协议", "治理连续", "未来压力"],
  concepts: ["IV. Community"],
  actions: [
    {
      label: "收窄可移植性",
      detail: "只改变可移植性，保留文档与开放协作的原始基线。",
    },
    {
      label: "显式化开放协作",
      detail: "把开放协作的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过社区治理",
      detail: "跳过社区治理直接追求演化风险，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "开放代码若没有可进入的维护流程，不能等同于可持续社区。",
  faultNote: "拒绝原因：只发布源码快照，不提供构建、治理、许可和维护入口。",
} as const;

export function TaoupPart04TopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupPart04RepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupPart04EvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
