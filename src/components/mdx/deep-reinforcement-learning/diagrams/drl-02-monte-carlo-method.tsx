import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["随机变量","样本均值","无偏估计","方差","重要性采样","随机梯度"] as const;

export function Drl02MonteCarloMethodMapLab() {
  return <OfficialDrlLab title="第2章 蒙特卡洛方法" concepts={concepts} accent="#1d4ed8" view="map" />;
}

export function Drl02MonteCarloMethodTraceLab() {
  return <OfficialDrlLab title="第2章 蒙特卡洛方法" concepts={concepts} accent="#1d4ed8" view="trace" />;
}

export function Drl02MonteCarloMethodAuditLab() {
  return <OfficialDrlLab title="第2章 蒙特卡洛方法" concepts={concepts} accent="#1d4ed8" view="audit" />;
}
