import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["基线","优势函数","方差缩减","REINFORCE","A2C","目标网络"] as const;

export function Drl08PolicyGradientBaselineMapLab() {
  return <OfficialDrlLab title="第8章 带基线的策略梯度方法" concepts={concepts} accent="#be123c" view="map" />;
}

export function Drl08PolicyGradientBaselineTraceLab() {
  return <OfficialDrlLab title="第8章 带基线的策略梯度方法" concepts={concepts} accent="#be123c" view="trace" />;
}

export function Drl08PolicyGradientBaselineAuditLab() {
  return <OfficialDrlLab title="第8章 带基线的策略梯度方法" concepts={concepts} accent="#be123c" view="audit" />;
}
