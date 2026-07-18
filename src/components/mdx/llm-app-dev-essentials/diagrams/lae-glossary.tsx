import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["GPT","LLM","API","提示词","微调","插件"] as const;

export function LaeGlossaryPipelineLab() { return <OfficialLaeLab title="术语表" concepts={concepts} accent="#1d4ed8" view="pipeline" />; }
export function LaeGlossaryRequestLab() { return <OfficialLaeLab title="术语表" concepts={concepts} accent="#1d4ed8" view="request" />; }
export function LaeGlossaryRiskLab() { return <OfficialLaeLab title="术语表" concepts={concepts} accent="#1d4ed8" view="risk" />; }
