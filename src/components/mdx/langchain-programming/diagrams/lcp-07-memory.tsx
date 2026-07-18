import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["短期记忆","窗口记忆","实体记忆","知识图谱","摘要记忆","向量记忆"] as const;

export function Lcp07MemoryGraphLab() { return <OfficialLcpLab title="第7章 记忆组件" concepts={concepts} accent="#be123c" view="graph" />; }
export function Lcp07MemoryRunLab() { return <OfficialLcpLab title="第7章 记忆组件" concepts={concepts} accent="#be123c" view="run" />; }
export function Lcp07MemoryFaultLab() { return <OfficialLcpLab title="第7章 记忆组件" concepts={concepts} accent="#be123c" view="fault" />; }
