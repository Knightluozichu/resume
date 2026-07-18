import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["完全合作","团队回报","多智能体A2C","信用分配","CTDE","参数共享"] as const;

export function Drl15CooperativeMarlMapLab() {
  return <OfficialDrlLab title="第15章 完全合作关系设定下的多智能体强化学习" concepts={concepts} accent="#0f766e" view="map" />;
}

export function Drl15CooperativeMarlTraceLab() {
  return <OfficialDrlLab title="第15章 完全合作关系设定下的多智能体强化学习" concepts={concepts} accent="#0f766e" view="trace" />;
}

export function Drl15CooperativeMarlAuditLab() {
  return <OfficialDrlLab title="第15章 完全合作关系设定下的多智能体强化学习" concepts={concepts} accent="#0f766e" view="audit" />;
}
