import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-part-02",
  title: "第二部分 设计",
  question: "从一项模糊需求推导可组合、可诊断、可替换的系统结构",
  nodes: ["模块边界", "数据表示", "进程组合", "用户接口", "复杂度预算"],
  concepts: ["II. Design"],
  actions: [
    {
      label: "收窄正交性",
      detail: "只改变正交性，保留文本协议与故障可见的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化故障可见",
      detail: "把故障可见的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过最小惊讶",
      detail: "跳过最小惊讶直接追求必要复杂度，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["正交性风险", "故障可见可见度", "必要复杂度恢复度"],
  boundaryNote: "任何抽象若不能减少调用者需要同时理解的状态，就不应继续叠加。",
  faultNote: "拒绝原因：先选工具和框架，再用原则为既定方案寻找理由。",
} as const;

export function TaoupPart02TopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupPart02RepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupPart02EvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
