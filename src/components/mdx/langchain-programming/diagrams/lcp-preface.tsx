import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["目标读者","实践代码","版本锁定","框架边界","学习证据","独立重放"] as const;

export function LcpPrefaceGraphLab() { return <OfficialLcpLab title="前言" concepts={concepts} accent="#b45309" view="graph" />; }
export function LcpPrefaceRunLab() { return <OfficialLcpLab title="前言" concepts={concepts} accent="#b45309" view="run" />; }
export function LcpPrefaceFaultLab() { return <OfficialLcpLab title="前言" concepts={concepts} accent="#b45309" view="fault" />; }
