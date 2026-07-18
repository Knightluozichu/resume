"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第9章 策略梯度法",
  "9.1 最简单的策略梯度法",
  "9.1.1 策略梯度法的推导",
  "9.1.2 策略梯度法的算法",
  "9.1.3 策略梯度法的实现",
  "9.2 REINFORCE",
  "9.2.1 REINFORCE算法",
  "9.2.2 REINFORCE的实现",
] as const;
export function Dlr09PolicyGradientMapLab() {
  return (
    <OfficialRlLab
      title="第9章 策略梯度法"
      concepts={concepts}
      accent="#15803d"
      view="map"
    />
  );
}
export function Dlr09PolicyGradientExperimentLab() {
  return (
    <OfficialRlLab
      title="第9章 策略梯度法"
      concepts={concepts}
      accent="#15803d"
      view="experiment"
    />
  );
}
export function Dlr09PolicyGradientEvidenceLab() {
  return (
    <OfficialRlLab
      title="第9章 策略梯度法"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
