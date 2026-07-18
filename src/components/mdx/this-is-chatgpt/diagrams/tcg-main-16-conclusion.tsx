import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["自回归生成","人类文本","神经表示","合理延续","语义规律","解释边界"] as const;

export function TcgMain16ConclusionMapLab() { return <OfficialTcgLab title="ChatGPT究竟在做什么，为什么有效" concepts={concepts} accent="#1d4ed8" view="map" />; }
export function TcgMain16ConclusionProbabilityLab() { return <OfficialTcgLab title="ChatGPT究竟在做什么，为什么有效" concepts={concepts} accent="#1d4ed8" view="probability" />; }
export function TcgMain16ConclusionEvidenceLab() { return <OfficialTcgLab title="ChatGPT究竟在做什么，为什么有效" concepts={concepts} accent="#1d4ed8" view="evidence" />; }
