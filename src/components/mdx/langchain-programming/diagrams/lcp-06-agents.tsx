import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["智能代理","观察","计划","工具","权限","步数预算"] as const;

export function Lcp06AgentsGraphLab() { return <OfficialLcpLab title="第6章 智能代理设计" concepts={concepts} accent="#1d4ed8" view="graph" />; }
export function Lcp06AgentsRunLab() { return <OfficialLcpLab title="第6章 智能代理设计" concepts={concepts} accent="#1d4ed8" view="run" />; }
export function Lcp06AgentsFaultLab() { return <OfficialLcpLab title="第6章 智能代理设计" concepts={concepts} accent="#1d4ed8" view="fault" />; }
