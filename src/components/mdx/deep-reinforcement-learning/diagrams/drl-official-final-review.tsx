import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["环境合同","采样证据","价值目标","策略梯度","多智能体","独立评价"] as const;

export function DrlOfficialFinalReviewMapLab() {
  return <OfficialDrlLab title="《深度强化学习》全书总复习" concepts={concepts} accent="#1d4ed8" view="map" />;
}

export function DrlOfficialFinalReviewTraceLab() {
  return <OfficialDrlLab title="《深度强化学习》全书总复习" concepts={concepts} accent="#1d4ed8" view="trace" />;
}

export function DrlOfficialFinalReviewAuditLab() {
  return <OfficialDrlLab title="《深度强化学习》全书总复习" concepts={concepts} accent="#1d4ed8" view="audit" />;
}
