import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["Runnable","schema","invoke","stream","branch","fallback"] as const;

export function Lcp04BuildingChainsGraphLab() { return <OfficialLcpLab title="第4章 链的构建" concepts={concepts} accent="#0f766e" view="graph" />; }
export function Lcp04BuildingChainsRunLab() { return <OfficialLcpLab title="第4章 链的构建" concepts={concepts} accent="#0f766e" view="run" />; }
export function Lcp04BuildingChainsFaultLab() { return <OfficialLcpLab title="第4章 链的构建" concepts={concepts} accent="#0f766e" view="fault" />; }
