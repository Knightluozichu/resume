import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["语料","自监督","下一token损失","参数规模","训练批次","压缩表示"] as const;

export function TcgMain11TrainingChatgptMapLab() { return <OfficialTcgLab title="ChatGPT的训练" concepts={concepts} accent="#1d4ed8" view="map" />; }
export function TcgMain11TrainingChatgptProbabilityLab() { return <OfficialTcgLab title="ChatGPT的训练" concepts={concepts} accent="#1d4ed8" view="probability" />; }
export function TcgMain11TrainingChatgptEvidenceLab() { return <OfficialTcgLab title="ChatGPT的训练" concepts={concepts} accent="#1d4ed8" view="evidence" />; }
