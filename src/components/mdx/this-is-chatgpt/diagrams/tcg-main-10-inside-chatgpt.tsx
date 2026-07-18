import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["token序列","Transformer","注意力","前馈层","残差","逐token推理"] as const;

export function TcgMain10InsideChatgptMapLab() { return <OfficialTcgLab title="ChatGPT内部" concepts={concepts} accent="#b45309" view="map" />; }
export function TcgMain10InsideChatgptProbabilityLab() { return <OfficialTcgLab title="ChatGPT内部" concepts={concepts} accent="#b45309" view="probability" />; }
export function TcgMain10InsideChatgptEvidenceLab() { return <OfficialTcgLab title="ChatGPT内部" concepts={concepts} accent="#b45309" view="evidence" />; }
