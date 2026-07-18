import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["需求合同","Slack事件","幂等","多模态代理","效果评估","备选服务"] as const;

export function Lcp09MultimodalBotGraphLab() { return <OfficialLcpLab title="第9章 构建多模态机器人" concepts={concepts} accent="#0f766e" view="graph" />; }
export function Lcp09MultimodalBotRunLab() { return <OfficialLcpLab title="第9章 构建多模态机器人" concepts={concepts} accent="#0f766e" view="run" />; }
export function Lcp09MultimodalBotFaultLab() { return <OfficialLcpLab title="第9章 构建多模态机器人" concepts={concepts} accent="#0f766e" view="fault" />; }
