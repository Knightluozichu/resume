import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["连续动作","DDPG","确定性策略梯度","TD3","截断双Q","高斯策略"] as const;

export function Drl10ContinuousControlMapLab() {
  return <OfficialDrlLab title="第10章 连续控制" concepts={concepts} accent="#0f766e" view="map" />;
}

export function Drl10ContinuousControlTraceLab() {
  return <OfficialDrlLab title="第10章 连续控制" concepts={concepts} accent="#0f766e" view="trace" />;
}

export function Drl10ContinuousControlAuditLab() {
  return <OfficialDrlLab title="第10章 连续控制" concepts={concepts} accent="#0f766e" view="audit" />;
}
