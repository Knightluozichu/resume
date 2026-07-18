import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["序贯决策","离线评价","长期回报","探索成本","稳定性","安全约束"] as const;

export function Drl19RealWorldApplicationsMapLab() {
  return <OfficialDrlLab title="第19章 现实世界中的应用" concepts={concepts} accent="#4d7c0f" view="map" />;
}

export function Drl19RealWorldApplicationsTraceLab() {
  return <OfficialDrlLab title="第19章 现实世界中的应用" concepts={concepts} accent="#4d7c0f" view="trace" />;
}

export function Drl19RealWorldApplicationsAuditLab() {
  return <OfficialDrlLab title="第19章 现实世界中的应用" concepts={concepts} accent="#4d7c0f" view="audit" />;
}
