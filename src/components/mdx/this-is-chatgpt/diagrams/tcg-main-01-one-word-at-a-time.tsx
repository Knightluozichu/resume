import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["token","条件概率","续写","采样","温度","外层循环"] as const;

export function TcgMain01OneWordAtATimeMapLab() { return <OfficialTcgLab title="一次只添加一个词" concepts={concepts} accent="#1d4ed8" view="map" />; }
export function TcgMain01OneWordAtATimeProbabilityLab() { return <OfficialTcgLab title="一次只添加一个词" concepts={concepts} accent="#1d4ed8" view="probability" />; }
export function TcgMain01OneWordAtATimeEvidenceLab() { return <OfficialTcgLab title="一次只添加一个词" concepts={concepts} accent="#1d4ed8" view="evidence" />; }
