import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["行为克隆","分布偏移","逆向强化学习","占用测度","GAIL","判别器"] as const;

export function Drl12ImitationLearningMapLab() {
  return <OfficialDrlLab title="第12章 模仿学习" concepts={concepts} accent="#1d4ed8" view="map" />;
}

export function Drl12ImitationLearningTraceLab() {
  return <OfficialDrlLab title="第12章 模仿学习" concepts={concepts} accent="#1d4ed8" view="trace" />;
}

export function Drl12ImitationLearningAuditLab() {
  return <OfficialDrlLab title="第12章 模仿学习" concepts={concepts} accent="#1d4ed8" view="audit" />;
}
