import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["非合作博弈","最佳响应","纳什均衡","自博弈","MADDPG","对手分布"] as const;

export function Drl16NoncooperativeMarlMapLab() {
  return <OfficialDrlLab title="第16章 非合作关系设定下的多智能体强化学习" concepts={concepts} accent="#b45309" view="map" />;
}

export function Drl16NoncooperativeMarlTraceLab() {
  return <OfficialDrlLab title="第16章 非合作关系设定下的多智能体强化学习" concepts={concepts} accent="#b45309" view="trace" />;
}

export function Drl16NoncooperativeMarlAuditLab() {
  return <OfficialDrlLab title="第16章 非合作关系设定下的多智能体强化学习" concepts={concepts} accent="#b45309" view="audit" />;
}
