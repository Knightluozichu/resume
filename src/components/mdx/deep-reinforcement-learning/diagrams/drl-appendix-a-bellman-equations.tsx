import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["条件期望","贝尔曼期望方程","贝尔曼最优方程","不动点","压缩映射","动态规划"] as const;

export function DrlAppendixABellmanEquationsMapLab() {
  return <OfficialDrlLab title="附录A 贝尔曼方程" concepts={concepts} accent="#0f766e" view="map" />;
}

export function DrlAppendixABellmanEquationsTraceLab() {
  return <OfficialDrlLab title="附录A 贝尔曼方程" concepts={concepts} accent="#0f766e" view="trace" />;
}

export function DrlAppendixABellmanEquationsAuditLab() {
  return <OfficialDrlLab title="附录A 贝尔曼方程" concepts={concepts} accent="#0f766e" view="audit" />;
}
