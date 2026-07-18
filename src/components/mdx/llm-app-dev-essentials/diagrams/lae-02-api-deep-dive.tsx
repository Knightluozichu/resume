import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["API密钥","请求合同","消息","温度","词元预算","响应校验"] as const;

export function Lae02ApiDeepDivePipelineLab() { return <OfficialLaeLab title="第2章 深入了解GPT-4和ChatGPT的API" concepts={concepts} accent="#be123c" view="pipeline" />; }
export function Lae02ApiDeepDiveRequestLab() { return <OfficialLaeLab title="第2章 深入了解GPT-4和ChatGPT的API" concepts={concepts} accent="#be123c" view="request" />; }
export function Lae02ApiDeepDiveRiskLab() { return <OfficialLaeLab title="第2章 深入了解GPT-4和ChatGPT的API" concepts={concepts} accent="#be123c" view="risk" />; }
