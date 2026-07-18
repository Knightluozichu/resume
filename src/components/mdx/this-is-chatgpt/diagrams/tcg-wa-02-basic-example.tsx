import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["自然语言问题","形式查询","单位","精确计算","结果溯源","一致性检查"] as const;

export function TcgWa02BasicExampleMapLab() { return <OfficialTcgLab title="一个基本示例" concepts={concepts} accent="#0f766e" view="map" />; }
export function TcgWa02BasicExampleProbabilityLab() { return <OfficialTcgLab title="一个基本示例" concepts={concepts} accent="#0f766e" view="probability" />; }
export function TcgWa02BasicExampleEvidenceLab() { return <OfficialTcgLab title="一个基本示例" concepts={concepts} accent="#0f766e" view="evidence" />; }
