import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["表达能力","通用逼近","可训练性","样本效率","泛化","计算资源"] as const;

export function TcgMain08UniversalNetworkMapLab() { return <OfficialTcgLab title="足够大的网络什么都能做吗" concepts={concepts} accent="#4d7c0f" view="map" />; }
export function TcgMain08UniversalNetworkProbabilityLab() { return <OfficialTcgLab title="足够大的网络什么都能做吗" concepts={concepts} accent="#4d7c0f" view="probability" />; }
export function TcgMain08UniversalNetworkEvidenceLab() { return <OfficialTcgLab title="足够大的网络什么都能做吗" concepts={concepts} accent="#4d7c0f" view="evidence" />; }
