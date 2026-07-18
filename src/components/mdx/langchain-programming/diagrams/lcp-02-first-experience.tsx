import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["依赖锁定","语言模型","提示模板","输出解析","LCEL","安全实践"] as const;

export function Lcp02FirstExperienceGraphLab() { return <OfficialLcpLab title="第2章 LangChain初体验" concepts={concepts} accent="#be123c" view="graph" />; }
export function Lcp02FirstExperienceRunLab() { return <OfficialLcpLab title="第2章 LangChain初体验" concepts={concepts} accent="#be123c" view="run" />; }
export function Lcp02FirstExperienceFaultLab() { return <OfficialLcpLab title="第2章 LangChain初体验" concepts={concepts} accent="#be123c" view="fault" />; }
