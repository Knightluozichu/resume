import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["频数","n-gram","稀疏性","平滑","泛化","语言模型"] as const;

export function TcgMain02ProbabilitiesMapLab() { return <OfficialTcgLab title="概率从何而来" concepts={concepts} accent="#be123c" view="map" />; }
export function TcgMain02ProbabilitiesProbabilityLab() { return <OfficialTcgLab title="概率从何而来" concepts={concepts} accent="#be123c" view="probability" />; }
export function TcgMain02ProbabilitiesEvidenceLab() { return <OfficialTcgLab title="概率从何而来" concepts={concepts} accent="#be123c" view="evidence" />; }
