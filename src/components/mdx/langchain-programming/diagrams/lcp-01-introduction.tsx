import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["模型I/O","检索","链","记忆","代理","回调"] as const;

export function Lcp01IntroductionGraphLab() { return <OfficialLcpLab title="第1章 LangChain简介" concepts={concepts} accent="#1d4ed8" view="graph" />; }
export function Lcp01IntroductionRunLab() { return <OfficialLcpLab title="第1章 LangChain简介" concepts={concepts} accent="#1d4ed8" view="run" />; }
export function Lcp01IntroductionFaultLab() { return <OfficialLcpLab title="第1章 LangChain简介" concepts={concepts} accent="#1d4ed8" view="fault" />; }
