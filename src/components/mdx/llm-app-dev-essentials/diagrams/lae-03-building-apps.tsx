import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["分层架构","密钥管理","数据最小化","提示词注入","输出验证","回退路径"] as const;

export function Lae03BuildingAppsPipelineLab() { return <OfficialLaeLab title="第3章 使用GPT-4和ChatGPT构建应用程序" concepts={concepts} accent="#4d7c0f" view="pipeline" />; }
export function Lae03BuildingAppsRequestLab() { return <OfficialLaeLab title="第3章 使用GPT-4和ChatGPT构建应用程序" concepts={concepts} accent="#4d7c0f" view="request" />; }
export function Lae03BuildingAppsRiskLab() { return <OfficialLaeLab title="第3章 使用GPT-4和ChatGPT构建应用程序" concepts={concepts} accent="#4d7c0f" view="risk" />; }
