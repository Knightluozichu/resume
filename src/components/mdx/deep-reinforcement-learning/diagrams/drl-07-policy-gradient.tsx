import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["策略网络","策略梯度","REINFORCE","得分函数","actor","critic"] as const;

export function Drl07PolicyGradientMapLab() {
  return <OfficialDrlLab title="第7章 策略梯度方法" concepts={concepts} accent="#1d4ed8" view="map" />;
}

export function Drl07PolicyGradientTraceLab() {
  return <OfficialDrlLab title="第7章 策略梯度方法" concepts={concepts} accent="#1d4ed8" view="trace" />;
}

export function Drl07PolicyGradientAuditLab() {
  return <OfficialDrlLab title="第7章 策略梯度方法" concepts={concepts} accent="#1d4ed8" view="audit" />;
}
