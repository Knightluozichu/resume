import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["MDP","状态转移","策略","折扣回报","动作价值","状态价值"] as const;

export function Drl03ReinforcementLearningConceptsMapLab() {
  return <OfficialDrlLab title="第3章 强化学习基本概念" concepts={concepts} accent="#be123c" view="map" />;
}

export function Drl03ReinforcementLearningConceptsTraceLab() {
  return <OfficialDrlLab title="第3章 强化学习基本概念" concepts={concepts} accent="#be123c" view="trace" />;
}

export function Drl03ReinforcementLearningConceptsAuditLab() {
  return <OfficialDrlLab title="第3章 强化学习基本概念" concepts={concepts} accent="#be123c" view="audit" />;
}
