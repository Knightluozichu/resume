import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["DQN","TD目标","TD误差","Q学习","同策略","异策略"] as const;

export function Drl04DqnQLearningMapLab() {
  return <OfficialDrlLab title="第4章 DQN与Q学习" concepts={concepts} accent="#4d7c0f" view="map" />;
}

export function Drl04DqnQLearningTraceLab() {
  return <OfficialDrlLab title="第4章 DQN与Q学习" concepts={concepts} accent="#4d7c0f" view="trace" />;
}

export function Drl04DqnQLearningAuditLab() {
  return <OfficialDrlLab title="第4章 DQN与Q学习" concepts={concepts} accent="#4d7c0f" view="audit" />;
}
