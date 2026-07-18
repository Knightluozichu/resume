import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["回调处理器","构造器回调","请求回调","事件","trace","可观测性"] as const;

export function Lcp08CallbacksGraphLab() { return <OfficialLcpLab title="第8章 回调机制" concepts={concepts} accent="#4d7c0f" view="graph" />; }
export function Lcp08CallbacksRunLab() { return <OfficialLcpLab title="第8章 回调机制" concepts={concepts} accent="#4d7c0f" view="run" />; }
export function Lcp08CallbacksFaultLab() { return <OfficialLcpLab title="第8章 回调机制" concepts={concepts} accent="#4d7c0f" view="fault" />; }
