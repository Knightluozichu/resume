"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "附录D 策略梯度法的证明",
  "D.1 策略梯度法的推导",
  "D.2 基线的推导",
] as const;
export function DlrAppendixDPolicyGradientProofMapLab() {
  return (
    <OfficialRlLab
      title="附录D 策略梯度法的证明"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function DlrAppendixDPolicyGradientProofExperimentLab() {
  return (
    <OfficialRlLab
      title="附录D 策略梯度法的证明"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function DlrAppendixDPolicyGradientProofEvidenceLab() {
  return (
    <OfficialRlLab
      title="附录D 策略梯度法的证明"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
