import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-26-balance-resources",
  title: "26 如何保持资源的平衡",
  nodes: ["获取", "使用", "移交", "异常", "释放"],
  focuses: ["资源所有权", "作用域", "异常安全", "泄漏", "局部性"],
} as const;

export function Tpp20Topic26BalanceResourcesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic26BalanceResourcesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic26BalanceResourcesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
