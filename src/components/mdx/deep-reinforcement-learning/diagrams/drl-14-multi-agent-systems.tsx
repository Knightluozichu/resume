import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["马尔可夫博弈","联合动作","共享奖励","局部观测","集中训练","分散决策"] as const;

export function Drl14MultiAgentSystemsMapLab() {
  return <OfficialDrlLab title="第14章 多智能体系统" concepts={concepts} accent="#4d7c0f" view="map" />;
}

export function Drl14MultiAgentSystemsTraceLab() {
  return <OfficialDrlLab title="第14章 多智能体系统" concepts={concepts} accent="#4d7c0f" view="trace" />;
}

export function Drl14MultiAgentSystemsAuditLab() {
  return <OfficialDrlLab title="第14章 多智能体系统" concepts={concepts} accent="#4d7c0f" view="audit" />;
}
