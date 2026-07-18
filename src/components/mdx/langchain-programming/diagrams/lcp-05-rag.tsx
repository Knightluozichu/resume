import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["加载器","分割器","嵌入","向量存储","检索器","证据引用"] as const;

export function Lcp05RagGraphLab() { return <OfficialLcpLab title="第5章 RAG" concepts={concepts} accent="#b45309" view="graph" />; }
export function Lcp05RagRunLab() { return <OfficialLcpLab title="第5章 RAG" concepts={concepts} accent="#b45309" view="run" />; }
export function Lcp05RagFaultLab() { return <OfficialLcpLab title="第5章 RAG" concepts={concepts} accent="#b45309" view="fault" />; }
