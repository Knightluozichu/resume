import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-04-modularity",
  title: "第4章 模块性：保持清晰，保持简洁",
  question: "把一个同时解析、校验、存储和展示数据的程序重新分层",
  nodes: ["封装单元", "正交检查", "SPOT 所有权", "胶合层", "模块测试"],
  concepts: [
    "4. Modularity",
    "Encapsulation and Optimal Module Size",
    "Compactness and Orthogonality",
    "Compactness",
    "Orthogonality",
    "The SPOT Rule",
    "Compactness and the Strong Single Center",
    "The Value of Detachment",
    "Software Is a Many-Layered Thing",
    "Top-Down versus Bottom-Up",
    "Glue Layers",
    "Case Study: C Considered as Thin Glue",
    "Libraries",
    "Case Study: GIMP Plugins",
    "Unix and Object-Oriented Languages",
    "Coding for Modularity",
  ],
  actions: [
    {
      label: "收窄模块尺寸",
      detail: "只改变模块尺寸，保留接口宽度与知识唯一的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化知识唯一",
      detail: "把知识唯一的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过转换成本",
      detail: "跳过转换成本直接追求改动传播，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["模块尺寸风险", "知识唯一可见度", "改动传播恢复度"],
  boundaryNote: "如果拆分增加了双向依赖或重复规则，应合并边界而非继续细分。",
  faultNote: "拒绝原因：把同一规则复制到多个模块，并用更多适配器掩盖重复知识。",
} as const;

export function TaoupChapter04ModularityTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter04ModularityRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter04ModularityEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
