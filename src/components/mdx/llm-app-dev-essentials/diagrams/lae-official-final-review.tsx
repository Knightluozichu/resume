import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["端到端重放","首个分叉","基线","故障注入","人工复核","发布门禁"] as const;

export function LaeOfficialFinalReviewPipelineLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》全书总复习" concepts={concepts} accent="#be123c" view="pipeline" />; }
export function LaeOfficialFinalReviewRequestLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》全书总复习" concepts={concepts} accent="#be123c" view="request" />; }
export function LaeOfficialFinalReviewRiskLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》全书总复习" concepts={concepts} accent="#be123c" view="risk" />; }
