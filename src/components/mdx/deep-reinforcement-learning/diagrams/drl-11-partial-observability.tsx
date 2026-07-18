import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["不完全观测","POMDP","历史","循环状态","截断反传","掩码"] as const;

export function Drl11PartialObservabilityMapLab() {
  return <OfficialDrlLab title="第11章 对状态的不完全观测" concepts={concepts} accent="#b45309" view="map" />;
}

export function Drl11PartialObservabilityTraceLab() {
  return <OfficialDrlLab title="第11章 对状态的不完全观测" concepts={concepts} accent="#b45309" view="trace" />;
}

export function Drl11PartialObservabilityAuditLab() {
  return <OfficialDrlLab title="第11章 对状态的不完全观测" concepts={concepts} accent="#b45309" view="audit" />;
}
