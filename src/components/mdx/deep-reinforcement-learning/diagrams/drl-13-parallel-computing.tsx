import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["并行梯度","MapReduce","同步","异步","陈旧梯度","A3C"] as const;

export function Drl13ParallelComputingMapLab() {
  return <OfficialDrlLab title="第13章 并行计算" concepts={concepts} accent="#be123c" view="map" />;
}

export function Drl13ParallelComputingTraceLab() {
  return <OfficialDrlLab title="第13章 并行计算" concepts={concepts} accent="#be123c" view="trace" />;
}

export function Drl13ParallelComputingAuditLab() {
  return <OfficialDrlLab title="第13章 并行计算" concepts={concepts} accent="#be123c" view="audit" />;
}
