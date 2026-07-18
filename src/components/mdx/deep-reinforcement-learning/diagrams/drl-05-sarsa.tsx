import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["SARSA","行为策略","n步回报","自举","蒙特卡洛","偏差方差"] as const;

export function Drl05SarsaMapLab() {
  return <OfficialDrlLab title="第5章 SARSA算法" concepts={concepts} accent="#0f766e" view="map" />;
}

export function Drl05SarsaTraceLab() {
  return <OfficialDrlLab title="第5章 SARSA算法" concepts={concepts} accent="#0f766e" view="trace" />;
}

export function Drl05SarsaAuditLab() {
  return <OfficialDrlLab title="第5章 SARSA算法" concepts={concepts} accent="#0f766e" view="audit" />;
}
