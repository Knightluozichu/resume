import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["基础知识","价值学习","策略学习","多智能体强化学习","应用与展望","贝尔曼方程"] as const;

export function DrlOfficialLearningMapMapLab() {
  return <OfficialDrlLab title="《深度强化学习》权威学习地图" concepts={concepts} accent="#0f766e" view="map" />;
}

export function DrlOfficialLearningMapTraceLab() {
  return <OfficialDrlLab title="《深度强化学习》权威学习地图" concepts={concepts} accent="#0f766e" view="trace" />;
}

export function DrlOfficialLearningMapAuditLab() {
  return <OfficialDrlLab title="《深度强化学习》权威学习地图" concepts={concepts} accent="#0f766e" view="audit" />;
}
