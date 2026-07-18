import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["语言模型","词元","Transformer","上下文","幻觉","能力边界"] as const;

export function Lae01Gpt4ChatgptEssentialsPipelineLab() { return <OfficialLaeLab title="第1章 初识GPT-4和ChatGPT" concepts={concepts} accent="#1d4ed8" view="pipeline" />; }
export function Lae01Gpt4ChatgptEssentialsRequestLab() { return <OfficialLaeLab title="第1章 初识GPT-4和ChatGPT" concepts={concepts} accent="#1d4ed8" view="request" />; }
export function Lae01Gpt4ChatgptEssentialsRiskLab() { return <OfficialLaeLab title="第1章 初识GPT-4和ChatGPT" concepts={concepts} accent="#1d4ed8" view="risk" />; }
