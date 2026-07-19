import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-part-01",
  title: "第一部分 背景",
  question: "团队争论是否把一个平台服务拆成命令行工具",
  nodes: ["提出原则", "追溯历史", "横向对比", "识别代价", "形成假设"],
  concepts: ["I. Context"],
  actions: [
    {
      label: "收窄哲学命题",
      detail: "只改变哲学命题，保留历史证据与系统风格的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化系统风格",
      detail: "把系统风格的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过反例",
      detail: "跳过反例直接追求适用边界，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["哲学命题风险", "系统风格可见度", "适用边界恢复度"],
  boundaryNote: "若对比对象的时代和约束不同，结论只能作为假设，不能直接迁移。",
  faultNote: "拒绝原因：只摘录格言，不检查格言在何种硬件、组织和生态中形成。",
} as const;

export function TaoupPart01TopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupPart01RepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupPart01EvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
