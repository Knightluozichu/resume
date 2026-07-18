import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["自注意力","查询","键","值","多头注意力","智能体掩码"] as const;

export function Drl17AttentionMarlMapLab() {
  return <OfficialDrlLab title="第17章 注意力机制与多智能体强化学习" concepts={concepts} accent="#1d4ed8" view="map" />;
}

export function Drl17AttentionMarlTraceLab() {
  return <OfficialDrlLab title="第17章 注意力机制与多智能体强化学习" concepts={concepts} accent="#1d4ed8" view="trace" />;
}

export function Drl17AttentionMarlAuditLab() {
  return <OfficialDrlLab title="第17章 注意力机制与多智能体强化学习" concepts={concepts} accent="#1d4ed8" view="audit" />;
}
