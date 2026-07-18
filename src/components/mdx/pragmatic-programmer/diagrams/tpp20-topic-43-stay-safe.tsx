import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-43-stay-safe",
  title: "43 出门在外注意安全",
  nodes: ["资产", "威胁", "攻击面", "防护", "监测"],
  focuses: ["攻击面", "补丁窗口", "最小权限", "输入验证", "安全回归"],
} as const;

export function Tpp20Topic43StaySafeSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic43StaySafeFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic43StaySafeEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
