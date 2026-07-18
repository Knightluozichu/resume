import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["提示模板","少样本","逐步分解","训练样本","微调","评估集"] as const;

export function Lae04AdvancedTechniquesPipelineLab() { return <OfficialLaeLab title="第4章 GPT-4和ChatGPT的高级技巧" concepts={concepts} accent="#0f766e" view="pipeline" />; }
export function Lae04AdvancedTechniquesRequestLab() { return <OfficialLaeLab title="第4章 GPT-4和ChatGPT的高级技巧" concepts={concepts} accent="#0f766e" view="request" />; }
export function Lae04AdvancedTechniquesRiskLab() { return <OfficialLaeLab title="第4章 GPT-4和ChatGPT的高级技巧" concepts={concepts} accent="#0f766e" view="risk" />; }
